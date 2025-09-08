import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  AlertTriangle
} from 'lucide-react';

export function NotificationsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'event',
      title: 'New Event Registration',
      message: 'Sarah Wilson registered for Tech Conference 2024',
      time: '2 minutes ago',
      read: false,
      priority: 'normal',
      icon: Calendar,
      color: 'blue'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      message: 'Received $2,500 payment for catering services',
      time: '1 hour ago',
      read: false,
      priority: 'high',
      icon: DollarSign,
      color: 'green'
    },
    {
      id: 3,
      type: 'system',
      title: 'Event Approval Required',
      message: 'International Tech Summit requires your approval',
      time: '3 hours ago',
      read: false,
      priority: 'high',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      id: 4,
      type: 'message',
      title: 'New Message',
      message: 'You have a new message from John Doe regarding venue booking',
      time: '5 hours ago',
      read: true,
      priority: 'normal',
      icon: MessageCircle,
      color: 'purple'
    },
    {
      id: 5,
      type: 'event',
      title: 'Event Reminder',
      message: 'Music Festival starts in 2 days - 450 attendees registered',
      time: '1 day ago',
      read: true,
      priority: 'normal',
      icon: Calendar,
      color: 'blue'
    },
    {
      id: 6,
      type: 'user',
      title: 'New Vendor Application',
      message: 'Premium Catering Services submitted vendor application',
      time: '2 days ago',
      read: true,
      priority: 'normal',
      icon: Users,
      color: 'indigo'
    },
    {
      id: 7,
      type: 'payment',
      title: 'Payment Failed',
      message: 'Payment for Art Workshop registration failed - retry required',
      time: '3 days ago',
      read: true,
      priority: 'high',
      icon: DollarSign,
      color: 'red'
    },
    {
      id: 8,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance completed successfully',
      time: '1 week ago',
      read: true,
      priority: 'low',
      icon: Settings,
      color: 'gray'
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      red: 'bg-red-100 text-red-600',
      gray: 'bg-gray-100 text-gray-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings size={16} className="mr-2" />
            Settings
          </Button>
          <Button variant="outline">Mark All Read</Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Card>
        <CardContent className="p-4">
          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="payment">Payments</TabsTrigger>
              <TabsTrigger value="message">Messages</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <Card key={notification.id} className={`transition-all hover:shadow-md ${
              !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${getColorClasses(notification.color)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(notification.priority)} variant="secondary">
                          {notification.priority}
                        </Badge>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{notification.time}</span>
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <Button size="sm" variant="outline">
                            <CheckCircle size={14} className="mr-1" />
                            Mark Read
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You're all caught up! No notifications to display."
                : `No ${filter === 'unread' ? 'unread' : filter} notifications found.`
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Push Notifications</h4>
                <p className="text-sm text-gray-600">Receive browser push notifications</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                <p className="text-sm text-gray-600">Receive important notifications via SMS</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}