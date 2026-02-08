import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface TruncatedPrincipalCellProps {
  principalId: string;
}

export default function TruncatedPrincipalCell({ principalId }: TruncatedPrincipalCellProps) {
  const [copied, setCopied] = useState(false);

  const truncated = principalId.length > 20 
    ? `${principalId.slice(0, 10)}...${principalId.slice(-10)}`
    : principalId;

  const handleCopy = async () => {
    if (!principalId) {
      toast.error('No value to copy');
      return;
    }

    try {
      await navigator.clipboard.writeText(principalId);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-mono">{truncated}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </Button>
    </div>
  );
}
