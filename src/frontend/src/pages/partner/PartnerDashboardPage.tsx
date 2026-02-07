import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import CopyRow from '@/components/CopyRow';
import LockedPanel from '@/components/LockedPanel';
import AccessGate from '@/components/AccessGate';
import LanguageToggle from '@/components/LanguageToggle';
import { useGetCallerUser } from '@/hooks/useQueries';
import { UserStatus } from '@/backend';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

function PartnerDashboardContent() {
    const { data: user } = useGetCallerUser();
    const { locale } = useLocale();
    const [activeMenu, setActiveMenu] = useState('ringkasan');
    const isPending = user?.status === UserStatus.pending;

    const MENU_ITEMS = [
        { label: t('menu_summary', locale), value: 'ringkasan' },
        { label: t('menu_profile', locale), value: 'profil' },
        { label: t('menu_work', locale), value: 'pekerjaan' },
        { label: t('menu_income', locale), value: 'pendapatan' }
    ];

    return (
        <div className="flex min-h-screen bg-background">
            <DashboardSidebar menuItems={MENU_ITEMS} activeItem={activeMenu} onItemClick={setActiveMenu} />

            <main className="flex-1 p-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="flex items-center justify-end">
                        <LanguageToggle />
                    </div>

                    {isPending && (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{t('partner_pending_alert', locale)}</AlertDescription>
                        </Alert>
                    )}

                    {activeMenu === 'ringkasan' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('partner_summary_title', locale)}</CardTitle>
                                <CardDescription>{t('partner_summary_desc', locale)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t('partner_summary_welcome', locale)}</p>
                            </CardContent>
                        </Card>
                    )}

                    {activeMenu === 'profil' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('partner_profile_title', locale)}</CardTitle>
                                <CardDescription>{t('partner_profile_desc', locale)}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CopyRow label="Partner ID" value={user?.id || ''} />
                                <CopyRow label="Principal ID" value={user?.principalId || ''} />
                                <CopyRow label="Nama" value={user?.partnerData?.name || ''} />
                                <CopyRow label="Email" value={user?.partnerData?.email || ''} />
                                <CopyRow
                                    label="WhatsApp"
                                    value={user?.partnerData?.whatsapp || ''}
                                />
                                <CopyRow
                                    label="Keahlian"
                                    value={user?.partnerData?.skills || ''}
                                />
                                <CopyRow label="Domisili" value={user?.partnerData?.domisili || ''} />
                            </CardContent>
                        </Card>
                    )}

                    {activeMenu === 'pekerjaan' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('partner_work_title', locale)}</CardTitle>
                                <CardDescription>{t('partner_work_desc', locale)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="tab1" className="w-full">
                                    <TabsList className="grid w-full grid-cols-5">
                                        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                                        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                                        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                                        <TabsTrigger value="tab4">Tab 4</TabsTrigger>
                                        <TabsTrigger value="tab5">Tab 5</TabsTrigger>
                                    </TabsList>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <TabsContent key={i} value={`tab${i}`}>
                                            <p className="text-muted-foreground">Placeholder content for tab {i}</p>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Card>
                    )}

                    {activeMenu === 'pendapatan' && (
                        <div className="space-y-6">
                            <LockedPanel
                                title={t('partner_financial_title', locale)}
                                description={t('partner_financial_desc', locale)}
                            />
                            <LockedPanel
                                title={t('partner_balance_title', locale)}
                                description={t('partner_balance_desc', locale)}
                            />
                            <LockedPanel
                                title={t('partner_cert_title', locale)}
                                description={t('partner_cert_desc', locale)}
                            />
                            <Card className="border-dashed">
                                <CardContent className="pt-6">
                                    <p className="text-center text-muted-foreground">
                                        More features coming soon
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default function PartnerDashboardPage() {
    return (
        <AccessGate requiredRole="PARTNER" isInternal={false}>
            <PartnerDashboardContent />
        </AccessGate>
    );
}
