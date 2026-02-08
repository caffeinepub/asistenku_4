import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Eye } from 'lucide-react';
import TruncatedPrincipalCell from './TruncatedPrincipalCell';
import ActiveClientDetailDialog from './ActiveClientDetailDialog';
import { useState } from 'react';
import type { UserProfile } from '@/backend';

interface ActiveClientsCardProps {
  clients: UserProfile[];
  isLoading: boolean;
  error: Error | null;
}

export default function ActiveClientsCard({ clients, isLoading, error }: ActiveClientsCardProps) {
  const [selectedClient, setSelectedClient] = useState<UserProfile | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDetailClick = (client: UserProfile) => {
    setSelectedClient(client);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Clients</CardTitle>
          <CardDescription>List of clients that are already active</CardDescription>
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
          <CardTitle>Active Clients</CardTitle>
          <CardDescription>List of clients that are already active</CardDescription>
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
    <>
      <Card>
        <CardHeader>
          <CardTitle>Active Clients</CardTitle>
          <CardDescription>List of clients that are already active</CardDescription>
        </CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No active clients.
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client ID</TableHead>
                    <TableHead>Principal ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.id}</TableCell>
                      <TableCell>
                        <TruncatedPrincipalCell principalId={client.principalId} />
                      </TableCell>
                      <TableCell>{client.clientData?.company || '-'}</TableCell>
                      <TableCell>
                        <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                          active
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDetailClick(client)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedClient && (
        <ActiveClientDetailDialog
          client={selectedClient}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </>
  );
}
