import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import CollapsibleCardSection from '../superadmin/CollapsibleCardSection';
import type { UserProfile } from '@/backend';

interface ReadOnlyPartnerStatusSectionProps {
  title: string;
  description: string;
  partners: UserProfile[];
  status: 'pending' | 'active' | 'suspended' | 'blacklisted';
  isLoading: boolean;
  error: Error | null;
  onUserClick: (user: UserProfile) => void;
}

export default function ReadOnlyPartnerStatusSection({
  title,
  description,
  partners,
  status,
  isLoading,
  error,
  onUserClick
}: ReadOnlyPartnerStatusSectionProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <CollapsibleCardSection title={`${title} (${partners.length})`} defaultExpanded={false}>
      {partners.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No {status} partners</p>
      ) : (
        <div className="space-y-2">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
              onClick={() => onUserClick(partner)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{partner.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {partner.partnerData?.name || 'No name'}
                  </p>
                </div>
                <Badge variant="outline">{status}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </CollapsibleCardSection>
  );
}
