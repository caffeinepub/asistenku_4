import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { SearchMode as BackendSearchMode } from '@/backend';
import type { SearchResult } from '@/backend';
import type { SearchMode } from '@/components/superadmin/UserSearchBar';

// Search services and clients
export function useSearchServicesAndClients(searchQuery: string, searchMode: SearchMode) {
  const { actor, isFetching: actorFetching } = useActor();

  // Map UI search mode to backend search mode
  const getBackendSearchMode = (): BackendSearchMode => {
    if (!searchQuery || searchQuery.trim() === '') {
      return BackendSearchMode.searchAll;
    }
    
    switch (searchMode) {
      case 'userId':
        return BackendSearchMode.searchByClientId;
      case 'principalId':
        return BackendSearchMode.searchByClientPrincipal;
      case 'name':
        // Backend doesn't have name search yet, use searchAll for now
        return BackendSearchMode.searchAll;
      default:
        return BackendSearchMode.searchAll;
    }
  };

  return useQuery<SearchResult>({
    queryKey: ['search-services-clients', searchQuery, searchMode],
    queryFn: async () => {
      if (!actor) return { users: [], services: [] };
      
      const backendMode = getBackendSearchMode();
      const query = searchQuery.trim();
      
      return actor.searchServicesAndClientsById(query, backendMode);
    },
    enabled: !!actor && !actorFetching,
  });
}
