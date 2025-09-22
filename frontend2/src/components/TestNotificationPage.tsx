import React from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Bell,
  UserPlus,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

export function TestNotificationPage() {
  const { user } = useAuth();
  const { sendManagerInvitation, addNotification } = useNotifications();

  const handleSendManagerInvitation = () => {
    if (!user) return;

    sendManagerInvitation({
      managerId: 'manager-123',
      managerName: 'John Smith',
      managerEmail: 'john.smith@example.com',
      eventId: 'event-456',
      eventTitle: 'Tech Conference 2024',
      organizerId: user.id,
      organizerName: user.name || 'Current User',
      assignedRole: 'Event Manager',
      permissions: ['Manage Volunteers', 'View Reports', 'Send Notifications'],
      customMessage: 'Looking forward to working with you on this exciting event!'
    });
  };

  const handleSendSuccessNotification = () => {
    if (!user) return;

    addNotification({
      title: 'Event Created Successfully',
      message: 'Your new event "Tech Conference 2024" has been created and published.',
      type: 'success',
      userId: user.id,
      userRole: user.role,
    });
  };

  const handleSendWarningNotification = () => {
    if (!user) return;

    addNotification({
      title: 'Low Ticket Availability',
      message: 'Only 5 tickets remaining for your upcoming event.',
      type: 'warning',
      userId: user.id,
      userRole: user.role,
    });
  };

  const handleSendInfoNotification = () => {
    if (!user) return;

    addNotification({
      title: 'System Update',
      message: 'New features have been added to your dashboard.',
      type: 'info',
      userId: user.id,
      userRole: user.role,
    });
  };

  if (!user) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <p>Please log in to test notifications.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Notification System</h1>
        <p className="text-gray-600">Test different types of notifications to see how they appear.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manager Invitation Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="h-5 w-5 mr-2 text-blue-600" />
              Manager Invitation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Test sending a manager invitation notification. This simulates what happens when an organizer invites a manager to help with an event.
            </p>
            <Button onClick={handleSendManagerInvitation} className="w-full">
              Send Manager Invitation
            </Button>
          </CardContent>
        </Card>

        {/* Success Notification Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Success Notification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Test a success notification for when something completes successfully.
            </p>
            <Button onClick={handleSendSuccessNotification} className="w-full bg-green-600 hover:bg-green-700">
              Send Success Notification
            </Button>
          </CardContent>
        </Card>

        {/* Warning Notification Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
              Warning Notification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Test a warning notification for important alerts that need attention.
            </p>
            <Button onClick={handleSendWarningNotification} className="w-full bg-orange-600 hover:bg-orange-700">
              Send Warning Notification
            </Button>
          </CardContent>
        </Card>

        {/* Info Notification Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-600" />
              Info Notification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Test an informational notification for general updates and news.
            </p>
            <Button onClick={handleSendInfoNotification} className="w-full bg-blue-600 hover:bg-blue-700">
              Send Info Notification
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How to Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Badge variant="outline">1</Badge>
              <p>Click any of the buttons above to generate test notifications</p>
            </div>
            <div className="flex items-start space-x-3">
              <Badge variant="outline">2</Badge>
              <p>Check the bell icon in the top navigation bar for notification count</p>
            </div>
            <div className="flex items-start space-x-3">
              <Badge variant="outline">3</Badge>
              <p>Click the bell icon or go to Notifications page to view them</p>
            </div>
            <div className="flex items-start space-x-3">
              <Badge variant="outline">4</Badge>
              <p>For manager invitations, you can accept/decline from the notifications page</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}