import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, AlertCircle } from 'lucide-react';
import type { InternalUserDTO, UserStatus } from '@/backend';
import CollapsibleCardSection from './CollapsibleCardSection';

interface UserRoleUsersCardProps {
  title: string;
  description: string;
  users: InternalUserDTO[];
  isLoading: boolean;
  error?: Error | null;
}

export default function UserRoleUsersCard({ title, description, users, isLoading, error }: UserRoleUsersCardProps) {
  const getUserName = (user: InternalUserDTO) => {
    return user.name || 'N/A';
  };

  const getStatusBadgeColor = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'suspended':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'blacklisted':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <CollapsibleCardSection title={`${title} (${users.length})`} description={description}>
      {error && (
        <div className="flex items-center gap-2 p-4 mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>Failed to load users: {error.message}</p>
        </div>
      )}
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : users.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No users found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Principal ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-mono text-sm">{user.id}</TableCell>
                <TableCell className="font-mono text-xs">{user.principalId.slice(0, 12)}...</TableCell>
                <TableCell>{getUserName(user)}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusBadgeColor(user.status)}`}>
                    {user.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </CollapsibleCardSection>
  );
}
