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
  useGetPendingInternalUsers,
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
  const pendingInternalUsers = useGetPendingInternalUsers();
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

  // Convert UserProfile[] to InternalUserDTO[] for pending internal users
  const pendingInternalUsersDTO = (pendingInternalUsers.data || []).map((user) => ({
    id: user.id,
    name: user.internalData?.name || '',
    principalId: user.principalId,
    role: user.role,
    status: user.status,
  }));

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <UserSearchBar onSearch={handleSearch} />
        {hasSearched && (
          <div className="p-4 border rounded-lg">
            {searchResults.length === 0 ? (
              <p className="text-muted-foreground">No users found.</p>
            ) : (
              <div className="space-y-2">
                <p className="font-medium">Search Results ({searchResults.length})</p>
                <ul className="space-y-1">
                  {searchResults.map((user) => (
                    <li key={user.id} className="text-sm">
                      {user.id} - {user.role} - {user.principalId.slice(0, 10)}...
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <InternalPendingRegistrationCard
        users={pendingInternalUsersDTO}
        isLoading={pendingInternalUsers.isLoading}
        error={pendingInternalUsers.error}
        onApprove={handleApproveInternal}
        onReject={handleRejectInternal}
        approvingUserId={approvingUserId}
        rejectingUserId={rejectingUserId}
        viewerRole={viewerRole}
      />

      <PartnerStatusSection
        title="Pending Partners"
        description="Partners awaiting approval"
        partners={pendingPartners.data || []}
        isLoading={pendingPartners.isLoading}
        error={pendingPartners.error}
        status="pending"
      />

      <PartnerStatusSection
        title="Active Partners"
        description="Currently active partners"
        partners={activePartners.data || []}
        isLoading={activePartners.isLoading}
        error={activePartners.error}
        status="active"
      />

      <PartnerStatusSection
        title="Suspended Partners"
        description="Temporarily suspended partners"
        partners={suspendedPartners.data || []}
        isLoading={suspendedPartners.isLoading}
        error={suspendedPartners.error}
        status="suspended"
      />

      <PartnerStatusSection
        title="Blacklisted Partners"
        description="Permanently blacklisted partners"
        partners={blacklistedPartners.data || []}
        isLoading={blacklistedPartners.isLoading}
        error={blacklistedPartners.error}
        status="blacklisted"
      />

      <UserRoleUsersCard
        title="Internal Users"
        description="Admin, Asistenmu, Supervisor, Management, Finance, and Customer Service users"
        users={internalUsers.data || []}
        isLoading={internalUsers.isLoading}
        error={internalUsers.error}
      />

      <ActiveClientsCard
        clients={activeClients.data || []}
        isLoading={activeClients.isLoading}
        error={activeClients.error}
      />
    </div>
  );
}
