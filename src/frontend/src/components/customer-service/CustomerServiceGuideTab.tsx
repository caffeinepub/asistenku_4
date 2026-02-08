import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Users, Briefcase, CheckCircle, AlertTriangle } from 'lucide-react';

export default function CustomerServiceGuideTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Customer Service Guide</h2>
        <p className="text-muted-foreground">Instructions and escalation procedures</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This guide provides instructions for common CS tasks and escalation procedures.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <CardTitle>How to Check User Status</CardTitle>
          </div>
          <CardDescription>Steps to verify user account status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Navigate to <strong>User Management</strong> tab</li>
            <li>Use the search bar to find user by ID, Principal ID, or Name</li>
            <li>Click on the user card to view detailed information</li>
            <li>Check the status badge (Active, Pending, Suspended, Blacklisted)</li>
            <li>Review user data and copy ID/Principal ID if needed for escalation</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-purple-600" />
            <CardTitle>How to Check Active Client Services</CardTitle>
          </div>
          <CardDescription>Steps to verify client service status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Navigate to <strong>Service Management</strong> tab</li>
            <li>Use the search bar to find services by Service ID or Client ID</li>
            <li>Review service details including availability and status</li>
            <li>Check service quantity and category information</li>
            <li>Note the Service ID for escalation if needed</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <CardTitle>How to Check Task Status</CardTitle>
          </div>
          <CardDescription>Steps to monitor task progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Navigate to <strong>Task Management</strong> tab</li>
            <li>Search by Task ID in the search bar</li>
            <li>Use status filters to view tasks by status (Requested, In Progress, QA, Completed, Rejected/Cancelled)</li>
            <li>Click on a task card to view full details</li>
            <li>Review task information including deadlines, request type, and assigned partner</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <CardTitle>Escalation Flow</CardTitle>
          </div>
          <CardDescription>When and how to escalate issues</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Escalate to:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-medium min-w-[120px]">Admin:</span>
                <span className="text-muted-foreground">User account issues, access problems, general system issues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium min-w-[120px]">Asistenmu:</span>
                <span className="text-muted-foreground">Task assignment issues, client service requests, delegation problems</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium min-w-[120px]">Finance:</span>
                <span className="text-muted-foreground">Payment issues, withdrawal requests, billing questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium min-w-[120px]">Superadmin:</span>
                <span className="text-muted-foreground">Critical system issues, partner management, high-priority escalations</span>
              </li>
            </ul>
          </div>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Use the <strong>Tickets / Escalation</strong> tab to create escalation tickets with all relevant information.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
