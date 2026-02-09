import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, InternalUserDTO, TaskRecord } from '../backend';
import { SearchMode, UserStatus, ApprovalStatus, PartnerLevel } from '../backend';
import { Principal } from '@icp-sdk/core/principal';
import { mapUILevelToBackend, mapUIStatusToBackend, getHourlyRateForLevel } from '@/lib/superadminUserMapping';

export function useSearchUsers() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ query, mode }: { query: string; mode: 'userId' | 'principalId' | 'name' }) => {
      if (!actor) throw new Error('Actor not available');

      if (mode === 'userId') {
        try {
          const user = await actor.getUserProfile(query);
          return user ? [user] : [];
        } catch (error) {
          console.error('Search by userId failed:', error);
          return [];
        }
      } else if (mode === 'principalId') {
        const searchMode = SearchMode.searchByClientPrincipal;
        try {
          const results = await actor.searchUsersByMode(query, searchMode);
          return results.filter((user) => user.principalId === query);
        } catch (error) {
          console.error('Search failed:', error);
          throw new Error('Search failed. Please try again.');
        }
      } else {
        const searchMode = SearchMode.searchAll;
        try {
          const results = await actor.searchUsersByMode(query, searchMode);
          const lowerQuery = query.toLowerCase();
          return results.filter((user) => {
            const name = user.clientData?.name || user.partnerData?.name || user.internalData?.name || '';
            return name.toLowerCase().includes(lowerQuery);
          });
        } catch (error) {
          console.error('Search failed:', error);
          throw new Error('Search failed. Please try again.');
        }
      }
    },
  });
}

export function useGetPartnersByStatus(status: 'pending' | 'active' | 'suspended' | 'blacklisted') {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProfile[]>({
    queryKey: ['partners', status],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');

      try {
        const backendStatus = mapUIStatusToBackend(status);
        const partners = await actor.getAllPartnersByStatus(backendStatus);
        return partners;
      } catch (error) {
        console.error(`Failed to fetch ${status} partners:`, error);
        throw new Error(`Failed to load ${status} partners`);
      }
    },
    enabled: !!actor && !actorFetching,
    retry: 1,
  });
}

export function useGetPendingInternalUsers() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProfile[]>({
    queryKey: ['users', 'internal', 'pending'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');

      try {
        const pendingUsers = await actor.getPendingInternalUsers();
        return pendingUsers;
      } catch (error) {
        console.error('Failed to fetch pending internal users:', error);
        throw new Error('Failed to load pending internal users');
      }
    },
    enabled: !!actor && !actorFetching,
    retry: 1,
  });
}

export function useGetInternalUsers() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<InternalUserDTO[]>({
    queryKey: ['users', 'internal'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');

      try {
        const internalUsers = await actor.getAllInternalUsers();
        return internalUsers;
      } catch (error) {
        console.error('Failed to fetch internal users:', error);
        throw new Error('Failed to load internal users');
      }
    },
    enabled: !!actor && !actorFetching,
    retry: 1,
  });
}

export function useGetActiveClients() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProfile[]>({
    queryKey: ['clients', 'active'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');

      try {
        const activeClients = await actor.getActiveClientProfiles();
        return activeClients;
      } catch (error) {
        console.error('Failed to fetch active clients:', error);
        throw new Error('Failed to load active clients');
      }
    },
    enabled: !!actor && !actorFetching,
    retry: 1,
  });
}

export function useGetPartnerMetrics(partnerId: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<{ completedJobs: number; rejectedJobs: number; totalEarnings: number }>({
    queryKey: ['partnerMetrics', partnerId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');

      try {
        const [allTasks, partnerProfile] = await Promise.all([
          actor.getAllTasksInternal(),
          actor.getUserProfile(partnerId),
        ]);

        const partnerTasks = allTasks.filter((task) => task.assignedPartnerId?.[0] === partnerId);

        const completedJobs = partnerTasks.filter((task) => task.statusInternal === 'DONE').length;
        const rejectedJobs = partnerTasks.filter((task) => task.statusInternal === 'REVISION').length;

        const hourlyRate = partnerProfile?.partnerData?.hourlyRate || BigInt(0);
        const totalEarnings = Number(hourlyRate) * completedJobs;

        return { completedJobs, rejectedJobs, totalEarnings };
      } catch (error) {
        console.error('Failed to fetch partner metrics:', error);
        throw new Error('Failed to load partner metrics');
      }
    },
    enabled: !!actor && !actorFetching && !!partnerId,
    retry: 1,
  });
}

export function useApprovePartner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ partnerId, level }: { partnerId: string; level: 'JUNIOR' | 'SENIOR' | 'EXPERT' }) => {
      if (!actor) throw new Error('Actor not available');
      
      // First approve the partner
      await actor.approvePartner(partnerId);
      
      // Then set their level and hourly rate
      const backendLevel = mapUILevelToBackend(level);
      const hourlyRate = getHourlyRateForLevel(level);
      await actor.updatePartnerLevelAndHourlyRate(partnerId, backendLevel, hourlyRate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
}

export function useRejectPartner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (partnerId: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.rejectPartner(partnerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
}

export function useSuspendPartner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (partnerId: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.suspendPartner(partnerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
}

export function useBlacklistPartner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (partnerId: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.blacklistPartner(partnerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
}

export function useReactivatePartner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (partnerId: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.reactivatePartner(partnerId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
}

export function useUpdatePartnerLevel() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ partnerId, level }: { partnerId: string; level: 'JUNIOR' | 'SENIOR' | 'EXPERT' }) => {
      if (!actor) throw new Error('Actor not available');
      const backendLevel = mapUILevelToBackend(level);
      const hourlyRate = getHourlyRateForLevel(level);
      await actor.updatePartnerLevelAndHourlyRate(partnerId, backendLevel, hourlyRate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
    },
  });
}

export function useApproveInternalUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.approveInternalUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'internal'] });
      queryClient.invalidateQueries({ queryKey: ['users', 'internal', 'pending'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useRejectInternalUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!actor) throw new Error('Actor not available');
      const userProfile = await actor.getUserProfile(userId);
      if (!userProfile) throw new Error('User not found');
      const principal = Principal.fromText(userProfile.principalId);
      await actor.setApproval(principal, ApprovalStatus.rejected);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'internal'] });
      queryClient.invalidateQueries({ queryKey: ['users', 'internal', 'pending'] });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
