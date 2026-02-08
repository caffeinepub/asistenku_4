import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { AlertCircle, Ticket } from 'lucide-react';

interface EscalationTicket {
  id: string;
  category: string;
  summary: string;
  relatedId: string;
  priority: string;
  createdAt: number;
}

const CATEGORIES = [
  { value: 'USER', label: 'User' },
  { value: 'SERVICE', label: 'Service (Layanan)' },
  { value: 'TASK', label: 'Task' },
  { value: 'FINANCE', label: 'Finance' },
];

const PRIORITIES = [
  { value: 'LOW', label: 'Low' },
  { value: 'NORMAL', label: 'Normal' },
  { value: 'HIGH', label: 'High' },
];

export default function CustomerServiceTicketsTab() {
  const [category, setCategory] = useState('USER');
  const [summary, setSummary] = useState('');
  const [relatedId, setRelatedId] = useState('');
  const [priority, setPriority] = useState('NORMAL');
  const [tickets, setTickets] = useState<EscalationTicket[]>([]);

  // Load tickets from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cs_escalation_tickets');
    if (stored) {
      try {
        setTickets(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load tickets:', error);
      }
    }
  }, []);

  const handleSubmit = () => {
    if (!summary.trim()) {
      toast.error('Please provide a summary');
      return;
    }

    const newTicket: EscalationTicket = {
      id: `TICKET-${Date.now()}`,
      category,
      summary: summary.trim(),
      relatedId: relatedId.trim(),
      priority,
      createdAt: Date.now(),
    };

    const updatedTickets = [newTicket, ...tickets];
    setTickets(updatedTickets);
    localStorage.setItem('cs_escalation_tickets', JSON.stringify(updatedTickets));

    // Reset form
    setCategory('USER');
    setSummary('');
    setRelatedId('');
    setPriority('NORMAL');

    toast.success('Ticket recorded (UI only)');
  };

  const getPriorityBadgeVariant = (priority: string): 'default' | 'secondary' | 'destructive' => {
    switch (priority) {
      case 'HIGH': return 'destructive';
      case 'NORMAL': return 'default';
      case 'LOW': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Tickets / Escalation</h2>
        <p className="text-muted-foreground">Create escalation tickets (UI-only, no backend)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Escalation Ticket</CardTitle>
          <CardDescription>Record issues that need escalation to other teams</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Issue Summary *</Label>
            <Textarea
              id="summary"
              placeholder="Describe the issue..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relatedId">Related ID (optional)</Label>
            <Input
              id="relatedId"
              placeholder="User ID, Service ID, Task ID, etc."
              value={relatedId}
              onChange={(e) => setRelatedId(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PRIORITIES.map((pri) => (
                  <SelectItem key={pri.value} value={pri.value}>
                    {pri.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            <Ticket className="h-4 w-4 mr-2" />
            Submit Ticket
          </Button>
        </CardContent>
      </Card>

      {tickets.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets ({tickets.length})</CardTitle>
            <CardDescription>Tickets stored locally in your browser</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{ticket.id}</span>
                        <Badge variant="outline">{ticket.category}</Badge>
                        <Badge variant={getPriorityBadgeVariant(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="text-sm">{ticket.summary}</p>
                      {ticket.relatedId && (
                        <p className="text-xs text-muted-foreground">Related: {ticket.relatedId}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(ticket.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
