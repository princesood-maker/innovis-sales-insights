import React, { useMemo } from 'react';
import { useProjectDelivery } from '@/hooks/useProjectDelivery';
import { useFilters } from '@/contexts/FiltersContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  ScatterChart,
  Scatter,
  Cell,
} from 'recharts';

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

const healthColors = {
  Green: 'bg-green-100 text-green-700 border-green-300',
  Amber: 'bg-amber-100 text-amber-700 border-amber-300',
  Red: 'bg-red-100 text-red-700 border-red-300',
};

const scatterColors = {
  Green: 'hsl(120, 40%, 50%)',
  Amber: 'hsl(45, 90%, 50%)',
  Red: 'hsl(0, 70%, 50%)',
};

const Delivery = () => {
  const { data: deliveryData, isLoading } = useProjectDelivery();
  const { selectedMonth, selectedYear } = useFilters();

  // Current month data
  const currentMonthData = useMemo(() => {
    return deliveryData?.filter(d => d.month === selectedMonth && d.year === selectedYear) || [];
  }, [deliveryData, selectedMonth, selectedYear]);

  // Summary metrics
  const summary = useMemo(() => {
    if (!currentMonthData.length) return null;

    const totals = currentMonthData.reduce((acc, d) => ({
      plannedSites: acc.plannedSites + (d.planned_sites || 0),
      actualSites: acc.actualSites + (d.actual_sites || 0),
      plannedTeams: acc.plannedTeams + (d.planned_teams || 0),
      actualTeams: acc.actualTeams + (d.actual_teams || 0),
      plannedRevenue: acc.plannedRevenue + Number(d.planned_revenue || 0),
      actualRevenue: acc.actualRevenue + Number(d.actual_revenue || 0),
      forecastRevenue: acc.forecastRevenue + Number(d.forecast_revenue || 0),
    }), {
      plannedSites: 0,
      actualSites: 0,
      plannedTeams: 0,
      actualTeams: 0,
      plannedRevenue: 0,
      actualRevenue: 0,
      forecastRevenue: 0,
    });

    return {
      ...totals,
      siteVariance: totals.plannedSites > 0 ? ((totals.actualSites - totals.plannedSites) / totals.plannedSites * 100) : 0,
      revenueVariance: totals.plannedRevenue > 0 ? ((totals.actualRevenue - totals.plannedRevenue) / totals.plannedRevenue * 100) : 0,
      revenuePerTeam: totals.actualTeams > 0 ? totals.actualRevenue / totals.actualTeams : 0,
    };
  }, [currentMonthData]);

  // Trend data (last 6 months)
  const trendData = useMemo(() => {
    if (!deliveryData) return [];
    
    const months: Array<{ period: string; planned: number; actual: number }> = [];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(selectedYear, selectedMonth - 1 - i);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      
      const monthData = deliveryData.filter(d => d.month === month && d.year === year);
      const planned = monthData.reduce((sum, d) => sum + Number(d.planned_revenue || 0), 0);
      const actual = monthData.reduce((sum, d) => sum + Number(d.actual_revenue || 0), 0);
      
      months.push({
        period: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        planned,
        actual,
      });
    }
    
    return months;
  }, [deliveryData, selectedMonth, selectedYear]);

  // Revenue per team data
  const teamProductivityData = useMemo(() => {
    return currentMonthData
      .filter(d => (d.actual_teams || 0) > 0)
      .map(d => ({
        country: d.countries?.code || 'Unknown',
        current: d.actual_teams ? Number(d.actual_revenue || 0) / d.actual_teams : 0,
        forecast: d.forecast_teams ? Number(d.forecast_revenue || 0) / d.forecast_teams : 0,
      }))
      .sort((a, b) => b.current - a.current);
  }, [currentMonthData]);

  // Scatter plot data for capacity risk
  const capacityRiskData = useMemo(() => {
    return currentMonthData.map(d => ({
      country: d.countries?.name || 'Unknown',
      utilization: d.planned_teams ? ((d.actual_teams || 0) / d.planned_teams * 100) : 0,
      variance: d.planned_revenue ? ((Number(d.actual_revenue || 0) - Number(d.planned_revenue)) / Number(d.planned_revenue) * 100) : 0,
      health: d.health_status || 'Green',
    }));
  }, [currentMonthData]);

  // Country health counts
  const healthCounts = useMemo(() => {
    const counts = { Green: 0, Amber: 0, Red: 0 };
    currentMonthData.forEach(d => {
      counts[d.health_status || 'Green']++;
    });
    return counts;
  }, [currentMonthData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading delivery data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Project Delivery</h1>
        <p className="text-muted-foreground">Operations & revenue control dashboard</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sites Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.actualSites || 0}</div>
            <p className="text-xs text-muted-foreground">
              of {summary?.plannedSites || 0} planned
              {summary && summary.siteVariance !== 0 && (
                <span className={summary.siteVariance >= 0 ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                  {summary.siteVariance >= 0 ? '+' : ''}{summary.siteVariance.toFixed(0)}%
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.actualTeams || 0}</div>
            <p className="text-xs text-muted-foreground">of {summary?.plannedTeams || 0} planned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Actual Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary?.actualRevenue || 0)}</div>
            <p className="text-xs text-muted-foreground">
              {summary && summary.revenueVariance !== 0 && (
                <span className={summary.revenueVariance >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {summary.revenueVariance >= 0 ? '+' : ''}{summary.revenueVariance.toFixed(0)}% vs plan
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue/Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary?.revenuePerTeam || 0)}</div>
            <p className="text-xs text-muted-foreground">Average productivity</p>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Country Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-bold text-green-600">{healthCounts.Green}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="font-bold text-amber-600">{healthCounts.Amber}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="font-bold text-red-600">{healthCounts.Red}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Planned vs Actual Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Planned vs Actual Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="period" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                  <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="planned" stroke="hsl(220, 60%, 50%)" strokeDasharray="5 5" strokeWidth={2} name="Planned" />
                  <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue per Team */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Revenue per Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamProductivityData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis type="category" dataKey="country" tick={{ fill: 'hsl(var(--muted-foreground))' }} width={40} />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend />
                  <Bar dataKey="current" fill="hsl(var(--primary))" name="Current" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="forecast" fill="hsl(220, 60%, 70%)" name="Forecast" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Country Health Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Country Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Planned Sites</TableHead>
                <TableHead className="text-right">Actual Sites</TableHead>
                <TableHead className="text-right">Teams</TableHead>
                <TableHead className="text-right">Planned Rev</TableHead>
                <TableHead className="text-right">Actual Rev</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead>Health</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMonthData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    No delivery data for selected period
                  </TableCell>
                </TableRow>
              ) : (
                currentMonthData.map((d) => {
                  const variance = d.planned_revenue 
                    ? ((Number(d.actual_revenue || 0) - Number(d.planned_revenue)) / Number(d.planned_revenue) * 100)
                    : 0;
                  
                  return (
                    <TableRow key={d.id}>
                      <TableCell className="font-medium">{d.countries?.name || '-'}</TableCell>
                      <TableCell className="text-right">{d.planned_sites || 0}</TableCell>
                      <TableCell className="text-right">{d.actual_sites || 0}</TableCell>
                      <TableCell className="text-right">{d.actual_teams || 0}</TableCell>
                      <TableCell className="text-right">{formatCurrency(Number(d.planned_revenue || 0))}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(Number(d.actual_revenue || 0))}</TableCell>
                      <TableCell className={`text-right ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {variance >= 0 ? '+' : ''}{variance.toFixed(0)}%
                      </TableCell>
                      <TableCell>
                        <Badge className={healthColors[d.health_status || 'Green']} variant="outline">
                          {d.health_status || 'Green'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Delivery;
