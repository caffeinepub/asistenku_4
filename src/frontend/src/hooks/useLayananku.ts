import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';

// Local type definitions since backend doesn't export these yet
export interface LayanankuRecord {
  id: string;
  kind: string;
  startAt: bigint;
  endAt: bigint;
  status: string;
  sharePrincipals: string[];
  hargaPerLayanan: bigint;
  clientId: string;
  createdAt: bigint;
  updatedAt: bigint;
  asistenmuPrincipalId: string | null;
  asistenmuNameSnapshot: string | null;
}

export interface LayanankuPublic {
  id: string;
  kind: string;
  startAt: bigint;
  endAt: bigint;
  status: string;
  sharePrincipals: string[];
  createdAt: bigint;
  updatedAt: bigint;
}

export interface ExtendedLayanankuRecord {
  id: string;
  kind: string;
  startAt: bigint;
  endAt: bigint;
  status: string;
  sharePrincipals: string[];
  hargaPerLayanan: bigint;
  clientId: string;
  createdAt: bigint;
  updatedAt: bigint;
  asistenmuPrincipalId: string | null;
  asistenmuName: string | null;
}

// Create Layananku mutation - stubbed until backend implements
export function useCreateLayananku() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      clientId: string;
      kind: string;
      startAt: bigint;
      endAt: bigint;
      sharePrincipals: string[];
      hargaPerLayanan: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      // Backend method not yet implemented
      throw new Error('Feature not yet available');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['layananku-internal'] });
      queryClient.invalidateQueries({ queryKey: ['my-layananku'] });
      queryClient.invalidateQueries({ queryKey: ['layananku-for-client'] });
      toast.success('Created successfully');
    },
    onError: (error: any) => {
      console.error('Create layananku error:', error);
      toast.error(error.message || 'Failed to create layananku');
    },
  });
}

// Get internal layananku list (for admin/superadmin management) - stubbed
export function useGetLayanankuInternal(idLayanan: string | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<LayanankuRecord | null>({
    queryKey: ['layananku-internal', idLayanan],
    queryFn: async () => {
      return null;
    },
    enabled: !!actor && !actorFetching && !!idLayanan,
  });
}

// Get my layananku (client-facing) - stubbed
export function useGetMyLayananku() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<LayanankuPublic[]>({
    queryKey: ['my-layananku'],
    queryFn: async () => {
      return [];
    },
    enabled: !!actor && !actorFetching,
  });
}

// Get layananku for a specific client with extended data - stubbed
export function useGetLayanankuForClient(clientId: string | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ExtendedLayanankuRecord[]>({
    queryKey: ['layananku-for-client', clientId],
    queryFn: async () => {
      return [];
    },
    enabled: !!actor && !actorFetching && !!clientId,
  });
}

// Check if caller has active layananku - stubbed
export function useMyHasActiveLayananku() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['my-has-active-layananku'],
    queryFn: async () => {
      return false;
    },
    enabled: !!actor && !actorFetching,
  });
}

// Update layananku share list - stubbed
export function useUpdateLayanankuShare() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { idLayanan: string; newSharePrincipals: string[] }) => {
      if (!actor) throw new Error('Actor not available');
      throw new Error('Feature not yet available');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['layananku-internal'] });
      queryClient.invalidateQueries({ queryKey: ['my-layananku'] });
      queryClient.invalidateQueries({ queryKey: ['layananku-for-client'] });
      toast.success('Updated successfully');
    },
    onError: (error: any) => {
      console.error('Update layananku error:', error);
      toast.error(error.message || 'Failed to update layananku');
    },
  });
}

// Deactivate layananku - stubbed
export function useDeactivateLayananku() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (idLayanan: string) => {
      if (!actor) throw new Error('Actor not available');
      throw new Error('Feature not yet available');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['layananku-internal'] });
      queryClient.invalidateQueries({ queryKey: ['my-layananku'] });
      queryClient.invalidateQueries({ queryKey: ['layananku-for-client'] });
      toast.success('Deactivated successfully');
    },
    onError: (error: any) => {
      console.error('Deactivate layananku error:', error);
      toast.error(error.message || 'Failed to deactivate layananku');
    },
  });
}
