import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';
import type { TaskRecord } from '../backend';

// Create client service request mutation - stubbed until backend implements
export function useCreateClientServiceRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      clientDeadline: bigint | null;
      requestType: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      // Backend method not yet implemented
      throw new Error('Feature not yet available');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-client-tasks'] });
      toast.success('Your request has been sent. Asistenmu will contact you via WhatsApp.');
    },
    onError: (error: any) => {
      console.error('Create service request error:', error);
      toast.error(error.message || 'Failed to create service request');
    },
  });
}

// Get my client tasks query - stubbed until backend implements
export function useGetMyClientTasks() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TaskRecord[]>({
    queryKey: ['my-client-tasks'],
    queryFn: async () => {
      // Backend method not yet implemented
      return [];
    },
    enabled: !!actor && !actorFetching,
  });
}
