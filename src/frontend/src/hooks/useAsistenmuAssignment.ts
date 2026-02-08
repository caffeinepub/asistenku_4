import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';

// Local type definition
export interface AsistenmuCandidateDTO {
  principalId: string;
  name: string;
  role: string;
  status: string;
}

// Get ASISTENMU candidates - stubbed until backend implements
export function useGetAsistenmuCandidates() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<AsistenmuCandidateDTO[]>({
    queryKey: ['asistenmu-candidates'],
    queryFn: async () => {
      return [];
    },
    enabled: !!actor && !actorFetching,
  });
}

// Assign ASISTENMU to Layananku - stubbed until backend implements
export function useAssignAsistenmuToLayananku() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { layanankuId: string; asistenmuPrincipalId: string }) => {
      if (!actor) throw new Error('Actor not available');
      throw new Error('Feature not yet available');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['layananku-internal'] });
      queryClient.invalidateQueries({ queryKey: ['layananku-for-client'] });
      toast.success('Asistenmu assigned successfully');
    },
    onError: (error: any) => {
      console.error('Assign Asistenmu error:', error);
      toast.error(error.message || 'Failed to assign Asistenmu');
    },
  });
}
