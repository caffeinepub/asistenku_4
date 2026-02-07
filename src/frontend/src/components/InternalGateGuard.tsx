import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

interface InternalGateGuardProps {
    children: React.ReactNode;
}

const GATE_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

export default function InternalGateGuard({ children }: InternalGateGuardProps) {
    const navigate = useNavigate();
    const { locale } = useLocale();
    const [isGatePassed, setIsGatePassed] = useState(false);

    useEffect(() => {
        const gatePassed = sessionStorage.getItem('internalGatePassed');
        const gatePassedAt = sessionStorage.getItem('internalGatePassedAt');

        if (gatePassed === 'true' && gatePassedAt) {
            const timestamp = parseInt(gatePassedAt, 10);
            const now = Date.now();

            // Check if expired (30 minutes)
            if (now - timestamp > GATE_EXPIRY_MS) {
                // Expired - clear flags
                sessionStorage.removeItem('internalGatePassed');
                sessionStorage.removeItem('internalGatePassedAt');
                setIsGatePassed(false);
            } else {
                // Valid
                setIsGatePassed(true);
            }
        } else {
            setIsGatePassed(false);
        }
    }, []);

    const handleGoToInternal = () => {
        navigate({ to: '/internal' });
    };

    if (!isGatePassed) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <BrandLogo variant="horizontal" className="h-10 mx-auto mb-4" />
                        <CardTitle>{t('internal_locked_title', locale)}</CardTitle>
                        <CardDescription>Access code required</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                {t('internal_locked_hint', locale)}
                            </AlertDescription>
                        </Alert>
                        <Button onClick={handleGoToInternal} className="w-full">
                            {t('go_to_internal', locale)}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return <>{children}</>;
}
