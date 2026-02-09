import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BrandLogo from '@/components/BrandLogo';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { LogIn, UserPlus } from 'lucide-react';

export default function InternalGatePage() {
    const navigate = useNavigate();
    const { locale } = useLocale();
    const { login, clear, loginStatus, identity } = useInternetIdentity();

    const isAuthenticated = !!identity;
    const isLoggingIn = loginStatus === 'logging-in';

    // Set gate flags when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            sessionStorage.setItem('internalGatePassed', 'true');
            sessionStorage.setItem('internalGatePassedAt', Date.now().toString());
        }
    }, [isAuthenticated]);

    const handleLogin = async () => {
        try {
            await login();
        } catch (error: any) {
            console.error('Login error:', error);
            if (error.message === 'User is already authenticated') {
                await clear();
                setTimeout(() => login(), 300);
            }
        }
    };

    const handleLogout = async () => {
        await clear();
        sessionStorage.removeItem('internalGatePassed');
        sessionStorage.removeItem('internalGatePassedAt');
    };

    const handleNavigateToLogin = () => {
        navigate({ to: '/internal/login' });
    };

    const handleNavigateToDaftar = () => {
        navigate({ to: '/internal/daftar' });
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <BrandLogo variant="horizontal" className="h-10 mx-auto mb-4" />
                    <CardTitle>{t('internal_access_title', locale)}</CardTitle>
                    <CardDescription>
                        {isAuthenticated 
                            ? 'Choose your destination' 
                            : 'Please login to continue'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!isAuthenticated ? (
                        <>
                            <Button 
                                onClick={handleLogin} 
                                className="w-full" 
                                disabled={isLoggingIn}
                            >
                                {isLoggingIn ? 'Logging in...' : 'Login with Internet Identity'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => navigate({ to: '/' })}
                            >
                                {t('back', locale)}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button 
                                onClick={handleNavigateToLogin} 
                                className="w-full flex items-center justify-center gap-2"
                            >
                                <LogIn className="h-4 w-4" />
                                Go to Login
                            </Button>
                            <Button 
                                onClick={handleNavigateToDaftar} 
                                variant="outline"
                                className="w-full flex items-center justify-center gap-2"
                            >
                                <UserPlus className="h-4 w-4" />
                                Go to Register
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                className="w-full"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
