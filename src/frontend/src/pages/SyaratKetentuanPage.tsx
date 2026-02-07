import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BrandLogo from '@/components/BrandLogo';

export default function SyaratKetentuanPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-white/85 backdrop-blur-md">
                <div className="container mx-auto px-6 py-4">
                    <BrandLogo variant="horizontal" className="h-8" />
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl">Syarat & Ketentuan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-muted-foreground leading-relaxed">
                                This page contains the terms and conditions for using Asistenku services. 
                                Detailed terms will be provided here to ensure transparency and clarity 
                                for all users of our platform.
                            </p>
                            <Button onClick={() => navigate({ to: '/' })}>
                                Kembali ke Beranda
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
