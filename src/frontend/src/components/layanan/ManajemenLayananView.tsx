import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CollapsibleCardSection from '@/components/superadmin/CollapsibleCardSection';
import BuatLayananForm from './BuatLayananForm';
import UserSearchBar, { SearchMode } from '@/components/superadmin/UserSearchBar';
import { useSearchServicesAndClients } from '@/hooks/useServiceManagement';
import { useGetAllServices } from '@/hooks/useQueries';
import { Badge } from '@/components/ui/badge';
import type { Service } from '@/backend';

export default function ManajemenLayananView() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('userId');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const { data: searchResults } = useSearchServicesAndClients(searchQuery, searchMode);
  const { data: allServices = [] } = useGetAllServices();

  const handleCreateSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleSearch = (query: string, mode: SearchMode) => {
    setSearchQuery(query);
    setSearchMode(mode);
    setSelectedClientId(null);
  };

  // Filter services based on search
  const getFilteredServices = (): Service[] => {
    if (!searchQuery || searchQuery.trim() === '') {
      return allServices;
    }

    // If we have search results, use those
    if (searchResults && searchResults.services.length > 0) {
      return searchResults.services;
    }

    // For name search, filter client-side
    if (searchMode === 'name' && searchResults && searchResults.users.length > 0) {
      const clientIds = searchResults.users.map(u => u.id);
      return allServices.filter(s => clientIds.includes(s.id));
    }

    return allServices;
  };

  const filteredServices = getFilteredServices();

  // Categorize services
  const activeServices = filteredServices.filter(s => 
    String(s.status).toLowerCase() === 'active'
  );

  const inactiveOrExpiredServices = filteredServices.filter(s => {
    const status = String(s.status).toLowerCase();
    return status === 'inactive' || status === 'expired';
  });

  const zeroQuantityServices = filteredServices.filter(s => 
    Number(s.serviceQuantity) === 0
  );

  const lowQuantityServices = filteredServices.filter(s => {
    const qty = Number(s.serviceQuantity);
    return qty > 0 && qty < 5;
  });

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

  const renderServiceList = (services: Service[]) => {
    if (services.length === 0) {
      return <p className="text-muted-foreground text-center py-4">No services found.</p>;
    }

    return (
      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.id} className="p-4 rounded-lg border bg-card space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium">{service.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-1">{service.description}</p>
                <p className="text-xs text-muted-foreground mt-1">ID: {service.id}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                {getStatusBadge(service.status)}
                <Badge variant="outline">Qty: {Number(service.serviceQuantity)}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
              <span>Created: {formatDate(service.createdAt)}</span>
              <span>Updated: {formatDate(service.updatedAt)}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Manajemen Layanan</h2>
      </div>

      {/* Search Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Search Clients & Services</CardTitle>
        </CardHeader>
        <CardContent>
          <UserSearchBar 
            onSearch={handleSearch}
            placeholder="Search by user ID, principal ID, or name..."
          />
          {searchQuery && searchResults && (
            <div className="mt-4 text-sm text-muted-foreground">
              Found {searchResults.users.length} client(s) and {searchResults.services.length} service(s)
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Service Form */}
      <Card>
        <CardHeader>
          <CardTitle>Buat Layanan</CardTitle>
        </CardHeader>
        <CardContent>
          <BuatLayananForm 
            onSuccess={handleCreateSuccess}
            prefilledClientId={selectedClientId}
          />
        </CardContent>
      </Card>

      {/* Service Lists - Categorized */}
      <div className="space-y-4">
        <CollapsibleCardSection
          title="Layanan Aktif"
          description={`${activeServices.length} active service(s)`}
          defaultExpanded={true}
        >
          {renderServiceList(activeServices)}
        </CollapsibleCardSection>

        <CollapsibleCardSection
          title="Layanan Non-aktif/Expired"
          description={`${inactiveOrExpiredServices.length} inactive or expired service(s)`}
          defaultExpanded={false}
        >
          {renderServiceList(inactiveOrExpiredServices)}
        </CollapsibleCardSection>

        <CollapsibleCardSection
          title="Layanan dengan Jumlah Habis (0)"
          description={`${zeroQuantityServices.length} service(s) with zero quantity`}
          defaultExpanded={false}
        >
          {renderServiceList(zeroQuantityServices)}
        </CollapsibleCardSection>

        <CollapsibleCardSection
          title="Layanan dengan Jumlah Kurang dari 5"
          description={`${lowQuantityServices.length} service(s) with low quantity`}
          defaultExpanded={false}
        >
          {renderServiceList(lowQuantityServices)}
        </CollapsibleCardSection>
      </div>
    </div>
  );
}
