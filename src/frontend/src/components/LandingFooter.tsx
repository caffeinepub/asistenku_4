import { WHATSAPP_LINKS } from '@/lib/whatsapp';

export default function LandingFooter() {
    return (
        <footer className="bg-background py-12 border-t">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Take a breath. You don't have to carry everything alone.
                        </p>
                        <div>
                            <a
                                href={WHATSAPP_LINKS.footer}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                Contact us via WhatsApp
                            </a>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
                        <a
                            href="/syarat-ketentuan"
                            className="hover:text-foreground transition-colors"
                        >
                            Syarat & Ketentuan
                        </a>
                        <span className="hidden sm:inline">•</span>
                        <a
                            href="/kebijakan-privasi"
                            className="hover:text-foreground transition-colors"
                        >
                            Kebijakan Privasi
                        </a>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            © 2026 Asistenku — PT Asistenku Digital Indonesia
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
