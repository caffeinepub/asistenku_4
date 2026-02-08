import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Check, X } from 'lucide-react';
import TruncatedPrincipalCell from './TruncatedPrincipalCell';
import type { InternalUserDTO } from '@/backend';
import { toast } from 'sonner';

interface InternalPendingRegistrationCardProps {
  users: InternalUserDTO[];
  isLoading: boolean;
  error: Error | null;
  onApprove: (userId: string) => Promise<void>;
  onReject: (userId: string) => Promise<void>;
  approvingUserId?: string;
  rejectingUserId?: string;
}

export default function InternalPendingRegistrationCard({
  users,
  isLoading,
  error,
  onApprove,
  onReject,
  approvingUserId,
  rejectingUserId,
}: InternalPendingRegistrationCardProps) {
  const pendingUsers = users.filter(user => user.status === 'pending');

  const handleApprove = async (userId: string) => {
    try {
      await onApprove(userId);
      toast.success('Approved');
    } catch (error: any) {
      toast.error(error.message || 'Failed to approve user');
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await onReject(userId);
      toast.success('Rejected');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reject user');
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Internal Pending Registration</CardTitle>
          <CardDescription>Internal registrations awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Internal Pending Registration</CardTitle>
          <CardDescription>Internal registrations awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border border-destructive/50 rounded-md bg-destructive/10">
            <p className="text-sm text-destructive">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Internal Pending Registration</CardTitle>
        <CardDescription>Internal registrations awaiting approval</CardDescription>
      </CardHeader>
      <CardContent>
        {pendingUsers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No pending internal registrations.
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Internal ID</TableHead>
                  <TableHead>Principal ID</TableHead>
                  <TableHead>Requested Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingUsers.map((user) => {
                  const isApproving = approvingUserId === user.id;
                  const isRejecting = rejectingUserId === user.id;
                  const isProcessing = isApproving || isRejecting;

                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>
                        <TruncatedPrincipalCell principalId={user.principalId} />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          pending
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApprove(user.id)}
                            disabled={isProcessing}
                          >
                            {isApproving ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </>
                            )}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleReject(user.id)}
                            disabled={isProcessing}
                          >
                            {isRejecting ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
