import { useState } from 'react';
import UserSearchBar from './UserSearchBar';
import PartnerStatusSection from './PartnerStatusSection';
import UserRoleUsersCard from './UserRoleUsersCard';
import ActiveClientsCard from './ActiveClientsCard';
import InternalPendingRegistrationCard from './InternalPendingRegistrationCard';
import {
  useSearchUsers,
  useGetPartnersByStatus,
  useGetInternalUsers,
  useGetCustomerServiceUsers,
  useGetActiveClients,
  useApproveInternalUser,
  useRejectInternalUser,
} from '@/hooks/useSuperadminUserManagement';
import { useGetCallerUser } from '@/hooks/useQueries';
import type { UserProfile } from '@/backend';

export default function UserManagementView() {
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [approvingUserId, setApprovingUserId] = useState<string | undefined>();
  const [rejectingUserId, setRejectingUserId] = useState<string | undefined>();

  const { data: currentUser } = useGetCallerUser();
  const searchUsers = useSearchUsers();
  const pendingPartners = useGetPartnersByStatus('pending');
  const activePartners = useGetPartnersByStatus('active');
  const suspendedPartners = useGetPartnersByStatus('suspended');
  const blacklistedPartners = useGetPartnersByStatus('blacklisted');
  const internalUsers = useGetInternalUsers();
  const customerServiceUsers = useGetCustomerServiceUsers();
  const activeClients = useGetActiveClients();
  const approveInternalUser = useApproveInternalUser();
  const rejectInternalUser = useRejectInternalUser();

  const viewerRole = currentUser?.role || '';

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

  const handleApproveInternal = async (userId: string) => {
    setApprovingUserId(userId);
    try {
      await approveInternalUser.mutateAsync(userId);
    } finally {
      setApprovingUserId(undefined);
    }
  };

  const handleRejectInternal = async (userId: string) => {
    setRejectingUserId(userId);
    try {
      await rejectInternalUser.mutateAsync(userId);
    } finally {
      setRejectingUserId(undefined);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
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
                    <div key={user.id} className="p-3 border rounded-md">
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

      <ActiveClientsCard
        clients={activeClients.data || []}
        isLoading={activeClients.isLoading}
        error={activeClients.error}
      />

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Partner Management</h3>

        <PartnerStatusSection
          title="Pending Partners"
          description="Partners awaiting approval"
          partners={pendingPartners.data || []}
          status="pending"
          isLoading={pendingPartners.isLoading}
          error={pendingPartners.error}
        />

        <PartnerStatusSection
          title="Active Partners"
          description="Currently active partners"
          partners={activePartners.data || []}
          status="active"
          isLoading={activePartners.isLoading}
          error={activePartners.error}
        />

        <PartnerStatusSection
          title="Suspended Partners"
          description="Temporarily suspended partners"
          partners={suspendedPartners.data || []}
          status="suspended"
          isLoading={suspendedPartners.isLoading}
          error={suspendedPartners.error}
        />

        <PartnerStatusSection
          title="Blacklisted Partners"
          description="Permanently blacklisted partners"
          partners={blacklistedPartners.data || []}
          status="blacklisted"
          isLoading={blacklistedPartners.isLoading}
          error={blacklistedPartners.error}
        />

        <InternalPendingRegistrationCard
          users={internalUsers.data || []}
          isLoading={internalUsers.isLoading}
          error={internalUsers.error}
          onApprove={handleApproveInternal}
          onReject={handleRejectInternal}
          approvingUserId={approvingUserId}
          rejectingUserId={rejectingUserId}
          viewerRole={viewerRole}
        />

        <UserRoleUsersCard
          title="Internal Users"
          description="Admin, Asistenmu, Supervisor, Management, and Finance users"
          users={internalUsers.data || []}
          isLoading={internalUsers.isLoading}
          error={internalUsers.error}
        />

        <UserRoleUsersCard
          title="Customer Service Users"
          description="Customer service team members"
          users={customerServiceUsers.data || []}
          isLoading={customerServiceUsers.isLoading}
          error={customerServiceUsers.error}
        />
      </div>
    </div>
  );
}
