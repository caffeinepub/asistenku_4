import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

interface LockedPanelProps {
    title: string;
    description: string;
}

export default function LockedPanel({ title, description }: LockedPanelProps) {
    return (
        <Card className="border-dashed opacity-60">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>{title}</CardTitle>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">This feature is currently unavailable.</p>
            </CardContent>
        </Card>
    );
}
