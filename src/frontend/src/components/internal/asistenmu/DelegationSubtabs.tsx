import { Button } from '@/components/ui/button';

interface DelegationSubtabsProps {
  value: 'incoming' | 'create';
  onChange: (value: 'incoming' | 'create') => void;
}

export default function DelegationSubtabs({ value, onChange }: DelegationSubtabsProps) {
  return (
    <div className="flex gap-2 border-b">
      <Button
        variant={value === 'incoming' ? 'default' : 'ghost'}
        onClick={() => onChange('incoming')}
        className="rounded-b-none"
      >
        Incoming Requests
      </Button>
      <Button
        variant={value === 'create' ? 'default' : 'ghost'}
        onClick={() => onChange('create')}
        className="rounded-b-none"
      >
        Create Delegation
      </Button>
    </div>
  );
}
