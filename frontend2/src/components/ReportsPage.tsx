import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  BarChart3, 
  Download, 
  Filter,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Star,
  FileText
} from 'lucide-react';

export function ReportsPage() {
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('30d');
  const [reportType, setReportType] = useState('overview');

  const isManagerOrAdmin = user?.role === 'manager' || user?.role === 'admin';
  const isOrganizerOrAbove = user?.role === 'organizer' || user?.role === 'manager' || user?.role === 'admin';

  const overviewStats = [
    { label: 'Total Events', value: '156', change: '+12%', icon: Calendar, trend: 'up' },
    { label: 'Total Attendees', value: '12,847', change: '+8%', icon: Users, trend: 'up' },
    { label: 'Revenue Generated', value: '$284,590', change: '+15%', icon: DollarSign, trend: 'up' },
    { label: 'Average Rating', value: '4.7', change: '+0.2', icon: Star, trend: 'up' }
  ];

  const eventPerformance = [
    {
      event: 'Tech Conference 2024',
      registrations: 245,
      capacity: 300,
      revenue: 12250,
      rating: 4.8,
      status: 'active'
    },
    {
      event: 'Music Festival',
      registrations: 450,
      capacity: 500,
      revenue: 33750,
      rating: 4.9,
      status: 'active'
    },
    {
      event: 'Career Fair',
      registrations: 128,
      capacity: 200,
      revenue: 0,
      rating: 4.6,
      status: 'completed'
    },
    {
      event: 'Art Workshop',
      registrations: 15,
      capacity: 20,
      revenue: 1800,
      rating: 4.7,
      status: 'active'
    }
  ];

  const userEngagement = [
    { metric: 'New Registrations', thisMonth: 1240, lastMonth: 1108, change: '+11.9%' },
    { metric: 'Repeat Attendees', thisMonth: 340, lastMonth: 298, change: '+14.1%' },
    { metric: 'Event Views', thisMonth: 5680, lastMonth: 5201, change: '+9.2%' },
    { metric: 'Average Session Duration', thisMonth: '8m 32s', lastMonth: '7m 45s', change: '+10.1%' }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Monthly Event Summary - March 2024',
      type: 'Event Performance',
      generatedBy: 'System',
      date: '2024-03-01',
      status: 'ready'
    },
    {
      id: 2,
      title: 'User Engagement Analysis - Q1 2024',
      type: 'User Analytics',
      generatedBy: 'Admin Team',
      date: '2024-02-28',
      status: 'ready'
    },
    {
      id: 3,
      title: 'Revenue Report - February 2024',
      type: 'Financial',
      generatedBy: 'Finance Team',
      date: '2024-02-15',
      status: 'ready'
    },
    {
      id: 4,
      title: 'Vendor Performance Review',
      type: 'Vendor Analytics',
      generatedBy: 'Manager',
      date: '2024-02-10',
      status: 'processing'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOrganizerOrAbove) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <FileText size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600">Reports are only available to organizers, managers, and administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download size={16} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last period
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList>
          <TabsTrigger value="events">Event Performance</TabsTrigger>
          <TabsTrigger value="users">User Engagement</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          {isManagerOrAdmin && <TabsTrigger value="system">System Health</TabsTrigger>}
        </TabsList>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventPerformance.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{event.event}</h3>
                        <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                          {event.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Registrations</p>
                          <p className="font-medium">{event.registrations}/{event.capacity}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Fill Rate</p>
                          <p className="font-medium">{((event.registrations / event.capacity) * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Revenue</p>
                          <p className="font-medium">${event.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rating</p>
                          <p className="font-medium flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            {event.rating}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userEngagement.map((metric, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{metric.metric}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{metric.thisMonth}</p>
                        <p className="text-sm text-gray-600">This month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg text-gray-600">{metric.lastMonth}</p>
                        <p className="text-sm text-green-600">{metric.change}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center">
                  <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Financial charts and graphs would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {isManagerOrAdmin && (
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Server Uptime</h3>
                    <p className="text-2xl font-bold text-green-600">99.9%</p>
                    <p className="text-sm text-gray-600">Last 30 days</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Active Users</h3>
                    <p className="text-2xl font-bold text-blue-600">1,847</p>
                    <p className="text-sm text-gray-600">Currently online</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">API Response</h3>
                    <p className="text-2xl font-bold text-purple-600">142ms</p>
                    <p className="text-sm text-gray-600">Average response time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600">{report.type} • Generated by {report.generatedBy} • {report.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                  {report.status === 'ready' && (
                    <Button variant="outline" size="sm">
                      <Download size={14} className="mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}