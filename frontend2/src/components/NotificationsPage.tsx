import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  Bell, 
  Calendar, 
  DollarSign, 
  Users,
  CheckCircle,
  X,
  Settings,
  Filter,
  MessageCircle,
  AlertTriangle,
  UserPlus,
  Check,
  Eye,
  Crown,
  Clock,
  Mail,
  Search
} from 'lucide-react';

export function NotificationsPage() {
  const { user } = useAuth();
  const { 
    getUserNotifications, 
    getUnreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get user notifications from context
  const userNotifications = user ? getUserNotifications(user.id) : [];
  const unreadCount = user ? getUnreadCount(user.id) : 0;

  // Add some default mock notifications if none exist (for demo purposes)
  const mockNotifications = userNotifications.length === 0 ? [
    {
      id: 'mock-1',
      title: 'Welcome to the Platform',
      message: 'Welcome! Start by exploring the dashboard features.',
      type: 'info' as const,
      userId: user?.id || '',
      userRole: user?.role || '',
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      read: false,
      data: {}
    },
    {
      id: 'mock-2', 
      title: 'System Update',
      message: 'System has been updated with new features.',
      type: 'success' as const,
      userId: user?.id || '',
      userRole: user?.role || '',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
      data: {}
    }
  ] : [];

  const allNotifications = [...userNotifications, ...mockNotifications];

  // Helper function to get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'invitation': return UserPlus;
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return X;
      case 'info': 
      default: return Bell;
    }
  };

  // Helper function to get color classes for notification type
  const getNotificationColorClasses = (type: string) => {
    switch (type) {
      case 'invitation': 
        return { bg: 'bg-blue-100', text: 'text-blue-600' };
      case 'success': 
        return { bg: 'bg-green-100', text: 'text-green-600' };
      case 'warning': 
        return { bg: 'bg-orange-100', text: 'text-orange-600' };
      case 'error': 
        return { bg: 'bg-red-100', text: 'text-red-600' };
      case 'info':
      default: 
        return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  // Format time ago
  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  // Filter notifications
  const filteredNotifications = allNotifications.filter(notification => {
    if (filter === 'unread' && notification.read) return false;
    if (filter === 'invitations' && notification.type !== 'invitation') return false;
    if (searchQuery && !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !notification.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    if (user) {
      markAllAsRead(user.id);
    }
  };

  const handleInvitationAction = (notification: any, action: 'accept' | 'decline') => {
    if (notification.actions) {
      if (action === 'accept' && notification.actions.accept) {
        notification.actions.accept();
      } else if (action === 'decline' && notification.actions.decline) {
        notification.actions.decline();
      }
    }
    handleMarkAsRead(notification.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Bell className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">Stay updated with your latest activities</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{unreadCount} unread</Badge>
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Notification Tabs */}
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="invitations">
              Invitations ({allNotifications.filter(n => n.type === 'invitation').length})
            </TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-6">
            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  const colorClasses = getNotificationColorClasses(notification.type);
                  
                  return (
                    <Card 
                      key={notification.id} 
                      className={`transition-all duration-200 hover:shadow-md ${
                        !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className={`p-2 rounded-full ${colorClasses.bg}`}>
                            <IconComponent className={`h-5 w-5 ${colorClasses.text}`} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-900 mb-1">
                                  {notification.title}
                                </h3>
                                <p className="text-gray-600 mb-2">{notification.message}</p>
                                
                                {/* Custom message for invitations */}
                                {notification.type === 'invitation' && notification.data?.customMessage && (
                                  <div className="bg-gray-50 rounded-lg p-3 mb-2">
                                    <p className="text-sm text-gray-700">
                                      <strong>Personal message:</strong> "{notification.data.customMessage}"
                                    </p>
                                  </div>
                                )}

                                {/* Event details for invitations */}
                                {notification.type === 'invitation' && notification.data && (
                                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                                    <div className="text-sm space-y-1">
                                      <p><strong>Event:</strong> {notification.data.eventTitle}</p>
                                      <p><strong>Organizer:</strong> {notification.data.organizerName}</p>
                                      <p><strong>Role:</strong> {notification.data.assignedRole}</p>
                                      {notification.data.permissions && notification.data.permissions.length > 0 && (
                                        <div>
                                          <strong>Permissions:</strong>
                                          <div className="flex flex-wrap gap-1 mt-1">
                                            {notification.data.permissions.map((permission: string, index: number) => (
                                              <Badge key={index} variant="outline" className="text-xs">
                                                {permission}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-500">
                                    {formatTimeAgo(notification.timestamp)}
                                  </span>
                                  
                                  {!notification.read && (
                                    <Badge variant="outline" className="text-xs">
                                      New
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Action buttons for invitations */}
                            {notification.type === 'invitation' && !notification.read && (
                              <div className="flex items-center space-x-2 mt-3">
                                <Button 
                                  size="sm" 
                                  onClick={() => handleInvitationAction(notification, 'accept')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Accept
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleInvitationAction(notification, 'decline')}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Decline
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Mark as Read
                                </Button>
                              </div>
                            )}

                            {/* General mark as read button */}
                            {notification.type !== 'invitation' && !notification.read && (
                              <div className="mt-3">
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Mark as Read
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                    <p className="text-gray-500">
                      {filter === 'all' 
                        ? "You're all caught up! No notifications to show."
                        : `No ${filter} notifications found.`
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        {allNotifications.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{allNotifications.length}</div>
                <div className="text-sm text-gray-600">Total Notifications</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
                <div className="text-sm text-gray-600">Unread</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {allNotifications.filter(n => n.type === 'invitation').length}
                </div>
                <div className="text-sm text-gray-600">Invitations</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}