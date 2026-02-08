import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUser, useClaimSuperadmin } from '@/hooks/useQueries';
import { useActor } from '@/hooks/useActor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import BrandLogo from '@/components/BrandLogo';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import InternalGateGuard from '@/components/InternalGateGuard';

const INTERNAL_ROLES = [
    { id: 'ADMIN', label: 'Admin', route: '/admin/dashboard' },
    { id: 'ASISTENMU', label: 'Asistenmu', route: '/asistenmu/dashboard' },
    { id: 'SUPERVISOR', label: 'Supervisor', route: '/supervisor/dashboard' },
    { id: 'MANAGEMENT', label: 'Management', route: '/management/dashboard' },
    { id: 'FINANCE', label: 'Finance', route: '/finance/dashboard' },
    { id: 'CUSTOMER_SERVICE', label: 'Customer Service', route: '/customer-service' }
];

// Helper to normalize role for comparison
function normalizeRole(role: string | undefined | null): string {
    if (!role) return '';
    return role.trim().toUpperCase();
}

function InternalLoginContent() {
    const navigate = useNavigate();
    const { identity, login, loginStatus, clear } = useInternetIdentity();
    const { actor, isFetching: actorFetching } = useActor();
    const { refetch: getCallerUser } = useGetCallerUser();
    const claimSuperadmin = useClaimSuperadmin();
    const [workspaceLoading, setWorkspaceLoading] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showSuperadminClaim, setShowSuperadminClaim] = useState(true);

    const isLoggingIn = loginStatus === 'logging-in';
    const isAuthenticated = !!identity;
    const isActorReady = !!actor && !actorFetching;
    const canInteract = isAuthenticated && isActorReady;

    const handleGlobalLogin = async () => {
        setErrorMessage(null);
        try {
            await login();
        } catch (error: any) {
            console.error('Login error:', error);
            setErrorMessage('Login failed. Please try again.');
        }
    };

    const handleWorkspaceClick = async (roleId: string) => {
        if (!canInteract) {
            setErrorMessage('Backend connection not ready. Please try again.');
            return;
        }

        setWorkspaceLoading(roleId);
        setErrorMessage(null);

        try {
            const { data: user } = await getCallerUser();

            if (!user) {
                navigate({ to: '/internal/role-mismatch' });
                return;
            }

            // Normalize roles for comparison
            const userRoleNormalized = normalizeRole(user.role);
            const requiredRoleNormalized = normalizeRole(roleId);

            if (userRoleNormalized !== requiredRoleNormalized) {
                navigate({ to: '/internal/role-mismatch' });
                return;
            }

            const roleRoute = INTERNAL_ROLES.find((r) => r.id === roleId)?.route;
            if (roleRoute) {
                navigate({ to: roleRoute as any });
            }
        } catch (err: any) {
            console.error('Workspace access error:', err);
            if (err.message?.includes('Actor not available')) {
                setErrorMessage('Backend connection not ready. Please try again.');
            } else {
                navigate({ to: '/internal/role-mismatch' });
            }
        } finally {
            setWorkspaceLoading(null);
        }
    };

    const handleSuperadminClaim = async () => {
        if (!canInteract) {
            setErrorMessage('Backend connection not ready. Please try again.');
            return;
        }

        setErrorMessage(null);

        try {
            const result = await claimSuperadmin.mutateAsync();

            if (!result) {
                setErrorMessage('SUPERADMIN has already been claimed by another user.');
                setShowSuperadminClaim(false);
                return;
            }

            toast.success('SUPERADMIN claimed successfully!');
            navigate({ to: '/superadmin/dashboard' });
        } catch (err: any) {
            console.error('Superadmin claim error:', err);

            if (err.message?.includes('Actor not available')) {
                setErrorMessage('Backend connection not ready. Please try again.');
            } else if (err.message?.includes('already been claimed') || err.message?.includes('already claimed')) {
                setErrorMessage('SUPERADMIN has already been claimed by another user.');
                setShowSuperadminClaim(false);
            } else {
                setErrorMessage('Failed to claim SUPERADMIN. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-8">
                    <BrandLogo variant="horizontal" className="h-10 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold">Internal Login</h1>
                    <p className="text-muted-foreground mt-2">Select your workspace</p>
                </div>

                <div className="flex justify-center mb-8">
                    <Button
                        size="lg"
                        onClick={isAuthenticated ? clear : handleGlobalLogin}
                        disabled={isLoggingIn}
                        className="min-w-[240px]"
                    >
                        {isLoggingIn
                            ? 'Logging in...'
                            : isAuthenticated
                              ? 'Logout'
                              : 'Login with Internet Identity'}
                    </Button>
                </div>

                {isAuthenticated && !isActorReady && (
                    <Alert className="mb-6 max-w-2xl mx-auto">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>Connecting to backend... Please wait.</AlertDescription>
                    </Alert>
                )}

                {errorMessage && (
                    <Alert variant="destructive" className="mb-6 max-w-2xl mx-auto">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}

                <div className="grid md:grid-cols-3 gap-6">
                    {showSuperadminClaim && isAuthenticated && isActorReady && (
                        <Card className="border-primary">
                            <CardHeader>
                                <CardTitle>Superadmin</CardTitle>
                                <CardDescription>First-time claim only</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    className="w-full"
                                    onClick={handleSuperadminClaim}
                                    disabled={!canInteract || claimSuperadmin.isPending}
                                >
                                    {claimSuperadmin.isPending ? 'Claiming...' : 'Claim Superadmin'}
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {INTERNAL_ROLES.map((role) => (
                        <Card key={role.id}>
                            <CardHeader>
                                <CardTitle>{role.label}</CardTitle>
                                <CardDescription>Access {role.label} workspace</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    className="w-full"
                                    variant="outline"
                                    onClick={() => handleWorkspaceClick(role.id)}
                                    disabled={!canInteract || workspaceLoading === role.id}
                                >
                                    {workspaceLoading === role.id ? 'Loading...' : 'My Workspace'}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function InternalLoginPage() {
    return (
        <InternalGateGuard>
            <InternalLoginContent />
        </InternalGateGuard>
    );
}
