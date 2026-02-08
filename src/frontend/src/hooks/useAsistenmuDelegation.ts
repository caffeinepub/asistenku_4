import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Task, TaskStatusInternal } from '../backend';

// Query hook for fetching Asistenmu-scoped incoming tasks
// Uses getAllTasksLegacy which filters by caller's role
export function useGetIncomingRequests() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Task[]>({
    queryKey: ['asistenmu-incoming-requests'],
    queryFn: async () => {
      if (!actor) return [];
      // getAllTasksLegacy returns tasks filtered by caller's role
      // For ASISTENMU role, it returns tasks assigned to them
      return actor.getAllTasksLegacy();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Query hook for fetching task details by ID
export function useGetTaskById(taskId: string | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Task | null>({
    queryKey: ['task-detail', taskId],
    queryFn: async () => {
      if (!actor || !taskId) return null;
      return actor.getTaskLegacy(taskId);
    },
    enabled: !!actor && !actorFetching && !!taskId,
    retry: false,
  });
}

// Mutation hook for assigning task to partner
export function useAssignTaskToPartner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, partnerId }: { taskId: string; partnerId: string }) => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.assignTaskToPartner(taskId, partnerId);
      if (!result) {
        throw new Error('Failed to assign task to partner');
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asistenmu-incoming-requests'] });
      queryClient.invalidateQueries({ queryKey: ['task-detail'] });
    },
  });
}

// Mutation hook for updating task status
export function useSetTaskStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: TaskStatusInternal }) => {
      if (!actor) throw new Error('Actor not available');
      const result = await actor.setTaskStatus(taskId, status);
      if (!result) {
        throw new Error('Failed to update task status');
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asistenmu-incoming-requests'] });
      queryClient.invalidateQueries({ queryKey: ['task-detail'] });
    },
  });
}
