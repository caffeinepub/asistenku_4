import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardSidebar from '@/components/DashboardSidebar';
import AccessGate from '@/components/AccessGate';
import LanguageToggle from '@/components/LanguageToggle';
import ManajemenLayananView from '@/components/layanan/ManajemenLayananView';
import UserManagementView from '@/components/superadmin/UserManagementView';
import SuperadminTaskManagementView from '@/components/superadmin/SuperadminTaskManagementView';
import SuperadminInternalAccessCodesSettingsView from '@/components/superadmin/SuperadminInternalAccessCodesSettingsView';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

function SuperadminDashboardContent() {
    const { locale } = useLocale();
    const [activeMenu, setActiveMenu] = useState('ringkasan');

    const MENU_ITEMS = [
        { label: 'Ringkasan', value: 'ringkasan' },
        { label: 'Manajemen User', value: 'users' },
        { label: 'Manajemen Layanan', value: 'layanan' },
        { label: 'Manajemen Task', value: 'task' },
        { label: 'Audit Log', value: 'audit-log' },
        { label: 'Pengaturan', value: 'pengaturan' }
    ];

    return (
        <div className="flex min-h-screen bg-background">
            <DashboardSidebar menuItems={MENU_ITEMS} activeItem={activeMenu} onItemClick={setActiveMenu} />

            <main className="flex-1 p-8">
                <div className="max-w-5xl mx-auto space-y-6">
                    <div className="flex items-center justify-end">
                        <LanguageToggle />
                    </div>

                    {activeMenu === 'ringkasan' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('superadmin_summary_title', locale)}</CardTitle>
                                <CardDescription>{t('superadmin_summary_desc', locale)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t('superadmin_summary_welcome', locale)}</p>
                            </CardContent>
                        </Card>
                    )}

                    {activeMenu === 'users' && <UserManagementView />}

                    {activeMenu === 'layanan' && <ManajemenLayananView />}

                    {activeMenu === 'task' && <SuperadminTaskManagementView />}

                    {activeMenu === 'audit-log' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('superadmin_audit_title', locale)}</CardTitle>
                                <CardDescription>{t('superadmin_audit_desc', locale)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Audit log features coming soon.</p>
                            </CardContent>
                        </Card>
                    )}

                    {activeMenu === 'pengaturan' && <SuperadminInternalAccessCodesSettingsView />}
                </div>
            </main>
        </div>
    );
}

export default function SuperadminDashboardPage() {
    return (
        <AccessGate requiredRole="SUPERADMIN" isInternal={true}>
            <SuperadminDashboardContent />
        </AccessGate>
    );
}
