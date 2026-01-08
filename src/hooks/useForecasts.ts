import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useFilters } from '@/contexts/FiltersContext';
import { Database } from '@/integrations/supabase/types';

type ForecastRow = Database['public']['Tables']['forecasts']['Row'];
type ForecastInsert = Database['public']['Tables']['forecasts']['Insert'];
type ForecastUpdate = Database['public']['Tables']['forecasts']['Update'];

export interface ForecastWithRelations extends ForecastRow {
  countries?: { name: string; code: string } | null;
}

export const useForecasts = () => {
  const { selectedCountry, selectedYear } = useFilters();
  
  return useQuery({
    queryKey: ['forecasts', selectedCountry, selectedYear],
    queryFn: async () => {
      let query = supabase
        .from('forecasts')
        .select(`
          *,
          countries (name, code)
        `)
        .order('year', { ascending: true })
        .order('quarter', { ascending: true });
      
      if (selectedCountry) {
        query = query.eq('country_id', selectedCountry);
      }
      
      // Get 2 years of forecasts
      query = query.gte('year', selectedYear).lte('year', selectedYear + 1);
      
      const { data, error } = await query;
      if (error) throw error;
      return data as ForecastWithRelations[];
    },
  });
};

export const useCreateForecast = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (forecast: ForecastInsert) => {
      const { data, error } = await supabase
        .from('forecasts')
        .insert(forecast)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forecasts'] });
    },
  });
};

export const useUpdateForecast = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ForecastUpdate }) => {
      const { data, error } = await supabase
        .from('forecasts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forecasts'] });
    },
  });
};
