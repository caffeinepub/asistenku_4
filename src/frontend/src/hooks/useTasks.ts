import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { TaskRecord } from '../backend';

// Re-export TaskRecord for convenience
export type { TaskRecord };

// Get all client tasks (for internal roles)
export function useGetAllClientTasks() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TaskRecord[]>({
    queryKey: ['all-client-tasks'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllTasksInternal();
    },
    enabled: !!actor && !actorFetching,
  });
}
