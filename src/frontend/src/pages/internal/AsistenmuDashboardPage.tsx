import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BrandLogo from '@/components/BrandLogo';
import AccessGate from '@/components/AccessGate';
import LanguageToggle from '@/components/LanguageToggle';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

function AsistenmuDashboardContent() {
    const { locale } = useLocale();

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-card">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <BrandLogo variant="horizontal" className="h-8" />
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold">{t('asistenmu_workspace_title', locale)}</h1>
                        <LanguageToggle />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold">{t('asistenmu_dashboard_title', locale)}</h2>
                        <p className="text-muted-foreground">{t('asistenmu_dashboard_desc', locale)}</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('asistenmu_dashboard_title_card', locale)}</CardTitle>
                            <CardDescription>{t('asistenmu_dashboard_desc_card', locale)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{t('asistenmu_dashboard_placeholder', locale)}</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

export default function AsistenmuDashboardPage() {
    return (
        <AccessGate requiredRole="ASISTENMU" isInternal={true}>
            <AsistenmuDashboardContent />
        </AccessGate>
    );
}
