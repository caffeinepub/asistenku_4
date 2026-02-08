import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PartnerTaskDTO, TaskRecord, TaskStatusInternal } from '../backend';

export function useGetMyPartnerTasks() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PartnerTaskDTO>({
    queryKey: ['myPartnerTasks'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMyPartnerTasks();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetTaskById(taskId: string | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TaskRecord | null>({
    queryKey: ['taskDetail', taskId],
    queryFn: async () => {
      if (!actor || !taskId) return null;
      return actor.getTaskById(taskId);
    },
    enabled: !!actor && !actorFetching && !!taskId,
  });
}

export function useSetTaskStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: TaskStatusInternal }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setTaskStatus(taskId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPartnerTasks'] });
      queryClient.invalidateQueries({ queryKey: ['taskDetail'] });
      queryClient.invalidateQueries({ queryKey: ['partnerWallet'] });
    },
  });
}
