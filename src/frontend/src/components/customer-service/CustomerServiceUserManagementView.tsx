import { useState } from 'react';
import UserSearchBar from '../superadmin/UserSearchBar';
import ReadOnlyPartnerStatusSection from './ReadOnlyPartnerStatusSection';
import UserRoleUsersCard from '../superadmin/UserRoleUsersCard';
import CustomerServiceUserDetailPanel from './CustomerServiceUserDetailPanel';
import { 
  useSearchUsers, 
  useGetPartnersByStatus,
  useGetInternalUsers
} from '@/hooks/useSuperadminUserManagement';
import type { UserProfile } from '@/backend';

export default function CustomerServiceUserManagementView() {
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const searchUsers = useSearchUsers();
  const pendingPartners = useGetPartnersByStatus('pending');
  const activePartners = useGetPartnersByStatus('active');
  const suspendedPartners = useGetPartnersByStatus('suspended');
  const blacklistedPartners = useGetPartnersByStatus('blacklisted');
  const internalUsers = useGetInternalUsers();

  const handleSearch = async (query: string, mode: 'userId' | 'principalId' | 'name') => {
    try {
      const results = await searchUsers.mutateAsync({ query, mode });
      setSearchResults(results);
      setHasSearched(true);
    } catch (error) {
      setSearchResults([]);
      setHasSearched(true);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">User Management (Read-Only)</h2>
        <UserSearchBar onSearch={handleSearch} />
        {hasSearched && (
          <div className="p-4 border rounded-lg">
            {searchResults.length === 0 ? (
              <p className="text-center text-muted-foreground">No users found</p>
            ) : (
              <div className="space-y-2">
                <p className="font-medium">Search Results ({searchResults.length})</p>
                <div className="space-y-1">
                  {searchResults.map((user) => (
                    <div 
                      key={user.id} 
                      className="p-3 border rounded-md cursor-pointer hover:bg-accent"
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.id}</p>
                          <p className="text-sm text-muted-foreground">{user.role}</p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                          {user.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Partner Management (Read-Only)</h3>

        <ReadOnlyPartnerStatusSection
          title="Pending Partners"
          description="Partners awaiting approval"
          partners={pendingPartners.data || []}
          status="pending"
          isLoading={pendingPartners.isLoading}
          error={pendingPartners.error}
          onUserClick={setSelectedUser}
        />

        <ReadOnlyPartnerStatusSection
          title="Active Partners"
          description="Currently active partners"
          partners={activePartners.data || []}
          status="active"
          isLoading={activePartners.isLoading}
          error={activePartners.error}
          onUserClick={setSelectedUser}
        />

        <ReadOnlyPartnerStatusSection
          title="Suspended Partners"
          description="Temporarily suspended partners"
          partners={suspendedPartners.data || []}
          status="suspended"
          isLoading={suspendedPartners.isLoading}
          error={suspendedPartners.error}
          onUserClick={setSelectedUser}
        />

        <ReadOnlyPartnerStatusSection
          title="Blacklisted Partners"
          description="Permanently blacklisted partners"
          partners={blacklistedPartners.data || []}
          status="blacklisted"
          isLoading={blacklistedPartners.isLoading}
          error={blacklistedPartners.error}
          onUserClick={setSelectedUser}
        />

        <UserRoleUsersCard
          title="Internal Users"
          description="Admin, Asistenmu, Supervisor, Management, Finance, and Customer Service users"
          users={internalUsers.data || []}
          isLoading={internalUsers.isLoading}
          error={internalUsers.error}
        />
      </div>

      {selectedUser && (
        <CustomerServiceUserDetailPanel
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
