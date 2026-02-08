import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserSearchBar from '../superadmin/UserSearchBar';
import { useGetAllServices } from '@/hooks/useQueries';
import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';

export default function CustomerServiceServiceManagementView() {
  const { data: allServices = [], isLoading } = useGetAllServices();
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string, mode: 'userId' | 'principalId' | 'name') => {
    setSearchQuery(query);
    setHasSearched(true);
  };

  const filteredServices = searchQuery.trim()
    ? allServices.filter(s => 
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allServices;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Service Management (Read-Only)</h2>
        <p className="text-muted-foreground">View services and client information</p>
      </div>

      <UserSearchBar onSearch={handleSearch} />

      {isLoading ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">Loading services...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Services ({filteredServices.length})</CardTitle>
              <CardDescription>Read-only view of all services</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredServices.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  {hasSearched ? 'No services found' : 'No services available'}
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredServices.map((service) => (
                    <div key={service.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{service.title}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{service.id}</p>
                          <p className="text-sm">{service.description}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge variant={service.available ? 'default' : 'secondary'}>
                            {service.available ? 'Available' : 'Unavailable'}
                          </Badge>
                          <Badge variant="outline">{service.status}</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{service.category}</span>
                        <span className="text-muted-foreground">Quantity:</span>
                        <span>{service.serviceQuantity.toString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
