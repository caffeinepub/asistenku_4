import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetCallerUser } from '@/hooks/useQueries';
import { useActor } from '@/hooks/useActor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import AccessDeniedScreen from '@/components/AccessDeniedScreen';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

interface AccessGateProps {
    children: React.ReactNode;
    requiredRole: string;
    isInternal?: boolean;
}

// Helper to normalize role for comparison
function normalizeRole(role: string | undefined | null): string {
    if (!role) return '';
    return role.trim().toUpperCase();
}

// Helper to check if status is valid (active or pending)
function isValidStatus(status: any): boolean {
    if (!status) return false;
    const statusStr = String(status).toLowerCase().replace('#', '');
    return statusStr === 'active' || statusStr === 'pending';
}

export default function AccessGate({ children, requiredRole, isInternal = false }: AccessGateProps) {
    const navigate = useNavigate();
    const { locale } = useLocale();
    const { actor, isFetching: actorFetching } = useActor();
    const { refetch: getCallerUser } = useGetCallerUser();
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [userStatus, setUserStatus] = useState<string | null>(null);
    const [showAccessDenied, setShowAccessDenied] = useState(false);

    const isActorReady = !!actor && !actorFetching;

    const handleVerify = async () => {
        if (!isActorReady) {
            setErrorMessage('Backend connection not ready. Please try again.');
            return;
        }

        setIsVerifying(true);
        setErrorMessage(null);

        try {
            const { data: user } = await getCallerUser();

            // Check if user profile exists
            if (!user) {
                if (isInternal) {
                    setShowAccessDenied(true);
                } else {
                    setErrorMessage(t('public_mismatch_ui', locale));
                }
                return;
            }

            // Normalize roles for comparison
            const userRoleNormalized = normalizeRole(user.role);
            const requiredRoleNormalized = normalizeRole(requiredRole);

            // Check if role matches
            if (userRoleNormalized !== requiredRoleNormalized) {
                if (isInternal) {
                    setShowAccessDenied(true);
                } else {
                    setErrorMessage(t('public_mismatch_ui', locale));
                }
                return;
            }

            // Check if status is valid (allow both active and pending)
            if (!isValidStatus(user.status)) {
                if (isInternal) {
                    setShowAccessDenied(true);
                } else {
                    setErrorMessage(t('public_mismatch_ui', locale));
                }
                return;
            }

            // Store status for optional pending banner
            const statusStr = String(user.status).toLowerCase().replace('#', '');
            setUserStatus(statusStr);

            setIsVerified(true);
        } catch (err: any) {
            console.error('Access verification error:', err);
            if (err.message?.includes('Actor not available')) {
                setErrorMessage('Backend connection not ready. Please try again.');
            } else {
                if (isInternal) {
                    setShowAccessDenied(true);
                } else {
                    setErrorMessage(t('public_mismatch_ui', locale));
                }
            }
        } finally {
            setIsVerifying(false);
        }
    };

    if (showAccessDenied) {
        return <AccessDeniedScreen />;
    }

    if (isVerified) {
        return (
            <>
                {isInternal && userStatus === 'pending' && (
                    <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
                        <p className="text-sm text-yellow-800 text-center">
                            ⏳ Pending activation - Your account is awaiting approval
                        </p>
                    </div>
                )}
                {children}
            </>
        );
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <BrandLogo variant="horizontal" className="h-10 mx-auto mb-4" />
                    <div className="flex justify-center mb-4">
                        <ShieldCheck className="h-16 w-16 text-primary" />
                    </div>
                    <CardTitle>{t('verify_access_title', locale)}</CardTitle>
                    <CardDescription>{t('verify_access_hint', locale)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!isActorReady && (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Connecting to backend...
                            </AlertDescription>
                        </Alert>
                    )}

                    {errorMessage && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}

                    <Button
                        onClick={handleVerify}
                        disabled={!isActorReady || isVerifying}
                        className="w-full"
                    >
                        {isVerifying ? 'Verifying...' : t('verify_and_open', locale)}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
