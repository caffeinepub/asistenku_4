import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useRegisterInternalUser, useGetCallerUser } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import InternalGateGuard from '@/components/InternalGateGuard';
import CopyRow from '@/components/CopyRow';
import { toast } from 'sonner';
import { REGISTRATION_ROLES, getRoleRoute } from '@/lib/internalRoles';

function InternalRegisterContent() {
  const navigate = useNavigate();
  const { identity, login, loginStatus } = useInternetIdentity();
  const registerInternal = useRegisterInternalUser();
  const { refetch: getCallerUser } = useGetCallerUser();
  
  const [role, setRole] = useState<string>('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState<string>('');

  const principalId = identity?.getPrincipal().toString() || '';
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    setError(null);
    try {
      await login();
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isAuthenticated) {
      setError('You must be logged in with Internet Identity to register.');
      return;
    }

    if (!role || !name || !whatsapp || !email) {
      setError('All fields are required.');
      return;
    }

    try {
      const generatedUserId = await registerInternal.mutateAsync({
        role,
        name,
        email,
        whatsapp,
      });

      setUserId(generatedUserId);
      setSuccess(true);
      toast.success('Registration submitted successfully!');
    } catch (err: any) {
      console.error('Registration error:', err);
      const errorMsg = err.message || '';
      
      if (errorMsg.includes('User already has a profile') || errorMsg.includes('already has a profile')) {
        setError('This account is already registered. Please log in.');
      } else if (errorMsg.includes('Invalid role') || errorMsg.includes('Invalid internal role')) {
        setError('Role is not available.');
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  const handleMyWorkspace = async () => {
    if (!isAuthenticated) {
      setError('You must be logged in.');
      return;
    }

    try {
      const { data: profile } = await getCallerUser();
      
      if (!profile) {
        setError('Unable to fetch your profile. Please try again.');
        return;
      }

      const statusStr = String(profile.status).toLowerCase().replace('#', '');
      
      if (statusStr === 'pending') {
        setError('Your account is still pending approval. Please wait for admin activation.');
        return;
      }

      if (statusStr === 'active') {
        const route = getRoleRoute(profile.role);
        if (route) {
          navigate({ to: route as any });
        } else {
          setError('Unable to determine workspace route for your role.');
        }
      } else {
        setError('Your account status does not allow workspace access.');
      }
    } catch (err: any) {
      console.error('Workspace navigation error:', err);
      setError('Failed to access workspace. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <BrandLogo variant="horizontal" className="h-10 mx-auto mb-4" />
            <CardTitle>Registration Successful!</CardTitle>
            <CardDescription>Your internal registration has been submitted</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Pending — waiting for admin approval
              </AlertDescription>
            </Alert>

            <div className="space-y-3 pt-4">
              <CopyRow label="User ID" value={userId} />
              <CopyRow label="Principal ID" value={principalId} />
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={role} disabled />
              </div>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={name} disabled />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input value={whatsapp} disabled />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={email} disabled />
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="pt-4">
              <Button onClick={handleMyWorkspace} className="w-full">
                My Workspace
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <BrandLogo variant="horizontal" className="h-10 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Internal Registration</h1>
          <p className="text-muted-foreground mt-2">Register for internal access</p>
        </div>

        {!isAuthenticated && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need to login with Internet Identity first.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Internal Registration</CardTitle>
            <CardDescription>Complete the form to register</CardDescription>
          </CardHeader>
          <CardContent>
            {!isAuthenticated ? (
              <div className="text-center py-8">
                <Button onClick={handleLogin} disabled={isLoggingIn} size="lg">
                  {isLoggingIn ? 'Logging in...' : 'Login with Internet Identity'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGISTRATION_ROLES.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <Input
                    id="whatsapp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Enter your WhatsApp number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <CopyRow label="User ID" value="(will be generated)" />
                <CopyRow label="Principal ID" value={principalId} />

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={registerInternal.isPending || !role || !name || !whatsapp || !email}
                    className="w-full"
                  >
                    {registerInternal.isPending ? 'Submitting...' : 'Submit Registration'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function InternalRegisterPage() {
  return (
    <InternalGateGuard>
      <InternalRegisterContent />
    </InternalGateGuard>
  );
}
