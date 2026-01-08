import React from 'react';
import { useOpportunities, useUpdateOpportunity, OpportunityWithRelations } from '@/hooks/useOpportunities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Database } from '@/integrations/supabase/types';

type OpportunityStatus = Database['public']['Enums']['opportunity_status'];

const pipelineStages: OpportunityStatus[] = ['Prospect', 'Proposal', 'Negotiation', 'Won', 'Lost'];

const stageColors: Record<OpportunityStatus, string> = {
  Prospect: 'border-slate-300',
  Qualified: 'border-blue-300',
  RFP: 'border-purple-300',
  Proposal: 'border-amber-300',
  Negotiation: 'border-orange-300',
  Won: 'border-green-300',
  Lost: 'border-red-300',
};

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

interface OpportunityCardProps {
  opportunity: OpportunityWithRelations;
  isDragging?: boolean;
}

const OpportunityCard = ({ opportunity, isDragging }: OpportunityCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: opportunity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const dealValue = Number(opportunity.deal_value);
  const intensity = Math.min(dealValue / 1000000, 1);
  const bgOpacity = 0.05 + intensity * 0.1;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 rounded-lg border-2 ${stageColors[opportunity.status]} bg-card cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow`}
      data-status={opportunity.status}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-medium text-sm line-clamp-1">{opportunity.customer_name}</span>
        <Badge variant="outline" className="text-xs shrink-0 ml-2">
          {opportunity.probability}%
        </Badge>
      </div>
      <div className="text-lg font-bold mb-2">{formatCurrency(dealValue)}</div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{opportunity.countries?.code || '-'}</span>
        <span>
          {opportunity.expected_closure_date
            ? new Date(opportunity.expected_closure_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : '-'}
        </span>
      </div>
    </div>
  );
};

interface PipelineColumnProps {
  stage: OpportunityStatus;
  opportunities: OpportunityWithRelations[];
  totalValue: number;
}

const PipelineColumn = ({ stage, opportunities, totalValue }: PipelineColumnProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-semibold text-sm">{stage}</h3>
        <Badge variant="secondary" className="text-xs">
          {opportunities.length}
        </Badge>
      </div>
      <div className="text-sm font-medium text-muted-foreground mb-4 px-2">
        {formatCurrency(totalValue)}
      </div>
      <SortableContext items={opportunities.map(o => o.id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1 space-y-3 min-h-[200px] p-2 rounded-lg bg-muted/30">
          {opportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

const Pipeline = () => {
  const { data: opportunities, isLoading } = useOpportunities();
  const updateOpportunity = useUpdateOpportunity();
  const { toast } = useToast();
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const opportunitiesByStage = React.useMemo(() => {
    const grouped: Record<OpportunityStatus, OpportunityWithRelations[]> = {
      Prospect: [],
      Qualified: [],
      RFP: [],
      Proposal: [],
      Negotiation: [],
      Won: [],
      Lost: [],
    };
    
    opportunities?.forEach(opp => {
      if (grouped[opp.status]) {
        grouped[opp.status].push(opp);
      }
    });
    
    return grouped;
  }, [opportunities]);

  const totalsByStage = React.useMemo(() => {
    const totals: Record<OpportunityStatus, number> = {
      Prospect: 0,
      Qualified: 0,
      RFP: 0,
      Proposal: 0,
      Negotiation: 0,
      Won: 0,
      Lost: 0,
    };
    
    opportunities?.forEach(opp => {
      totals[opp.status] += Number(opp.deal_value);
    });
    
    return totals;
  }, [opportunities]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const draggedOpp = opportunities?.find(o => o.id === active.id);
    if (!draggedOpp) return;

    // Determine target status from the column we dropped into
    const overElement = document.querySelector(`[data-status]`);
    const targetStatus = over.id as OpportunityStatus;
    
    // Check if we dropped on another card and get its status
    const targetOpp = opportunities?.find(o => o.id === over.id);
    const newStatus = targetOpp ? targetOpp.status : draggedOpp.status;

    if (newStatus !== draggedOpp.status && pipelineStages.includes(newStatus)) {
      try {
        await updateOpportunity.mutateAsync({
          id: draggedOpp.id,
          updates: { status: newStatus },
        });
        toast({
          title: 'Status updated',
          description: `Moved to ${newStatus}`,
        });
      } catch (error) {
        toast({
          title: 'Error updating status',
          description: (error as Error).message,
          variant: 'destructive',
        });
      }
    }
  };

  const activeOpportunity = opportunities?.find(o => o.id === activeId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading pipeline...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Sales Pipeline</h1>
        <p className="text-muted-foreground">Drag opportunities to update their status</p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-5 gap-4 h-[calc(100vh-240px)]">
          {pipelineStages.map((stage) => (
            <Card key={stage} className="flex flex-col overflow-hidden">
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <PipelineColumn
                  stage={stage}
                  opportunities={opportunitiesByStage[stage]}
                  totalValue={totalsByStage[stage]}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <DragOverlay>
          {activeOpportunity ? (
            <div className="p-4 rounded-lg border-2 border-primary bg-card shadow-lg cursor-grabbing w-[200px]">
              <div className="font-medium text-sm mb-2">{activeOpportunity.customer_name}</div>
              <div className="text-lg font-bold">{formatCurrency(Number(activeOpportunity.deal_value))}</div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Pipeline;
