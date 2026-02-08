import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { TaskRecord } from '../backend';

// Fetch all internal tasks for SUPERADMIN
export function useGetAllInternalTasks() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TaskRecord[]>({
    queryKey: ['all-internal-tasks'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllTasksInternal();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Fetch task detail by ID
export function useGetTaskById(taskId: string | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TaskRecord | null>({
    queryKey: ['task-detail', taskId],
    queryFn: async () => {
      if (!actor || !taskId) return null;
      return actor.getTaskById(taskId);
    },
    enabled: !!actor && !actorFetching && !!taskId,
  });
}
