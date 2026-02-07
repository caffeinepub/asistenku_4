import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

export default function InternalRoleMismatchPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <BrandLogo variant="horizontal" className="h-10 mx-auto mb-4" />
                    <div className="flex justify-center mb-4">
                        <AlertCircle className="h-16 w-16 text-destructive" />
                    </div>
                    <CardTitle>Role Mismatch</CardTitle>
                    <CardDescription>Klik di Ruang kerja yang sesuai dengan bagian/role kamu</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => navigate({ to: '/internal/login' })} className="w-full" size="lg">
                        Back to Internal Login
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
