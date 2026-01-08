import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useFilters } from '@/contexts/FiltersContext';
import { Database } from '@/integrations/supabase/types';

type ProjectDeliveryRow = Database['public']['Tables']['project_delivery']['Row'];
type ProjectDeliveryInsert = Database['public']['Tables']['project_delivery']['Insert'];
type ProjectDeliveryUpdate = Database['public']['Tables']['project_delivery']['Update'];

export interface ProjectDeliveryWithRelations extends ProjectDeliveryRow {
  countries?: { name: string; code: string } | null;
}

export const useProjectDelivery = () => {
  const { selectedCountry, selectedMonth, selectedYear } = useFilters();
  
  return useQuery({
    queryKey: ['project_delivery', selectedCountry, selectedMonth, selectedYear],
    queryFn: async () => {
      let query = supabase
        .from('project_delivery')
        .select(`
          *,
          countries (name, code)
        `)
        .order('year', { ascending: false })
        .order('month', { ascending: false });
      
      if (selectedCountry) {
        query = query.eq('country_id', selectedCountry);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as ProjectDeliveryWithRelations[];
    },
  });
};

export const useCreateProjectDelivery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (delivery: ProjectDeliveryInsert) => {
      const { data, error } = await supabase
        .from('project_delivery')
        .insert(delivery)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project_delivery'] });
    },
  });
};

export const useUpdateProjectDelivery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ProjectDeliveryUpdate }) => {
      const { data, error } = await supabase
        .from('project_delivery')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project_delivery'] });
    },
  });
};
