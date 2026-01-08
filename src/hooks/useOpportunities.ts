import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useFilters } from '@/contexts/FiltersContext';
import { Database } from '@/integrations/supabase/types';

type OpportunityRow = Database['public']['Tables']['opportunities']['Row'];
type OpportunityInsert = Database['public']['Tables']['opportunities']['Insert'];
type OpportunityUpdate = Database['public']['Tables']['opportunities']['Update'];

export interface OpportunityWithRelations extends OpportunityRow {
  countries?: { name: string; code: string } | null;
  profiles?: { full_name: string | null } | null;
}

export const useOpportunities = () => {
  const { selectedCountry } = useFilters();
  
  return useQuery({
    queryKey: ['opportunities', selectedCountry],
    queryFn: async () => {
      let query = supabase
        .from('opportunities')
        .select(`
          *,
          countries (name, code),
          profiles:owner_id (full_name)
        `)
        .order('created_at', { ascending: false });
      
      if (selectedCountry) {
        query = query.eq('country_id', selectedCountry);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as OpportunityWithRelations[];
    },
  });
};

export const useCreateOpportunity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (opportunity: OpportunityInsert) => {
      const { data, error } = await supabase
        .from('opportunities')
        .insert(opportunity)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    },
  });
};

export const useUpdateOpportunity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: OpportunityUpdate }) => {
      const { data, error } = await supabase
        .from('opportunities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    },
  });
};

export const useDeleteOpportunity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('opportunities')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['opportunities'] });
    },
  });
};
