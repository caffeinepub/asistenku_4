import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';
import CopyRow from '@/components/CopyRow';
import AccessGate from '@/components/AccessGate';
import LanguageToggle from '@/components/LanguageToggle';
import PartnerWorkTabs from '@/components/partner/work/PartnerWorkTabs';
import PartnerWalletCard from '@/components/partner/income/PartnerWalletCard';
import { useGetCallerUser } from '@/hooks/useQueries';
import { UserStatus } from '@/backend';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

function PartnerDashboardContent() {
    const navigate = useNavigate();
    const { data: user } = useGetCallerUser();
    const { locale } = useLocale();
    const [activeMenu, setActiveMenu] = useState('ringkasan');

    const isPending = user?.status === UserStatus.pending;
    const isSuspended = user?.status === UserStatus.suspended;
    const isBlacklisted = user?.status === UserStatus.blacklisted;
    const isLocked = isPending || isSuspended;

    // Redirect to blocked page if blacklisted
    useEffect(() => {
        if (isBlacklisted) {
            navigate({ to: '/partner/blocked' });
        }
    }, [isBlacklisted, navigate]);

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

                    {isSuspended && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Akun Anda sedang suspended. Aksi terbatas hingga status diaktifkan kembali.
                            </AlertDescription>
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
                                <PartnerWorkTabs isLocked={isLocked} />
                            </CardContent>
                        </Card>
                    )}

                    {activeMenu === 'pendapatan' && (
                        <div className="space-y-6">
                            <PartnerWalletCard />
                            <Card className="border-dashed">
                                <CardContent className="pt-6">
                                    <p className="text-center text-muted-foreground">
                                        Fitur penarikan dan riwayat transaksi akan segera hadir
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
