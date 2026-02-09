import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import CopyRow from '@/components/CopyRow';
import { useGetCallerUser, useUpdateCallerProfile } from '@/hooks/useQueries';
import { toast } from 'sonner';

export default function MyProfileCard() {
  const { data: profile, isLoading, error } = useGetCallerUser();
  const updateProfile = useUpdateCallerProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleEditClick = () => {
    if (profile?.internalData) {
      setName(profile.internalData.name);
      setEmail(profile.internalData.email);
      setWhatsapp(profile.internalData.whatsapp);
    }
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setName('');
    setEmail('');
    setWhatsapp('');
  };

  const handleSave = async () => {
    if (!profile) return;

    try {
      const updatedProfile = {
        ...profile,
        internalData: {
          name,
          email,
          whatsapp,
        },
      };

      await updateProfile.mutateAsync(updatedProfile);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (err: any) {
      console.error('Profile update error:', err);
      toast.error(err.message || 'Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Failed to load profile</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const internalData = profile.internalData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CopyRow label="User ID" value={profile.id} />
        <CopyRow label="Principal ID" value={profile.principalId} />

        <div className="space-y-2">
          <Label>Role</Label>
          <Input value={profile.role} disabled />
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Input value={String(profile.status).replace('#', '')} disabled />
        </div>

        {internalData && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={isEditing ? name : internalData.name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={isEditing ? email : internalData.email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={isEditing ? whatsapp : internalData.whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </>
        )}

        <div className="flex gap-3 pt-4">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancelEdit} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={updateProfile.isPending || !name || !email || !whatsapp}
                className="flex-1"
              >
                {updateProfile.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </>
          ) : (
            <Button onClick={handleEditClick} className="w-full">
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
