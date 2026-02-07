import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile } from '../backend';

export function useGetCallerUser() {
    const { actor, isFetching: actorFetching } = useActor();

    return useQuery<UserProfile | null>({
        queryKey: ['callerUser'],
        queryFn: async () => {
            if (!actor) throw new Error('Actor not available');
            return actor.getCallerUserProfile();
        },
        enabled: false, // Only call when explicitly triggered
        retry: false
    });
}

export function useGetCallerUserProfile() {
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

export function useRegisterClient() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { name: string; email: string; whatsapp: string; company: string }) => {
            if (!actor) throw new Error('Actor not available');
            return actor.registerClient(data.name, data.email, data.whatsapp, data.company);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['callerUser'] });
            queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
        }
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
        }) => {
            if (!actor) throw new Error('Actor not available');
            return actor.registerPartner(
                data.name,
                data.email,
                data.whatsapp,
                data.skills,
                data.domisili
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['callerUser'] });
            queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
        }
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
            queryClient.invalidateQueries({ queryKey: ['callerUser'] });
            queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
        }
    });
}

export function useClaimSuperadmin() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            if (!actor) throw new Error('Actor not available');
            const result = await actor.claimSuperadmin();
            if (!result) {
                throw new Error('SUPERADMIN has already been claimed');
            }
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['callerUser'] });
            queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
        }
    });
}
