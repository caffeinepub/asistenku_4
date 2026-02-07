import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUser } from '@/hooks/useQueries';
import { useActor } from '@/hooks/useActor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import BrandLogo from '@/components/BrandLogo';
import { AlertCircle } from 'lucide-react';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

export default function LoginPage() {
    const navigate = useNavigate();
    const { locale } = useLocale();
    const { identity, login, loginStatus, clear } = useInternetIdentity();
    const { actor, isFetching: actorFetching } = useActor();
    const { refetch: getCallerUser } = useGetCallerUser();
    const [workspaceLoading, setWorkspaceLoading] = useState<'CLIENT' | 'PARTNER' | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const isLoggingIn = loginStatus === 'logging-in';
    const isAuthenticated = !!identity;
    const isActorReady = !!actor && !actorFetching;
    const canInteract = isAuthenticated && isActorReady;

    const handleRoleLogin = async (role: 'CLIENT' | 'PARTNER') => {
        setErrorMessage(null);

        if (!isAuthenticated) {
            try {
                await login();
            } catch (error: any) {
                console.error('Login error:', error);
                setErrorMessage('Login failed. Please try again.');
            }
            return;
        }

        if (!isActorReady) {
            setErrorMessage('Backend connection not ready. Please try again.');
            return;
        }

        setWorkspaceLoading(role);

        try {
            const { data: user } = await getCallerUser();

            if (!user || user.role !== role) {
                setErrorMessage(t('public_mismatch_ui', locale));
                setWorkspaceLoading(null);
                return;
            }

            const route = role === 'CLIENT' ? '/client' : '/partner';
            navigate({ to: route });
        } catch (err: any) {
            console.error('Workspace access error:', err);
            if (err.message?.includes('Actor not available')) {
                setErrorMessage('Backend connection not ready. Please try again.');
            } else {
                setErrorMessage(t('public_mismatch_ui', locale));
            }
            setWorkspaceLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-8">
                    <BrandLogo variant="horizontal" className="h-10 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold">{t('login_title', locale)}</h1>
                    <p className="text-muted-foreground mt-2">{t('login_subtitle', locale)}</p>
                </div>

                <div className="flex justify-center mb-8">
                    <Button
                        size="lg"
                        onClick={isAuthenticated ? clear : login}
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
                    <Alert className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>Connecting to backend... Please wait.</AlertDescription>
                    </Alert>
                )}

                {errorMessage && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Client</CardTitle>
                            <CardDescription>{t('login_as_client', locale)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                className="w-full"
                                onClick={() => handleRoleLogin('CLIENT')}
                                disabled={!canInteract || workspaceLoading === 'CLIENT'}
                            >
                                {workspaceLoading === 'CLIENT' ? 'Loading...' : t('workspace_btn', locale)}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Partner</CardTitle>
                            <CardDescription>{t('login_as_partner', locale)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                className="w-full"
                                onClick={() => handleRoleLogin('PARTNER')}
                                disabled={!canInteract || workspaceLoading === 'PARTNER'}
                            >
                                {workspaceLoading === 'PARTNER' ? 'Loading...' : t('workspace_btn', locale)}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center mt-6">
                    <Button variant="link" onClick={() => navigate({ to: '/' })}>
                        {t('back', locale)}
                    </Button>
                </div>
            </div>
        </div>
    );
}
