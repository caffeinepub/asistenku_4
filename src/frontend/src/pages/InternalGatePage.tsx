import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

export default function InternalGatePage() {
    const navigate = useNavigate();
    const { locale } = useLocale();
    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsVerifying(true);

        try {
            const trimmedCode = code.trim();
            
            if (!trimmedCode || trimmedCode.length === 0) {
                setError(t('invalid_code_ui', locale));
                setIsVerifying(false);
                return;
            }

            // Backend verification not available yet - using client-side validation
            // When backend method is available, call: actor.verifyInternalAccessCode(trimmedCode)
            // Expected response: { ok: boolean; route?: string }
            
            // Temporary client-side logic until backend implements verifyInternalAccessCode
            // This allows any non-empty code to pass and defaults to /internal/login
            const mockResponse = {
                ok: true,
                route: '/internal/login' // Backend should return either /internal/daftar or /internal/login
            };

            if (mockResponse.ok && mockResponse.route) {
                // Set session flags before navigation
                sessionStorage.setItem('internalGatePassed', 'true');
                sessionStorage.setItem('internalGatePassedAt', Date.now().toString());

                // Navigate to the route provided by backend
                navigate({ to: mockResponse.route });
            } else {
                setError(t('invalid_code_ui', locale));
            }
        } catch (err: any) {
            console.error('Code verification error:', err);
            setError(t('invalid_code_ui', locale));
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <BrandLogo variant="horizontal" className="h-10 mx-auto mb-4" />
                    <CardTitle>{t('internal_access_title', locale)}</CardTitle>
                    <CardDescription>{t('internal_access_hint', locale)}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="code">{t('access_code_label', locale)}</Label>
                            <Input
                                id="code"
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder={t('access_code_label', locale)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isVerifying}>
                            {isVerifying ? 'Verifying...' : t('continue', locale)}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => navigate({ to: '/' })}
                        >
                            {t('back', locale)}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
