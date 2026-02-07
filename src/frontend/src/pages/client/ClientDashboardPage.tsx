import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrandLogo from '@/components/BrandLogo';
import CopyRow from '@/components/CopyRow';
import AccessGate from '@/components/AccessGate';
import LanguageToggle from '@/components/LanguageToggle';
import ClientLayanankuTab from '@/components/client/ClientLayanankuTab';
import ClientDelegasiLockState from '@/components/client/ClientDelegasiLockState';
import ClientServiceRequestTab from '@/components/client/ClientServiceRequestTab';
import { useGetCallerUser } from '@/hooks/useQueries';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

function ClientDashboardContent() {
    const { data: user } = useGetCallerUser();
    const { locale } = useLocale();
    const userName = user?.clientData?.name || 'User';

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-card">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <BrandLogo variant="horizontal" className="h-8" />
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold">{t('workspace_title', locale)}</h1>
                        <LanguageToggle />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {t('client_greeting', locale).replace('{name}', userName)}
                        </h2>
                        <p className="text-muted-foreground">{t('client_greeting_desc', locale)}</p>
                    </div>

                    <Tabs defaultValue="ringkasan" className="w-full">
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="ringkasan">{t('tab_summary', locale)}</TabsTrigger>
                            <TabsTrigger value="profil">{t('tab_profile', locale)}</TabsTrigger>
                            <TabsTrigger value="layananku">{t('tab_services', locale)}</TabsTrigger>
                            <TabsTrigger value="permintaan">{t('tab_service_request', locale)}</TabsTrigger>
                            <TabsTrigger value="delegasi">{t('tab_delegation', locale)}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="ringkasan" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('summary_title', locale)}</CardTitle>
                                    <CardDescription>{t('summary_desc', locale)}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{t('summary_welcome', locale)}</p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="profil" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('profile_title', locale)}</CardTitle>
                                    <CardDescription>{t('profile_desc', locale)}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <CopyRow label="Client ID" value={user?.id || ''} />
                                    <CopyRow label="Principal ID" value={user?.principalId || ''} />
                                    <CopyRow label="Nama" value={user?.clientData?.name || ''} />
                                    <CopyRow label="Email" value={user?.clientData?.email || ''} />
                                    <CopyRow label="WhatsApp" value={user?.clientData?.whatsapp || ''} />
                                    <CopyRow label="Perusahaan/Bisnis" value={user?.clientData?.company || ''} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="layananku" className="space-y-4">
                            <ClientLayanankuTab />
                        </TabsContent>

                        <TabsContent value="permintaan" className="space-y-4">
                            <ClientServiceRequestTab />
                        </TabsContent>

                        <TabsContent value="delegasi" className="space-y-4">
                            <ClientDelegasiLockState>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{t('delegation_title', locale)}</CardTitle>
                                        <CardDescription>Create and manage your tasks</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button className="w-full">
                                            Create New Task
                                        </Button>
                                    </CardContent>
                                </Card>
                            </ClientDelegasiLockState>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}

export default function ClientDashboardPage() {
    return (
        <AccessGate requiredRole="CLIENT" isInternal={false}>
            <ClientDashboardContent />
        </AccessGate>
    );
}
