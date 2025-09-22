import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { 
  Bell, 
  Send,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Mail,
  MessageSquare,
  Smartphone,
  Globe,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Settings,
  Filter
} from 'lucide-react';

export function AdminNotificationManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const notificationStats = [
    { label: 'Total Sent Today', value: '2,847', change: '+18.5%', color: 'blue' },
    { label: 'Email Delivered', value: '2,234', change: '+15.2%', color: 'green' },
    { label: 'Push Notifications', value: '1,456', change: '+22.1%', color: 'purple' },
    { label: 'Failed Deliveries', value: '23', change: '-12.3%', color: 'red' }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Event Approval Required',
      message: 'New event "Tech Summit 2024" requires your approval',
      type: 'system',
      recipient: 'admins',
      recipientCount: 5,
      channel: 'email',
      status: 'sent',
      sentDate: '2024-03-10 14:30:00',
      deliveredCount: 5,
      openedCount: 3,
      clickedCount: 2,
      priority: 'high',
      template: 'event_approval'
    },
    {
      id: 2,
      title: 'Welcome to EventHub!',
      message: 'Thank you for joining our platform. Get started by exploring events.',
      type: 'user',
      recipient: 'new_users',
      recipientCount: 45,
      channel: 'email',
      status: 'sent',
      sentDate: '2024-03-10 12:00:00',
      deliveredCount: 43,
      openedCount: 28,
      clickedCount: 15,
      priority: 'medium',
      template: 'welcome_user'
    },
    {
      id: 3,
      title: 'Event Reminder',
      message: 'Your registered event "Digital Workshop" starts in 24 hours',
      type: 'reminder',
      recipient: 'event_attendees',
      recipientCount: 156,
      channel: 'push',
      status: 'scheduled',
      scheduledDate: '2024-03-11 09:00:00',
      priority: 'medium',
      template: 'event_reminder'
    },
    {
      id: 4,
      title: 'Payment Confirmation',
      message: 'Payment of $299 received for Tech Summit 2024 registration',
      type: 'payment',
      recipient: 'individual',
      recipientCount: 1,
      channel: 'sms',
      status: 'delivered',
      sentDate: '2024-03-10 10:15:00',
      deliveredCount: 1,
      priority: 'high',
      template: 'payment_confirmation'
    },
    {
      id: 5,
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance on March 15th from 2:00 AM to 4:00 AM',
      type: 'system',
      recipient: 'all_users',
      recipientCount: 2847,
      channel: 'push',
      status: 'failed',
      sentDate: '2024-03-09 18:00:00',
      failureReason: 'Push service temporarily unavailable',
      priority: 'low',
      template: 'maintenance_notice'
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Event Approval',
      subject: 'Event Approval Required: {{event_title}}',
      content: 'A new event "{{event_title}}" by {{organizer}} requires your approval.',
      type: 'system',
      variables: ['event_title', 'organizer', 'event_date', 'approval_url'],
      isActive: true
    },
    {
      id: 2,
      name: 'Welcome Email',
      subject: 'Welcome to EventHub, {{user_name}}!',
      content: 'Welcome {{user_name}}! Thank you for joining our platform.',
      type: 'user',
      variables: ['user_name', 'dashboard_url', 'support_email'],
      isActive: true
    },
    {
      id: 3,
      name: 'Event Reminder',
      subject: 'Reminder: {{event_title}} starts {{time_until}}',
      content: 'Don\'t forget! Your event "{{event_title}}" starts {{time_until}}.',
      type: 'reminder',
      variables: ['event_title', 'event_date', 'event_location', 'event_url'],
      isActive: true
    },
    {
      id: 4,
      name: 'Payment Confirmation',
      subject: 'Payment Confirmed - {{amount}}',
      content: 'Your payment of {{amount}} for {{event_title}} has been confirmed.',
      type: 'payment',
      variables: ['amount', 'event_title', 'transaction_id', 'receipt_url'],
      isActive: true
    }
  ];

  const scheduledNotifications = [
    {
      id: 1,
      title: 'Event Reminder - Tech Summit',
      scheduledDate: '2024-03-11 09:00:00',
      recipients: 387,
      type: 'reminder',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Weekly Newsletter',
      scheduledDate: '2024-03-11 08:00:00',
      recipients: 2847,
      type: 'newsletter',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Vendor Payment Due',
      scheduledDate: '2024-03-12 10:00:00',
      recipients: 23,
      type: 'payment',
      status: 'pending'
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || notification.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      system: 'bg-purple-100 text-purple-800',
      user: 'bg-blue-100 text-blue-800',
      reminder: 'bg-yellow-100 text-yellow-800',
      payment: 'bg-green-100 text-green-800',
      newsletter: 'bg-indigo-100 text-indigo-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'push': return <Bell className="h-4 w-4" />;
      case 'sms': return <Smartphone className="h-4 w-4" />;
      case 'in_app': return <MessageSquare className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': 
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'scheduled': 
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const CreateNotificationModal = () => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create New Notification</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Notification title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="reminder">Reminder</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="newsletter">Newsletter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Notification message" rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipients">Recipients</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select recipients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_users">All Users</SelectItem>
                <SelectItem value="students">Students</SelectItem>
                <SelectItem value="organizers">Organizers</SelectItem>
                <SelectItem value="vendors">Vendors</SelectItem>
                <SelectItem value="managers">Managers</SelectItem>
                <SelectItem value="admins">Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="channel">Channel</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="push">Push Notification</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="in_app">In-App</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Send timing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="now">Send Now</SelectItem>
                <SelectItem value="schedule">Schedule for Later</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button>Send Notification</Button>
          <Button variant="outline">Save as Draft</Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>Notification Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Notification
              </Button>
            </DialogTrigger>
            <CreateNotificationModal />
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {notificationStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Bell className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p>{stat.value}</p>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} today
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div>
                          <p>{notification.title}</p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">
                            {notification.message}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          {notification.recipientCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getChannelIcon(notification.channel)}
                          <span className="ml-2">{notification.channel}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getStatusIcon(notification.status)}
                          <Badge className={`${getStatusColor(notification.status)} ml-2`}>
                            {notification.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {notification.sentDate || notification.scheduledDate}
                      </TableCell>
                      <TableCell>
                        {notification.deliveredCount !== undefined && (
                          <div className="text-sm">
                            <p>Delivered: {notification.deliveredCount}</p>
                            {notification.openedCount && (
                              <p>Opened: {notification.openedCount}</p>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3>{template.name}</h3>
                          <Badge className={getTypeColor(template.type)}>
                            {template.type}
                          </Badge>
                        </div>
                        <Switch checked={template.isActive} />
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">Subject:</p>
                        <p className="text-sm bg-gray-50 p-2 rounded">{template.subject}</p>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">Content:</p>
                        <p className="text-sm bg-gray-50 p-2 rounded">{template.content}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Variables:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.variables.map((variable) => (
                            <Badge key={variable} variant="outline" className="text-xs">
                              {variable}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          Test
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scheduled Tab */}
        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>{notification.title}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{notification.scheduledDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          {notification.recipients}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(notification.status)}>
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Enable email notifications</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailRate">Rate Limit (emails/hour)</Label>
                  <Input id="emailRate" type="number" defaultValue="1000" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailRetry">Retry Failed Emails</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 retry</SelectItem>
                      <SelectItem value="3">3 retries</SelectItem>
                      <SelectItem value="5">5 retries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Enable push notifications</p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pushRate">Rate Limit (push/minute)</Label>
                  <Input id="pushRate" type="number" defaultValue="100" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Badge Updates</Label>
                    <p className="text-sm text-gray-600">Update app badge counts</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Enable SMS notifications</p>
                  </div>
                  <Switch checked={false} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smsProvider">SMS Provider</Label>
                  <Select defaultValue="twilio">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="aws">AWS SNS</SelectItem>
                      <SelectItem value="nexmo">Nexmo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Default Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultPriority">Default Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultChannel">Default Channel</Label>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="push">Push Notification</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="in_app">In-App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-retry Failed</Label>
                    <p className="text-sm text-gray-600">Automatically retry failed notifications</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}