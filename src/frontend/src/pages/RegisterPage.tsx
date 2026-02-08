import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useRegisterClient, useRegisterPartner, useGetCallerUser } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { clientFormFields, partnerFormFields } from '@/lib/forms/registrationSchemas';
import type { ClientFormData, PartnerFormData } from '@/lib/forms/registrationSchemas';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { locale } = useLocale();
    const { identity, login, loginStatus } = useInternetIdentity();
    const registerClient = useRegisterClient();
    const registerPartner = useRegisterPartner();
    const { refetch: getCallerUser } = useGetCallerUser();

    const [activeTab, setActiveTab] = useState<'client' | 'partner'>('client');
    const [clientForm, setClientForm] = useState<ClientFormData>({
        name: '',
        email: '',
        whatsapp: '',
        company: ''
    });
    const [partnerForm, setPartnerForm] = useState<PartnerFormData>({
        name: '',
        email: '',
        whatsapp: '',
        skills: '',
        domicile: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<{ type: 'client' | 'partner'; id: string } | null>(null);

    const handleClientChange = (field: keyof ClientFormData, value: string) => {
        setClientForm((prev) => ({ ...prev, [field]: value }));
    };

    const handlePartnerChange = (field: keyof PartnerFormData, value: string) => {
        setPartnerForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleClientSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!identity) {
            login();
            return;
        }

        try {
            const id = await registerClient.mutateAsync({
                name: clientForm.name,
                email: clientForm.email,
                whatsapp: clientForm.whatsapp,
                company: clientForm.company
            });
            setSuccess({ type: 'client', id });
        } catch (err: any) {
            console.error('Client registration error:', err);
            if (err.message?.includes('already exists') || err.message?.includes('already has a profile')) {
                setError(t('error_already_registered', locale));
            } else {
                setError(t('error_registration_failed', locale));
            }
        }
    };

    const handlePartnerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!identity) {
            login();
            return;
        }

        try {
            const id = await registerPartner.mutateAsync({
                name: partnerForm.name,
                email: partnerForm.email,
                whatsapp: partnerForm.whatsapp,
                skills: partnerForm.skills,
                domisili: partnerForm.domicile
            });
            setSuccess({ type: 'partner', id });
        } catch (err: any) {
            console.error('Partner registration error:', err);
            if (err.message?.includes('already exists') || err.message?.includes('already has a profile')) {
                setError(t('error_already_registered', locale));
            } else {
                setError(t('error_registration_failed', locale));
            }
        }
    };

    const handleGoToDashboard = async () => {
        if (!success) return;

        try {
            const { data: user } = await getCallerUser();
            if (user) {
                if (success.type === 'client') {
                    navigate({ to: '/client/dashboard' });
                } else {
                    navigate({ to: '/partner/dashboard' });
                }
            }
        } catch (err) {
            console.error('Navigation error:', err);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-background p-6 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <BrandLogo variant="horizontal" className="h-10 mx-auto mb-4" />
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="h-16 w-16 text-green-600" />
                        </div>
                        <CardTitle>{t('registration_success_title', locale)}</CardTitle>
                        <CardDescription>
                            {success.type === 'client'
                                ? t('registration_success_client', locale)
                                : t('registration_success_partner', locale)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">{t('your_id', locale)}</p>
                            <p className="font-mono font-semibold">{success.id}</p>
                        </div>
                        <Button className="w-full" onClick={handleGoToDashboard}>
                            {t('go_to_dashboard', locale)}
                        </Button>
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
                    <h1 className="text-3xl font-bold">{t('register_title', locale)}</h1>
                    <p className="text-muted-foreground mt-2">{t('register_subtitle', locale)}</p>
                </div>

                {!identity && (
                    <Alert className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{t('login_required_hint', locale)}</AlertDescription>
                    </Alert>
                )}

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'client' | 'partner')}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="client">{t('tab_client', locale)}</TabsTrigger>
                        <TabsTrigger value="partner">{t('tab_partner', locale)}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="client">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('tab_client', locale)}</CardTitle>
                                <CardDescription>
                                    Register as a client to access our services
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleClientSubmit} className="space-y-4">
                                    {clientFormFields.map((field) => (
                                        <div key={field.name} className="space-y-2">
                                            <Label htmlFor={field.name}>
                                                {field.label}
                                                {field.required && <span className="text-destructive ml-1">*</span>}
                                            </Label>
                                            <Input
                                                id={field.name}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                value={clientForm[field.name as keyof ClientFormData]}
                                                onChange={(e) =>
                                                    handleClientChange(
                                                        field.name as keyof ClientFormData,
                                                        e.target.value
                                                    )
                                                }
                                                required={field.required}
                                            />
                                        </div>
                                    ))}
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={!identity || registerClient.isPending}
                                    >
                                        {!identity
                                            ? t('logging_in', locale)
                                            : registerClient.isPending
                                              ? t('registering', locale)
                                              : t('register_button', locale)}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="partner">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('tab_partner', locale)}</CardTitle>
                                <CardDescription>
                                    Join our partner network and start earning
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                                    {partnerFormFields.map((field) => (
                                        <div key={field.name} className="space-y-2">
                                            <Label htmlFor={field.name}>
                                                {field.label}
                                                {field.required && <span className="text-destructive ml-1">*</span>}
                                            </Label>
                                            <Input
                                                id={field.name}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                value={partnerForm[field.name as keyof PartnerFormData]}
                                                onChange={(e) =>
                                                    handlePartnerChange(
                                                        field.name as keyof PartnerFormData,
                                                        e.target.value
                                                    )
                                                }
                                                required={field.required}
                                            />
                                        </div>
                                    ))}
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={!identity || registerPartner.isPending}
                                    >
                                        {!identity
                                            ? t('logging_in', locale)
                                            : registerPartner.isPending
                                              ? t('registering', locale)
                                              : t('register_button', locale)}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="text-center mt-6">
                    <p className="text-sm text-muted-foreground">
                        {t('already_have_account', locale)}{' '}
                        <Button variant="link" className="p-0 h-auto" onClick={() => navigate({ to: '/login' })}>
                            {t('nav_login', locale)}
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    );
}
