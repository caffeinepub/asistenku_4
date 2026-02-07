import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';
import type { LayanankuRecord, LayanankuPublic, ExtendedLayanankuRecord, LayananKind } from '@/backend';

// Create Layananku mutation
export function useCreateLayananku() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      clientId: string;
      kind: LayananKind;
      startAt: bigint;
      endAt: bigint;
      sharePrincipals: string[];
      hargaPerLayanan: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createLayanankuForClient(
        data.clientId,
        data.kind,
        data.startAt,
        data.endAt,
        data.sharePrincipals,
        data.hargaPerLayanan
      );
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

// Get internal layananku list (for admin/superadmin management)
export function useGetLayanankuInternal(idLayanan: string | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<LayanankuRecord | null>({
    queryKey: ['layananku-internal', idLayanan],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      if (!idLayanan) return null;
      return actor.getLayanankuInternal(idLayanan);
    },
    enabled: !!actor && !actorFetching && !!idLayanan,
  });
}

// Get my layananku (client-facing)
export function useGetMyLayananku() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<LayanankuPublic[]>({
    queryKey: ['my-layananku'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyLayananku();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Get layananku for a specific client with extended data (includes asistenmuName)
export function useGetLayanankuForClient(clientId: string | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ExtendedLayanankuRecord[]>({
    queryKey: ['layananku-for-client', clientId],
    queryFn: async () => {
      if (!actor) return [];
      if (!clientId) return [];
      return actor.getLayanankuForClient(clientId);
    },
    enabled: !!actor && !actorFetching && !!clientId,
  });
}

// Check if caller has active layananku
export function useMyHasActiveLayananku() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['my-has-active-layananku'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.myHasActiveLayananku();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Update layananku share list
export function useUpdateLayanankuShare() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { idLayanan: string; newSharePrincipals: string[] }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateLayanankuShare(data.idLayanan, data.newSharePrincipals);
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

// Deactivate layananku
export function useDeactivateLayananku() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (idLayanan: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deactivateLayananku(idLayanan);
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
