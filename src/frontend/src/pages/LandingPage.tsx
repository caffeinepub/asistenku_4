import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import LandingHeader from '@/components/LandingHeader';
import LandingFooter from '@/components/LandingFooter';
import { BRAND_ASSETS } from '@/lib/brand';
import { WHATSAPP_LINKS } from '@/lib/whatsapp';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

export default function LandingPage() {
    const navigate = useNavigate();
    const { locale } = useLocale();

    const services = [
        {
            title: t('service_tenang_title', locale),
            description: t('service_tenang_desc', locale),
            price: t('service_tenang_price', locale),
            whatsappLink: WHATSAPP_LINKS.tenang
        },
        {
            title: t('service_rapi_title', locale),
            description: t('service_rapi_desc', locale),
            price: t('service_rapi_price', locale),
            whatsappLink: WHATSAPP_LINKS.rapi
        },
        {
            title: t('service_fokus_title', locale),
            description: t('service_fokus_desc', locale),
            price: t('service_fokus_price', locale),
            whatsappLink: WHATSAPP_LINKS.fokus
        },
        {
            title: t('service_jaga_title', locale),
            description: t('service_jaga_desc', locale),
            price: t('service_jaga_price', locale),
            whatsappLink: WHATSAPP_LINKS.jaga
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <LandingHeader />

            <main className="pt-20">
                {/* Hero Section */}
                <section id="beranda" className="py-20 bg-gradient-to-b from-background to-muted/20">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight whitespace-pre-line">
                                    {t('hero_title', locale)}
                                </h1>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {t('hero_subtitle', locale)}
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <Button size="lg" onClick={() => navigate({ to: '/daftar' })}>
                                        {t('hero_cta_start', locale)}
                                    </Button>
                                    <Button size="lg" variant="outline" onClick={() => navigate({ to: '/login' })}>
                                        {t('hero_cta_login', locale)}
                                    </Button>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src={BRAND_ASSETS.hero}
                                    alt="Asistenku Hero"
                                    className="w-full h-auto rounded-2xl shadow-xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Kebutuhan yang Unik */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            <h2 className="text-3xl font-bold">{t('unique_needs_title', locale)}</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t('unique_needs_desc', locale)}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Layanan untuk Saya */}
                <section id="layanan" className="py-20 bg-muted/20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-5xl mx-auto space-y-12">
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-bold">{t('services_title', locale)}</h2>
                                <p className="text-lg text-muted-foreground">{t('services_subtitle', locale)}</p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                {services.map((service, index) => (
                                    <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <CardTitle className="text-2xl">{service.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <CardDescription className="text-base leading-relaxed">
                                                {service.description}
                                            </CardDescription>
                                            <p className="text-sm text-muted-foreground/85">{service.price}</p>
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                asChild
                                            >
                                                <a
                                                    href={service.whatsappLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ pointerEvents: 'auto' }}
                                                >
                                                    {t('service_cta', locale)}
                                                </a>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Menanggung Sendiri atau Didampingi */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-5xl mx-auto space-y-12">
                            <h2 className="text-3xl font-bold text-center">{t('compare_title', locale)}</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <Card className="border-destructive/20">
                                    <CardHeader>
                                        <CardTitle className="text-destructive">
                                            {t('compare_alone_title', locale)}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3 text-muted-foreground">
                                            <li>{t('compare_alone_1', locale)}</li>
                                            <li>{t('compare_alone_2', locale)}</li>
                                            <li>{t('compare_alone_3', locale)}</li>
                                            <li>{t('compare_alone_4', locale)}</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card className="border-primary/20">
                                    <CardHeader>
                                        <CardTitle className="text-primary">
                                            {t('compare_together_title', locale)}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3 text-muted-foreground">
                                            <li>{t('compare_together_1', locale)}</li>
                                            <li>{t('compare_together_2', locale)}</li>
                                            <li>{t('compare_together_3', locale)}</li>
                                            <li>{t('compare_together_4', locale)}</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="text-center">
                                <Button size="lg" asChild>
                                    <a
                                        href={WHATSAPP_LINKS.comparison}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ pointerEvents: 'auto' }}
                                    >
                                        {t('compare_cta', locale)}
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 bg-muted/20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto space-y-8">
                            <h2 className="text-3xl font-bold text-center">{t('faq_title', locale)}</h2>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>{t('faq_q1', locale)}</AccordionTrigger>
                                    <AccordionContent>{t('faq_a1', locale)}</AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>{t('faq_q2', locale)}</AccordionTrigger>
                                    <AccordionContent>{t('faq_a2', locale)}</AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>{t('faq_q3', locale)}</AccordionTrigger>
                                    <AccordionContent>{t('faq_a3', locale)}</AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <div className="text-center pt-4">
                                <Button variant="outline" asChild>
                                    <a
                                        href={WHATSAPP_LINKS.faq}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ pointerEvents: 'auto' }}
                                    >
                                        {t('service_cta', locale)}
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bergabung dengan Asistenku */}
                <section id="bergabung" className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto space-y-8">
                            <h2 className="text-3xl font-bold text-center">{t('join_title', locale)}</h2>
                            <Card>
                                <CardContent className="pt-6">
                                    <ul className="space-y-3 text-muted-foreground mb-6">
                                        <li>{t('join_benefit_1', locale)}</li>
                                        <li>{t('join_benefit_2', locale)}</li>
                                        <li>{t('join_benefit_3', locale)}</li>
                                        <li>{t('join_benefit_4', locale)}</li>
                                    </ul>
                                    <Button className="w-full" onClick={() => navigate({ to: '/daftar' })}>
                                        {t('join_cta', locale)}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <LandingFooter />
        </div>
    );
}
