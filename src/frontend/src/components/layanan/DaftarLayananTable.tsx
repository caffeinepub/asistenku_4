import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetMyLayananku, useDeactivateLayananku } from '@/hooks/useLayananku';
import LayananDetailModal from './LayananDetailModal';
import LayananUpdateModal from './LayananUpdateModal';
import EditAsistenmuModal from './EditAsistenmuModal';
import type { LayanankuPublic } from '@/backend';

interface DaftarLayananTableProps {
  refreshTrigger: number;
}

interface ExtendedLayananku extends LayanankuPublic {
  asistenmuPrincipalId?: string;
  asistenmuName?: string;
}

export default function DaftarLayananTable({ refreshTrigger }: DaftarLayananTableProps) {
  const { data: layananList = [], refetch } = useGetMyLayananku();
  const deactivateMutation = useDeactivateLayananku();
  const [selectedLayanan, setSelectedLayanan] = useState<LayanankuPublic | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [editAsistenmuModalOpen, setEditAsistenmuModalOpen] = useState(false);
  const [selectedLayananForAsistenmu, setSelectedLayananForAsistenmu] = useState<{
    id: string;
    asistenmuPrincipalId?: string;
  } | null>(null);

  useEffect(() => {
    if (refreshTrigger > 0) {
      refetch();
    }
  }, [refreshTrigger, refetch]);

  const handleDeactivate = async (id: string) => {
    try {
      await deactivateMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleDetailClick = (layanan: LayanankuPublic) => {
    setSelectedLayanan(layanan);
    setDetailModalOpen(true);
  };

  const handleUpdateClick = (layanan: LayanankuPublic) => {
    setSelectedLayanan(layanan);
    setUpdateModalOpen(true);
  };

  const handleEditAsistenmuClick = (layanan: ExtendedLayananku) => {
    setSelectedLayananForAsistenmu({
      id: layanan.id,
      asistenmuPrincipalId: layanan.asistenmuPrincipalId,
    });
    setEditAsistenmuModalOpen(true);
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp)).toLocaleDateString('id-ID');
  };

  const getStatusLabel = (status: any) => {
    const statusStr = String(status).toLowerCase();
    if (statusStr === 'active') return 'Active';
    if (statusStr === 'inactive') return 'Inactive';
    if (statusStr === 'expired') return 'Expired';
    return 'Unknown';
  };

  if (layananList.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Belum ada layanan dibuat.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Layanan</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Asistenmu</TableHead>
              <TableHead>Masa aktif</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Share</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {layananList.map((layanan) => {
              const extended = layanan as ExtendedLayananku;
              return (
                <TableRow key={layanan.id}>
                  <TableCell className="font-mono text-xs">{layanan.id}</TableCell>
                  <TableCell>{layanan.kind}</TableCell>
                  <TableCell className="text-sm">
                    {extended.asistenmuName || '—'}
                  </TableCell>
                  <TableCell className="text-xs">
                    {formatDate(layanan.startAt)} – {formatDate(layanan.endAt)}
                  </TableCell>
                  <TableCell>{getStatusLabel(layanan.status)}</TableCell>
                  <TableCell>{layanan.sharePrincipals.length}/6</TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      <Button variant="outline" size="sm" onClick={() => handleDetailClick(layanan)}>
                        Detail
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleUpdateClick(layanan)}>
                        Update
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditAsistenmuClick(extended)}
                      >
                        Edit Asistenmu
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeactivate(layanan.id)}
                        disabled={deactivateMutation.isPending}
                      >
                        Deactivate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {selectedLayanan && (
        <>
          <LayananDetailModal
            layanan={selectedLayanan}
            open={detailModalOpen}
            onOpenChange={setDetailModalOpen}
          />
          <LayananUpdateModal
            layanan={selectedLayanan}
            open={updateModalOpen}
            onOpenChange={setUpdateModalOpen}
            onSuccess={() => refetch()}
          />
        </>
      )}

      {selectedLayananForAsistenmu && (
        <EditAsistenmuModal
          layanankuId={selectedLayananForAsistenmu.id}
          currentAsistenmuPrincipalId={selectedLayananForAsistenmu.asistenmuPrincipalId}
          open={editAsistenmuModalOpen}
          onOpenChange={setEditAsistenmuModalOpen}
          onSuccess={() => refetch()}
        />
      )}
    </>
  );
}
