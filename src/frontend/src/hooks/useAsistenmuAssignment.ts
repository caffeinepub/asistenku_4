import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';
import type { AsistenmuCandidateDTO } from '@/backend';

// Get list of ASISTENMU candidates for assignment
export function useGetAsistenmuCandidates() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<AsistenmuCandidateDTO[]>({
    queryKey: ['asistenmu-candidates'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAsistenmuCandidates();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Assign ASISTENMU to a Layananku
export function useAssignAsistenmuToLayananku() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { layanankuId: string; asistenmuPrincipalId: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.assignAsistenmuToLayananku(data.layanankuId, data.asistenmuPrincipalId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['layananku-internal'] });
      queryClient.invalidateQueries({ queryKey: ['my-layananku'] });
      queryClient.invalidateQueries({ queryKey: ['layananku-for-client'] });
      toast.success('Asistenmu assigned successfully');
    },
    onError: (error: any) => {
      console.error('Assign asistenmu error:', error);
      toast.error(error.message || 'Failed to assign asistenmu');
    },
  });
}
