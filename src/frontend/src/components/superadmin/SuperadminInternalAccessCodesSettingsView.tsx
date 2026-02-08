import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Save } from 'lucide-react';
import { useGetAccessCodes, useUpdateAccessCode } from '@/hooks/useInternalAccessCodes';
import { InternalCodeType } from '@/backend';
import { toast } from 'sonner';

export default function SuperadminInternalAccessCodesSettingsView() {
    const { data: codes, isLoading, error } = useGetAccessCodes();
    const updateMutation = useUpdateAccessCode();

    const [codeAValue, setCodeAValue] = useState('');
    const [codeBValue, setCodeBValue] = useState('');

    // Initialize form values when data loads
    useEffect(() => {
        if (codes) {
            const codeA = codes.find(c => c.codeType === InternalCodeType.codeA);
            const codeB = codes.find(c => c.codeType === InternalCodeType.codeB);
            
            if (codeA) setCodeAValue(codeA.code);
            if (codeB) setCodeBValue(codeB.code);
        }
    }, [codes]);

    const handleSaveCodeA = async () => {
        if (!codeAValue.trim()) {
            toast.error('Code A cannot be empty');
            return;
        }

        try {
            await updateMutation.mutateAsync({
                codeType: InternalCodeType.codeA,
                newCode: codeAValue.trim(),
            });
            toast.success('Code A updated successfully');
        } catch (err: any) {
            console.error('Failed to update Code A:', err);
            toast.error('Failed to update Code A');
        }
    };

    const handleSaveCodeB = async () => {
        if (!codeBValue.trim()) {
            toast.error('Code B cannot be empty');
            return;
        }

        try {
            await updateMutation.mutateAsync({
                codeType: InternalCodeType.codeB,
                newCode: codeBValue.trim(),
            });
            toast.success('Code B updated successfully');
        } catch (err: any) {
            console.error('Failed to update Code B:', err);
            toast.error('Failed to update Code B');
        }
    };

    const formatTimestamp = (timestamp: bigint) => {
        const date = new Date(Number(timestamp) / 1_000_000);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Internal Access Codes</CardTitle>
                    <CardDescription>Manage internal access codes for login and registration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Internal Access Codes</CardTitle>
                    <CardDescription>Manage internal access codes for login and registration</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Failed to load access codes. Please try again.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    const codeA = codes?.find(c => c.codeType === InternalCodeType.codeA);
    const codeB = codes?.find(c => c.codeType === InternalCodeType.codeB);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Internal Access Codes</CardTitle>
                <CardDescription>Manage internal access codes for login and registration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Code A - Login */}
                <div className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-sm">Code A - Asistenku masuk</h3>
                            <p className="text-xs text-muted-foreground">Routes to /internal/login</p>
                        </div>
                        {codeA && (
                            <div className="text-xs text-muted-foreground">
                                Last updated: {formatTimestamp(codeA.lastUpdated)}
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="codeA">Code Value</Label>
                        <div className="flex gap-2">
                            <Input
                                id="codeA"
                                type="text"
                                value={codeAValue}
                                onChange={(e) => setCodeAValue(e.target.value)}
                                placeholder="Enter Code A"
                            />
                            <Button
                                onClick={handleSaveCodeA}
                                disabled={updateMutation.isPending}
                                size="sm"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Save
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium">Status:</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded">
                            Active
                        </span>
                    </div>
                </div>

                {/* Code B - Register */}
                <div className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-sm">Code B - Asistenku daftar</h3>
                            <p className="text-xs text-muted-foreground">Routes to /internal/daftar</p>
                        </div>
                        {codeB && (
                            <div className="text-xs text-muted-foreground">
                                Last updated: {formatTimestamp(codeB.lastUpdated)}
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="codeB">Code Value</Label>
                        <div className="flex gap-2">
                            <Input
                                id="codeB"
                                type="text"
                                value={codeBValue}
                                onChange={(e) => setCodeBValue(e.target.value)}
                                placeholder="Enter Code B"
                            />
                            <Button
                                onClick={handleSaveCodeB}
                                disabled={updateMutation.isPending}
                                size="sm"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Save
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium">Status:</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded">
                            Active
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
