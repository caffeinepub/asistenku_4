import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { useCreateLayananku } from '@/hooks/useLayananku';
import { useGetAsistenmuCandidates, useAssignAsistenmuToLayananku } from '@/hooks/useAsistenmuAssignment';
import { LayananKind } from '@/backend';
import { toast } from 'sonner';

interface BuatLayananFormProps {
  onSuccess: () => void;
}

export default function BuatLayananForm({ onSuccess }: BuatLayananFormProps) {
  const [clientId, setClientId] = useState('');
  const [jenisLayanan, setJenisLayanan] = useState<LayananKind | ''>('');
  const [asistenmuPrincipalId, setAsistenmuPrincipalId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sharePrincipals, setSharePrincipals] = useState<string[]>(['']);
  const [hargaPerLayanan, setHargaPerLayanan] = useState('');

  const createMutation = useCreateLayananku();
  const assignMutation = useAssignAsistenmuToLayananku();
  const { data: asistenmuCandidates = [], isLoading: loadingCandidates } = useGetAsistenmuCandidates();

  const handleAddShare = () => {
    if (sharePrincipals.length < 6) {
      setSharePrincipals([...sharePrincipals, '']);
    }
  };

  const handleRemoveShare = (index: number) => {
    if (sharePrincipals.length > 1) {
      setSharePrincipals(sharePrincipals.filter((_, i) => i !== index));
    }
  };

  const handleShareChange = (index: number, value: string) => {
    const newShares = [...sharePrincipals];
    newShares[index] = value;
    setSharePrincipals(newShares);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientId || !jenisLayanan || !asistenmuPrincipalId || !startDate || !endDate) {
      return;
    }

    const startTimestamp = BigInt(new Date(startDate).getTime());
    const endTimestamp = BigInt(new Date(endDate).getTime());
    const filteredShares = sharePrincipals.filter((p) => p.trim() !== '');
    const harga = hargaPerLayanan ? BigInt(hargaPerLayanan) : BigInt(0);

    try {
      // Step 1: Create the layananku
      const layanankuId = await createMutation.mutateAsync({
        clientId,
        kind: jenisLayanan as LayananKind,
        startAt: startTimestamp,
        endAt: endTimestamp,
        sharePrincipals: filteredShares,
        hargaPerLayanan: harga,
      });

      // Step 2: Assign asistenmu
      try {
        await assignMutation.mutateAsync({
          layanankuId,
          asistenmuPrincipalId,
        });
      } catch (assignError) {
        // Non-blocking warning if assignment fails
        toast.warning('Created, but failed to assign Asistenmu. Please edit and retry.');
      }

      // Reset form
      setClientId('');
      setJenisLayanan('');
      setAsistenmuPrincipalId('');
      setStartDate('');
      setEndDate('');
      setSharePrincipals(['']);
      setHargaPerLayanan('');

      onSuccess();
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="clientId">Client ID</Label>
        <Input
          id="clientId"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          placeholder="CA-000001"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jenisLayanan">Jenis Layanan</Label>
        <Select value={jenisLayanan} onValueChange={(value) => setJenisLayanan(value as LayananKind)}>
          <SelectTrigger id="jenisLayanan">
            <SelectValue placeholder="Pilih jenis layanan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TENANG">TENANG</SelectItem>
            <SelectItem value="RAPI">RAPI</SelectItem>
            <SelectItem value="FOKUS">FOKUS</SelectItem>
            <SelectItem value="JAGA">JAGA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="asistenmu">Asistenmu</Label>
        <Select value={asistenmuPrincipalId} onValueChange={setAsistenmuPrincipalId}>
          <SelectTrigger id="asistenmu">
            <SelectValue placeholder="Pilih Asistenmu" />
          </SelectTrigger>
          <SelectContent>
            {loadingCandidates ? (
              <SelectItem value="loading" disabled>
                Loading...
              </SelectItem>
            ) : asistenmuCandidates.length === 0 ? (
              <SelectItem value="empty" disabled>
                No Asistenmu available
              </SelectItem>
            ) : (
              asistenmuCandidates.map((candidate) => (
                <SelectItem key={candidate.principalId} value={candidate.principalId}>
                  {candidate.name || 'Unnamed'} ({candidate.principalId.slice(0, 8)}...)
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Masa Aktif - Mulai</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Masa Aktif - Selesai</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hargaPerLayanan">Harga per layanan (internal, tidak tampil di client)</Label>
        <Input
          id="hargaPerLayanan"
          type="number"
          value={hargaPerLayanan}
          onChange={(e) => setHargaPerLayanan(e.target.value)}
          placeholder="0"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Share Layanan (principalId)</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddShare}
            disabled={sharePrincipals.length >= 6}
          >
            <Plus className="h-4 w-4 mr-1" />
            Tambah
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Max 6 principal termasuk pemilik</p>
        <div className="space-y-2">
          {sharePrincipals.map((principal, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={principal}
                onChange={(e) => handleShareChange(index, e.target.value)}
                placeholder="Principal ID"
              />
              {sharePrincipals.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveShare(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={createMutation.isPending || assignMutation.isPending}
      >
        {createMutation.isPending || assignMutation.isPending ? 'Creating...' : 'Buat Layanan'}
      </Button>
    </form>
  );
}
