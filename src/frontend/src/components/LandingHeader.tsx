import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import BrandLogo from './BrandLogo';
import LanguageToggle from './LanguageToggle';
import { useLocale } from '@/providers/LocaleProvider';
import { t } from '@/lib/i18n';

export default function LandingHeader() {
    const navigate = useNavigate();
    const { locale } = useLocale();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-white/85 backdrop-blur-md shadow-sm' : 'bg-white/85'
            }`}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <BrandLogo variant="horizontal" className="h-8" />
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#beranda" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                            {t('nav_home', locale)}
                        </a>
                        <a href="#layanan" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                            {t('nav_services', locale)}
                        </a>
                        <a href="#bergabung" className="text-sm font-medium text-foreground/80 hover:text-foreground">
                            {t('nav_join', locale)}
                        </a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <LanguageToggle />
                        <Button variant="outline" onClick={() => navigate({ to: '/login' })}>
                            {t('nav_have_account', locale)}
                        </Button>
                        <Button onClick={() => navigate({ to: '/daftar' })}>
                            {t('nav_register', locale)}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
