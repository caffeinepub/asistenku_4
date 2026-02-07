import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetLayanankuForClient } from '@/hooks/useLayananku';
import { useGetCallerUserProfile } from '@/hooks/useQueries';
import type { ExtendedLayanankuRecord } from '@/backend';

export default function ClientLayanankuTab() {
  const { data: userProfile } = useGetCallerUserProfile();
  const clientId = userProfile?.id || null;
  const { data: layananList = [], isLoading } = useGetLayanankuForClient(clientId);

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp)).toLocaleDateString('id-ID');
  };

  const getStatusBadge = (status: any) => {
    const statusStr = String(status).toLowerCase();
    if (statusStr === 'active') {
      return <Badge variant="default">Active</Badge>;
    }
    if (statusStr === 'inactive') {
      return <Badge variant="secondary">Inactive</Badge>;
    }
    if (statusStr === 'expired') {
      return <Badge variant="destructive">Expired</Badge>;
    }
    return <Badge variant="outline">Unknown</Badge>;
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (layananList.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Layananku</CardTitle>
          <CardDescription>Daftar layanan yang aktif</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Belum ada layanan aktif.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Layananku</h2>
        <p className="text-sm text-muted-foreground">Daftar layanan yang aktif</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {layananList.map((layanan: ExtendedLayanankuRecord) => (
          <Card key={layanan.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{layanan.kind}</CardTitle>
                  <CardDescription className="font-mono text-xs mt-1">{layanan.id}</CardDescription>
                </div>
                {getStatusBadge(layanan.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Asistenmu</p>
                <p className="text-sm font-medium">{layanan.asistenmuName || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Masa Aktif</p>
                <p className="text-sm">
                  {formatDate(layanan.startAt)} – {formatDate(layanan.endAt)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Share Access</p>
                <p className="text-sm">{layanan.sharePrincipals.length} principal(s)</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
