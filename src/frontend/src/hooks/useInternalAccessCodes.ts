import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { InternalAccessCode, InternalCodeType } from '../backend';

// Hook for SUPERADMIN to fetch all internal access codes
export function useGetAccessCodes() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<InternalAccessCode[]>({
    queryKey: ['internalAccessCodes'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAccessCodes();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Hook for SUPERADMIN to update access codes
export function useUpdateAccessCode() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<void, Error, { codeType: InternalCodeType; newCode: string }>({
    mutationFn: async ({ codeType, newCode }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.manageAccessCode(codeType, newCode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['internalAccessCodes'] });
    },
  });
}
