import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Service, ServicePublic, TaskRecord } from '../backend';

export function useGetCallerUser() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useUpdateCallerProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useRegisterClient() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; whatsapp: string; company: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerClient(data.name, data.email, data.whatsapp, data.company);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useRegisterPartner() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      whatsapp: string;
      skills: string;
      domisili: string;
      level: any;
      hourlyRate: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerPartner(
        data.name,
        data.email,
        data.whatsapp,
        data.skills,
        data.domisili,
        data.level,
        data.hourlyRate
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useRegisterInternalUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { role: string; name: string; email: string; whatsapp: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerInternalUser(data.role, data.name, data.email, data.whatsapp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useClaimSuperadmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.claimSuperadmin();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['superadminClaimed'] });
    },
  });
}

export function useCheckSuperadminClaimed() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['superadminClaimed'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isSuperadminClaimed();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    staleTime: 60000,
  });
}

export function useValidateRoleName() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (roleName: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.isValidRoleName(roleName);
    },
  });
}

export function useGetAllServicesPublic() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ServicePublic[]>({
    queryKey: ['servicesPublic'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServicesPublic();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetAllServices() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetAllTasks() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TaskRecord[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTasksInternal();
    },
    enabled: !!actor && !actorFetching,
  });
}
