import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DelegationSubtabs from './DelegationSubtabs';
import IncomingRequestsTab from './IncomingRequestsTab';
import CreateDelegationTab from './CreateDelegationTab';

type SubtabValue = 'incoming' | 'create';

export default function AsistenmuDelegationView() {
  const [activeSubtab, setActiveSubtab] = useState<SubtabValue>('incoming');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Delegation</CardTitle>
          <CardDescription>Manage task delegation to partners</CardDescription>
        </CardHeader>
        <CardContent>
          <DelegationSubtabs value={activeSubtab} onChange={setActiveSubtab} />
          
          <div className="mt-6">
            {activeSubtab === 'incoming' && <IncomingRequestsTab />}
            {activeSubtab === 'create' && <CreateDelegationTab />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
