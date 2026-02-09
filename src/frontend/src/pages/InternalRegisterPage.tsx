import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useRegisterInternalUser, useGetCallerUser, useValidateRoleName } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import InternalGateGuard from '@/components/InternalGateGuard';
import { REGISTRATION_ROLES } from '@/lib/internalRoles';

function InternalRegisterContent() {
    const navigate = useNavigate();
    const { identity, login, loginStatus } = useInternetIdentity();
    const registerInternal = useRegisterInternalUser();
    const validateRole = useValidateRoleName();
    const { refetch: getCallerUser } = useGetCallerUser();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [registeredRole, setRegisteredRole] = useState<string | null>(null);

    const handleRoleSelect = async (role: string) => {
        setError(null);

        if (!identity) {
            login();
            return;
        }

        try {
            // Pre-validate role with backend
            const isValid = await validateRole.mutateAsync(role);
            if (!isValid) {
                setError(`Role "${role}" is not recognized by the backend. Please contact support.`);
                return;
            }

            // Register using registerInternalUser for all internal roles including CUSTOMER_SERVICE
            await registerInternal.mutateAsync({
                role: role,
                name: '',
                email: '',
                whatsapp: ''
            });
            
            setRegisteredRole(role);
            setSuccess(true);
        } catch (err: any) {
            console.error('Registration error:', err);
            if (err.message?.includes('already exists') || err.message?.includes('already has a profile')) {
                setError('You already have an account. Please login instead.');
            } else if (err.message?.includes('Invalid internal role')) {
                setError('This role is not available for registration. Please contact support.');
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    const handleGoToWorkspace = async () => {
        if (!registeredRole) return;

        try {
            const { data: user } = await getCallerUser();

            if (!user) {
                navigate({ to: '/internal/role-mismatch' });
                return;
            }

            const userRoleNormalized = user.role.trim().toUpperCase();
            const expectedRoleNormalized = registeredRole.trim().toUpperCase();

            if (userRoleNormalized !== expectedRoleNormalized) {
                navigate({ to: '/internal/role-mismatch' });
                return;
            }

            // Check if user status is ACTIVE before allowing workspace access
            const statusStr = String(user.status).toLowerCase().replace('#', '');
            
            // Route to correct dashboard
            if (userRoleNormalized === 'CUSTOMER_SERVICE') {
                if (statusStr !== 'active') {
                    setError('Your account is pending approval. You cannot access the workspace yet.');
                    return;
                }
                navigate({ to: '/customer-service' });
            } else if (userRoleNormalized === 'ASISTENMU') {
                navigate({ to: '/asistenmu/dashboard' });
            } else if (userRoleNormalized === 'SUPERVISOR') {
                navigate({ to: '/supervisor/dashboard' });
            } else if (userRoleNormalized === 'MANAGEMENT') {
                navigate({ to: '/management/dashboard' });
            } else if (userRoleNormalized === 'FINANCE') {
                navigate({ to: '/finance/dashboard' });
            } else {
                navigate({ to: '/internal/role-mismatch' });
            }
        } catch (err: any) {
            console.error('Workspace navigation error:', err);
            navigate({ to: '/internal/role-mismatch' });
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <BrandLogo variant="horizontal" className="h-10 mx-auto mb-4" />
                        <CardTitle>Registration Successful!</CardTitle>
                        <CardDescription>Your account has been created</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert>
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertDescription>
                                Your registration is pending approval. You can now access your workspace.
                            </AlertDescription>
                        </Alert>
                        <Button onClick={handleGoToWorkspace} className="w-full" size="lg">
                            My Workspace
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-8">
                    <BrandLogo variant="horizontal" className="h-10 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold">Internal Registration</h1>
                    <p className="text-muted-foreground mt-2">Select your role to register</p>
                </div>

                {!identity && (
                    <Alert className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            You need to login with Internet Identity first. Click on any role card to start.
                        </AlertDescription>
                    </Alert>
                )}

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    {REGISTRATION_ROLES.map((role) => (
                        <Card key={role.id} className="hover:border-primary transition-colors">
                            <CardHeader>
                                <CardTitle>{role.label}</CardTitle>
                                <CardDescription>{role.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    className="w-full"
                                    onClick={() => handleRoleSelect(role.id)}
                                    disabled={registerInternal.isPending || loginStatus === 'logging-in' || validateRole.isPending}
                                >
                                    {(registerInternal.isPending || validateRole.isPending)
                                        ? 'Registering...'
                                        : loginStatus === 'logging-in'
                                          ? 'Logging in...'
                                          : `Register as ${role.label}`}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
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
