import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

// Placeholder wallet structure until backend implements wallet queries
interface PartnerWallet {
  balance: number;
  totalEarnings: number;
  pendingPayouts: number;
}

export function useGetPartnerWallet() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<PartnerWallet>({
    queryKey: ['partnerWallet'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      // Placeholder: return empty wallet until backend implements getPartnerWallet
      return {
        balance: 0,
        totalEarnings: 0,
        pendingPayouts: 0,
      };
    },
    enabled: !!actor && !actorFetching,
  });
}
