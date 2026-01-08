import React, { useMemo } from 'react';
import { useForecasts } from '@/hooks/useForecasts';
import { useOpportunities } from '@/hooks/useOpportunities';
import { useFilters } from '@/contexts/FiltersContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
} from 'recharts';
import { Database } from '@/integrations/supabase/types';

type BusinessArea = Database['public']['Enums']['business_area'];

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
const businessAreas: BusinessArea[] = ['Telecom Build', 'Network Implementation', 'NOC', 'FLM', 'Resource Provisioning'];
const COLORS = ['hsl(var(--primary))', 'hsl(220, 60%, 50%)', 'hsl(280, 60%, 50%)', 'hsl(45, 80%, 50%)', 'hsl(160, 50%, 45%)'];

const Forecast = () => {
  const { data: forecasts, isLoading: forecastsLoading } = useForecasts();
  const { data: opportunities, isLoading: oppsLoading } = useOpportunities();
  const { selectedYear } = useFilters();

  const isLoading = forecastsLoading || oppsLoading;

  // Calculate forecast from opportunities (weighted by probability)
  const opportunityForecast = useMemo(() => {
    if (!opportunities) return [];
    
    const forecastData: Record<string, Record<string, number>> = {};
    
    opportunities.forEach(opp => {
      if (opp.status === 'Lost') return;
      
      const closeDate = opp.expected_closure_date ? new Date(opp.expected_closure_date) : null;
      if (!closeDate) return;
      
      const year = closeDate.getFullYear();
      const quarter = Math.floor(closeDate.getMonth() / 3) + 1;
      const key = `${year}-Q${quarter}`;
      
      if (!forecastData[key]) {
        forecastData[key] = {};
        businessAreas.forEach(area => {
          forecastData[key][area] = 0;
        });
      }
      
      const weightedValue = Number(opp.deal_value) * (opp.probability / 100);
      forecastData[key][opp.business_area] = (forecastData[key][opp.business_area] || 0) + weightedValue;
    });
    
    return forecastData;
  }, [opportunities]);

  // Generate 2-year quarterly data
  const quarterlyData = useMemo(() => {
    const data: Array<{
      period: string;
      year: number;
      quarter: number;
      [key: string]: number | string;
    }> = [];
    
    [selectedYear, selectedYear + 1].forEach(year => {
      quarters.forEach((q, qIdx) => {
        const key = `${year}-${q}`;
        const oppData = opportunityForecast[key] || {};
        
        const row: any = {
          period: `${q} ${year}`,
          year,
          quarter: qIdx + 1,
        };
        
        businessAreas.forEach(area => {
          row[area] = oppData[area] || 0;
        });
        
        row.total = businessAreas.reduce((sum, area) => sum + (row[area] as number), 0);
        
        data.push(row);
      });
    });
    
    return data;
  }, [selectedYear, opportunityForecast]);

  // Revenue by business area summary
  const businessAreaSummary = useMemo(() => {
    return businessAreas.map((area, index) => {
      const total = quarterlyData.reduce((sum, q) => sum + ((q[area] as number) || 0), 0);
      return {
        name: area,
        value: total,
        color: COLORS[index],
      };
    }).sort((a, b) => b.value - a.value);
  }, [quarterlyData]);

  // Revenue by country (from opportunities)
  const countryData = useMemo(() => {
    if (!opportunities) return [];
    
    const byCountry: Record<string, number> = {};
    opportunities.forEach(opp => {
      if (opp.status === 'Lost') return;
      const country = opp.countries?.name || 'Unknown';
      const weightedValue = Number(opp.deal_value) * (opp.probability / 100);
      byCountry[country] = (byCountry[country] || 0) + weightedValue;
    });
    
    return Object.entries(byCountry)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [opportunities]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading forecast...</div>
      </div>
    );
  }

  const totalForecast = quarterlyData.reduce((sum, q) => sum + (q.total as number), 0);
  const yearOneTotal = quarterlyData.filter(q => q.year === selectedYear).reduce((sum, q) => sum + (q.total as number), 0);
  const yearTwoTotal = quarterlyData.filter(q => q.year === selectedYear + 1).reduce((sum, q) => sum + (q.total as number), 0);
  const yoyGrowth = yearOneTotal > 0 ? ((yearTwoTotal - yearOneTotal) / yearOneTotal * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Business Forecast</h1>
        <p className="text-muted-foreground">2-year revenue projection linked to opportunities</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalForecast)}</div>
            <p className="text-xs text-muted-foreground">Next 24 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{selectedYear} Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(yearOneTotal)}</div>
            <p className="text-xs text-muted-foreground">Current year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{selectedYear + 1} Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(yearTwoTotal)}</div>
            <p className="text-xs text-muted-foreground">Next year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">YoY Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${yoyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {yoyGrowth >= 0 ? '+' : ''}{yoyGrowth.toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">Projected growth</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quarterly Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Quarterly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="period" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                  <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Business Area */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Revenue by Business Line</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={businessAreaSummary} layout="vertical" margin={{ left: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} width={120} />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stacked Bar by Business Area */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Quarterly Breakdown by Business Line</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="period" tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: 'hsl(var(--muted-foreground))' }} fontSize={12} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))' }}
                />
                <Legend />
                {businessAreas.map((area, index) => (
                  <Bar key={area} dataKey={area} stackId="a" fill={COLORS[index]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Country */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Forecast by Country</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData} layout="vertical" margin={{ left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} width={100} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="value" fill="hsl(220, 60%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Forecast;
