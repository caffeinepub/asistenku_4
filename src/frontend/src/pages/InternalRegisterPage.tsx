import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useRegisterInternalUser } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import InternalGateGuard from '@/components/InternalGateGuard';

const INTERNAL_ROLES = [
    { id: 'FINANCE', label: 'Finance', description: 'Financial management and reporting' },
    { id: 'SUPERVISOR', label: 'Supervisor', description: 'Team supervision and coordination' },
    { id: 'MANAGEMENT', label: 'Management', description: 'Strategic management and planning' },
    { id: 'ASISTENMU', label: 'Asistenmu', description: 'Direct client support and assistance' }
];

function InternalRegisterContent() {
    const navigate = useNavigate();
    const { identity, login, loginStatus } = useInternetIdentity();
    const registerInternal = useRegisterInternalUser();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleRoleSelect = async (role: string) => {
        setError(null);

        if (!identity) {
            login();
            return;
        }

        try {
            // Pass the required data structure matching the backend signature
            await registerInternal.mutateAsync({
                role: role,
                name: '',
                email: '',
                whatsapp: ''
            });
            setSuccess(true);
            setTimeout(() => {
                navigate({ to: '/internal/login' });
            }, 2000);
        } catch (err: any) {
            console.error('Registration error:', err);
            if (err.message?.includes('already exists') || err.message?.includes('already has a profile')) {
                setError('You already have an account. Please login instead.');
            } else {
                setError('Registration failed. Please try again.');
            }
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
                    <CardContent>
                        <Alert>
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertDescription>Redirecting to login page...</AlertDescription>
                        </Alert>
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
                    {INTERNAL_ROLES.map((role) => (
                        <Card key={role.id} className="hover:border-primary transition-colors">
                            <CardHeader>
                                <CardTitle>{role.label}</CardTitle>
                                <CardDescription>{role.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    className="w-full"
                                    onClick={() => handleRoleSelect(role.id)}
                                    disabled={registerInternal.isPending || loginStatus === 'logging-in'}
                                >
                                    {registerInternal.isPending
                                        ? 'Registering...'
                                        : loginStatus === 'logging-in'
                                          ? 'Logging in...'
                                          : 'Register'}
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
