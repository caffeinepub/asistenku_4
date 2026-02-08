import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, InternalUserDTO, CustomerServiceUserDTO, TaskRecord } from '../backend';
import { SearchMode, UserStatus } from '../backend';
import { mapUILevelToBackend, mapUIStatusToBackend, getHourlyRateForLevel } from '@/lib/superadminUserMapping';

export function useSearchUsers() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ query, mode }: { query: string; mode: 'userId' | 'principalId' | 'name' }) => {
      if (!actor) throw new Error('Actor not available');
      
      // Map UI mode to backend SearchMode
      let searchMode: SearchMode;
      if (mode === 'userId') {
        // For userId, use exact match by calling getUserProfile directly
        try {
          const user = await actor.getUserProfile(query);
          return user ? [user] : [];
        } catch (error) {
          console.error('Search by userId failed:', error);
          return [];
        }
      } else if (mode === 'principalId') {
        searchMode = SearchMode.searchByClientPrincipal;
      } else {
        // For name search, we'll use searchAll and filter client-side
        searchMode = SearchMode.searchAll;
      }

      try {
        const results = await actor.searchUsersByMode(query, searchMode);
        
        // If searching by name, filter results client-side (case-insensitive contains)
        if (mode === 'name') {
          const lowerQuery = query.toLowerCase();
          return results.filter(user => {
            const name = user.clientData?.name || user.partnerData?.name || user.internalData?.name || '';
            return name.toLowerCase().includes(lowerQuery);
          });
        }
        
        // For principalId, filter exact match
        if (mode === 'principalId') {
          return results.filter(user => user.principalId === query);
        }
        
        return results;
      } catch (error) {
        console.error('Search failed:', error);
        throw new Error('Search failed. Please try again.');
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

export function useGetCustomerServiceUsers() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<CustomerServiceUserDTO[]>({
    queryKey: ['users', 'role', 'CUSTOMER_SERVICE'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        const csUsers = await actor.getAllCustomerServiceUsers();
        return csUsers;
      } catch (error) {
        console.error('Failed to fetch customer service users:', error);
        throw new Error('Failed to load customer service users');
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
        // Fetch all tasks and partner profile to compute metrics
        const [allTasks, partnerProfile] = await Promise.all([
          actor.getAllTasksInternal(),
          actor.getUserProfile(partnerId),
        ]);

        // Filter tasks assigned to this partner
        const partnerTasks = allTasks.filter(task => task.assignedPartnerId?.[0] === partnerId);

        // Count completed and rejected/cancelled tasks
        const completedJobs = partnerTasks.filter(task => task.statusInternal === 'DONE').length;
        const rejectedJobs = partnerTasks.filter(task => 
          task.statusInternal === 'REVISION' // Using REVISION as proxy for rejected
        ).length;

        // Estimate earnings: completed jobs × hourly rate (simplified baseline)
        const hourlyRate = partnerProfile?.partnerData?.hourlyRate || BigInt(0);
        const totalEarnings = completedJobs * Number(hourlyRate);

        return {
          completedJobs,
          rejectedJobs,
          totalEarnings,
        };
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
      
      try {
        // First approve the partner (changes status from pending to active)
        await actor.approvePartner(partnerId);
        
        // Then set the level and hourly rate
        const backendLevel = mapUILevelToBackend(level);
        const hourlyRate = getHourlyRateForLevel(level);
        await actor.updatePartnerLevelAndHourlyRate(partnerId, backendLevel, hourlyRate);
      } catch (error: any) {
        console.error('Failed to approve partner:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to approve partners');
        }
        if (error.message?.includes('not found')) {
          throw new Error('Partner not found');
        }
        if (error.message?.includes('Invalid status transition')) {
          throw new Error('Partner is not in pending status');
        }
        throw new Error('Failed to approve partner. Please try again.');
      }
    },
    onSuccess: () => {
      // Invalidate all partner queries to refresh lists
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
      
      try {
        await actor.rejectPartner(partnerId);
      } catch (error: any) {
        console.error('Failed to reject partner:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to reject partners');
        }
        if (error.message?.includes('not found')) {
          throw new Error('Partner not found');
        }
        throw new Error('Failed to reject partner. Please try again.');
      }
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
      
      try {
        const backendLevel = mapUILevelToBackend(level);
        const hourlyRate = getHourlyRateForLevel(level);
        await actor.updatePartnerLevelAndHourlyRate(partnerId, backendLevel, hourlyRate);
      } catch (error: any) {
        console.error('Failed to update partner level:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to update partner levels');
        }
        if (error.message?.includes('not found')) {
          throw new Error('Partner not found');
        }
        throw new Error('Failed to update partner level. Please try again.');
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      queryClient.invalidateQueries({ queryKey: ['partnerMetrics', variables.partnerId] });
    },
  });
}

export function useSuspendPartner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (partnerId: string) => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        await actor.suspendPartner(partnerId);
      } catch (error: any) {
        console.error('Failed to suspend partner:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to suspend partners');
        }
        if (error.message?.includes('not found')) {
          throw new Error('Partner not found');
        }
        if (error.message?.includes('Invalid status transition')) {
          throw new Error('Partner must be active to suspend');
        }
        throw new Error('Failed to suspend partner. Please try again.');
      }
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
      
      try {
        await actor.blacklistPartner(partnerId);
      } catch (error: any) {
        console.error('Failed to blacklist partner:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to blacklist partners');
        }
        if (error.message?.includes('not found')) {
          throw new Error('Partner not found');
        }
        throw new Error('Failed to blacklist partner. Please try again.');
      }
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
      
      try {
        await actor.reactivatePartner(partnerId);
      } catch (error: any) {
        console.error('Failed to reactivate partner:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to reactivate partners');
        }
        if (error.message?.includes('not found')) {
          throw new Error('Partner not found');
        }
        if (error.message?.includes('Invalid status transition')) {
          throw new Error('Partner must be suspended to reactivate');
        }
        throw new Error('Failed to reactivate partner. Please try again.');
      }
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
      
      try {
        // Get the user profile to extract the principal
        const userProfile = await actor.getUserProfile(userId);
        if (!userProfile) {
          throw new Error('User not found');
        }

        // Use setApproval to approve the user
        const principal = { toText: () => userProfile.principalId } as any;
        await actor.setApproval(principal, { approved: 'approved' } as any);
      } catch (error: any) {
        console.error('Failed to approve internal user:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to approve internal users');
        }
        if (error.message?.includes('not found')) {
          throw new Error('User not found');
        }
        throw new Error('Failed to approve internal user. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'internal'] });
    },
  });
}

export function useRejectInternalUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!actor) throw new Error('Actor not available');
      
      try {
        // Get the user profile to extract the principal
        const userProfile = await actor.getUserProfile(userId);
        if (!userProfile) {
          throw new Error('User not found');
        }

        // Use setApproval to reject the user
        const principal = { toText: () => userProfile.principalId } as any;
        await actor.setApproval(principal, { rejected: 'rejected' } as any);
      } catch (error: any) {
        console.error('Failed to reject internal user:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to reject internal users');
        }
        if (error.message?.includes('not found')) {
          throw new Error('User not found');
        }
        throw new Error('Failed to reject internal user. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'internal'] });
    },
  });
}
