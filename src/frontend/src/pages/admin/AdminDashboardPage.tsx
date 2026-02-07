import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardSidebar from '@/components/DashboardSidebar';
import AccessGate from '@/components/AccessGate';
import LanguageToggle from '@/components/LanguageToggle';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

function AdminDashboardContent() {
    const { locale } = useLocale();
    const [activeMenu, setActiveMenu] = useState('ringkasan');

    const MENU_ITEMS = [
        { label: t('menu_summary', locale), value: 'ringkasan' },
        { label: t('menu_users', locale), value: 'users' },
        { label: t('menu_internal_access', locale), value: 'internal-access' }
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
                                <CardTitle>{t('admin_summary_title', locale)}</CardTitle>
                                <CardDescription>{t('admin_summary_desc', locale)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t('admin_summary_welcome', locale)}</p>
                            </CardContent>
                        </Card>
                    )}

                    {activeMenu === 'users' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('admin_users_title', locale)}</CardTitle>
                                <CardDescription>{t('admin_users_desc', locale)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">User management features coming soon.</p>
                            </CardContent>
                        </Card>
                    )}

                    {activeMenu === 'internal-access' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('admin_internal_access_title', locale)}</CardTitle>
                                <CardDescription>{t('admin_internal_access_desc', locale)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Internal access code management coming soon.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}

export default function AdminDashboardPage() {
    return (
        <AccessGate requiredRole="ADMIN" isInternal={true}>
            <AdminDashboardContent />
        </AccessGate>
    );
}
