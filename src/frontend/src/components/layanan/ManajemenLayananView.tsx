import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BuatLayananForm from './BuatLayananForm';
import DaftarLayananTable from './DaftarLayananTable';

export default function ManajemenLayananView() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Manajemen Layanan</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Buat Layanan</CardTitle>
          </CardHeader>
          <CardContent>
            <BuatLayananForm onSuccess={handleCreateSuccess} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daftar Layanan</CardTitle>
          </CardHeader>
          <CardContent>
            <DaftarLayananTable refreshTrigger={refreshTrigger} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
