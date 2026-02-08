import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetLayanankuForClient, ExtendedLayanankuRecord } from '@/hooks/useLayananku';
import { useGetCallerUser } from '@/hooks/useQueries';

export default function ClientLayanankuTab() {
  const { data: user } = useGetCallerUser();
  const clientId = user?.id || null;
  const { data: layananList = [], isLoading } = useGetLayanankuForClient(clientId);

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp)).toLocaleDateString('id-ID');
  };

  const getStatusBadge = (status: any) => {
    const statusStr = String(status).toLowerCase();
    if (statusStr === 'active') return <Badge variant="default">Active</Badge>;
    if (statusStr === 'inactive') return <Badge variant="secondary">Inactive</Badge>;
    if (statusStr === 'expired') return <Badge variant="destructive">Expired</Badge>;
    return <Badge variant="outline">Unknown</Badge>;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (layananList.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Layanan Saya</CardTitle>
          <CardDescription>Daftar layanan yang aktif untuk Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Anda belum memiliki layanan aktif. Silakan hubungi admin untuk mengaktifkan layanan.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {layananList.map((layanan) => (
        <Card key={layanan.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{layanan.kind}</CardTitle>
                <CardDescription>ID: {layanan.id}</CardDescription>
              </div>
              {getStatusBadge(layanan.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Asistenmu</p>
                <p className="text-sm">{layanan.asistenmuName || '—'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Masa Aktif</p>
                <p className="text-sm">
                  {formatDate(layanan.startAt)} – {formatDate(layanan.endAt)}
                </p>
              </div>
            </div>
            {layanan.sharePrincipals.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Shared with ({layanan.sharePrincipals.length})
                </p>
                <div className="space-y-1">
                  {layanan.sharePrincipals.map((principal, index) => (
                    <p key={index} className="font-mono text-xs text-muted-foreground break-all">
                      {principal}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
