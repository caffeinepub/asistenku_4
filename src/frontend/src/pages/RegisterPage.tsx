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
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';
import { PartnerLevel } from '@/backend';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const { identity, login, loginStatus } = useInternetIdentity();
  const registerClient = useRegisterClient();
  const registerPartner = useRegisterPartner();
  const { refetch: getCallerUser } = useGetCallerUser();

  const [activeTab, setActiveTab] = useState<'client' | 'partner'>('client');
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
  });
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    skills: '',
    domicile: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ type: 'client' | 'partner'; id: string } | null>(null);

  const handleClientChange = (field: string, value: string) => {
    setClientForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePartnerChange = (field: string, value: string) => {
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
        company: clientForm.company,
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
        domisili: partnerForm.domicile,
        level: PartnerLevel.level1,
        hourlyRate: BigInt(0),
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
          <CardContent>
            <Button onClick={handleGoToDashboard} className="w-full" size="lg">
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
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="client">{t('tab_client', locale)}</TabsTrigger>
            <TabsTrigger value="partner">{t('tab_partner', locale)}</TabsTrigger>
          </TabsList>

          <TabsContent value="client">
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'id' ? 'Daftar sebagai Klien' : 'Register as Client'}</CardTitle>
                <CardDescription>
                  {locale === 'id' ? 'Buat akun klien Anda' : 'Create your client account'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleClientSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client-name">
                      {locale === 'id' ? 'Nama' : 'Name'}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="client-name"
                      type="text"
                      placeholder={locale === 'id' ? 'Masukkan nama Anda' : 'Enter your name'}
                      value={clientForm.name}
                      onChange={(e) => handleClientChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-email">
                      Email
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="client-email"
                      type="email"
                      placeholder={locale === 'id' ? 'Masukkan email Anda' : 'Enter your email'}
                      value={clientForm.email}
                      onChange={(e) => handleClientChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-whatsapp">
                      WhatsApp
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="client-whatsapp"
                      type="text"
                      placeholder={locale === 'id' ? 'Masukkan nomor WhatsApp' : 'Enter WhatsApp number'}
                      value={clientForm.whatsapp}
                      onChange={(e) => handleClientChange('whatsapp', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-company">
                      {locale === 'id' ? 'Perusahaan' : 'Company'}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="client-company"
                      type="text"
                      placeholder={locale === 'id' ? 'Masukkan nama perusahaan' : 'Enter company name'}
                      value={clientForm.company}
                      onChange={(e) => handleClientChange('company', e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={registerClient.isPending || loginStatus === 'logging-in'}
                  >
                    {registerClient.isPending
                      ? t('registering', locale)
                      : loginStatus === 'logging-in'
                        ? t('logging_in', locale)
                        : t('register_button', locale)}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partner">
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'id' ? 'Daftar sebagai Partner' : 'Register as Partner'}</CardTitle>
                <CardDescription>
                  {locale === 'id' ? 'Buat akun partner Anda' : 'Create your partner account'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="partner-name">
                      {locale === 'id' ? 'Nama' : 'Name'}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="partner-name"
                      type="text"
                      placeholder={locale === 'id' ? 'Masukkan nama Anda' : 'Enter your name'}
                      value={partnerForm.name}
                      onChange={(e) => handlePartnerChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partner-email">
                      Email
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="partner-email"
                      type="email"
                      placeholder={locale === 'id' ? 'Masukkan email Anda' : 'Enter your email'}
                      value={partnerForm.email}
                      onChange={(e) => handlePartnerChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partner-whatsapp">
                      WhatsApp
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="partner-whatsapp"
                      type="text"
                      placeholder={locale === 'id' ? 'Masukkan nomor WhatsApp' : 'Enter WhatsApp number'}
                      value={partnerForm.whatsapp}
                      onChange={(e) => handlePartnerChange('whatsapp', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partner-skills">
                      {locale === 'id' ? 'Keahlian' : 'Skills'}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <textarea
                      id="partner-skills"
                      placeholder={
                        locale === 'id' ? 'Jelaskan keahlian Anda' : 'Describe your skills'
                      }
                      value={partnerForm.skills}
                      onChange={(e) => handlePartnerChange('skills', e.target.value)}
                      required
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="partner-domicile">
                      {locale === 'id' ? 'Domisili' : 'Location'}
                      <span className="text-destructive ml-1">*</span>
                    </Label>
                    <Input
                      id="partner-domicile"
                      type="text"
                      placeholder={locale === 'id' ? 'Masukkan lokasi Anda' : 'Enter your location'}
                      value={partnerForm.domicile}
                      onChange={(e) => handlePartnerChange('domicile', e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={registerPartner.isPending || loginStatus === 'logging-in'}
                  >
                    {registerPartner.isPending
                      ? t('registering', locale)
                      : loginStatus === 'logging-in'
                        ? t('logging_in', locale)
                        : t('register_button', locale)}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
