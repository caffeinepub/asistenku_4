import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Wallet } from 'lucide-react';
import { useGetPartnerWallet } from '@/hooks/usePartnerWallet';

export default function PartnerWalletCard() {
  const { data: wallet, isLoading, error } = useGetPartnerWallet();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Dompet
          </CardTitle>
          <CardDescription>Saldo dan pendapatan Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Memuat data dompet...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Dompet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Gagal memuat data dompet.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const balance = wallet?.balance || 0;
  const totalEarnings = wallet?.totalEarnings || 0;
  const pendingPayouts = wallet?.pendingPayouts || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Dompet
        </CardTitle>
        <CardDescription>Saldo dan pendapatan Anda</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Saldo Tersedia</p>
            <p className="text-2xl font-bold">
              Rp {balance.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Pendapatan</p>
            <p className="text-2xl font-bold">
              Rp {totalEarnings.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">
              Rp {pendingPayouts.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {balance === 0 && totalEarnings === 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Saldo akan otomatis bertambah setelah tugas selesai dan disetujui.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
