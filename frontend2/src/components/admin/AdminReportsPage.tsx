import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target
} from 'lucide-react';

export function AdminReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data for charts
  const monthlyStats = [
    { month: 'Jan', users: 234, events: 12, revenue: 45000, attendance: 2100 },
    { month: 'Feb', users: 287, events: 15, revenue: 52000, attendance: 2650 },
    { month: 'Mar', users: 321, events: 18, revenue: 68000, attendance: 3200 },
    { month: 'Apr', users: 345, events: 22, revenue: 78000, attendance: 3800 },
    { month: 'May', users: 412, events: 25, revenue: 89000, attendance: 4200 },
    { month: 'Jun', users: 456, events: 28, revenue: 95000, attendance: 4650 }
  ];

  const eventCategories = [
    { name: 'Technology', value: 45, count: 45, revenue: 245000 },
    { name: 'Business', value: 25, count: 25, revenue: 180000 },
    { name: 'Healthcare', value: 15, count: 15, revenue: 120000 },
    { name: 'Arts', value: 10, count: 10, revenue: 85000 },
    { name: 'Education', value: 5, count: 5, revenue: 45000 }
  ];

  const userRoleDistribution = [
    { name: 'Students', value: 65, count: 1850, color: '#3B82F6' },
    { name: 'Organizers', value: 15, count: 427, color: '#10B981' },
    { name: 'Vendors', value: 12, count: 342, color: '#F59E0B' },
    { name: 'Managers', value: 6, count: 171, color: '#8B5CF6' },
    { name: 'Admins', value: 2, count: 57, color: '#EF4444' }
  ];

  const topEvents = [
    { name: 'Tech Summit 2024', attendees: 850, revenue: 127500, rating: 4.9, organizer: 'TechCorp' },
    { name: 'Digital Marketing Expo', attendees: 650, revenue: 97500, rating: 4.8, organizer: 'MarketPro' },
    { name: 'Healthcare Innovation', attendees: 450, revenue: 89100, rating: 4.7, organizer: 'MedTech' },
    { name: 'Art & Culture Festival', attendees: 1200, revenue: 72000, rating: 4.6, organizer: 'ArtSociety' },
    { name: 'Business Leadership', attendees: 300, revenue: 59700, rating: 4.8, organizer: 'BizLeaders' }
  ];

  const performanceMetrics = [
    { metric: 'User Retention Rate', current: 87, previous: 82, target: 90, status: 'improving' },
    { metric: 'Event Success Rate', current: 94, previous: 91, target: 95, status: 'improving' },
    { metric: 'Revenue Growth', current: 23, previous: 18, target: 25, status: 'improving' },
    { metric: 'Customer Satisfaction', current: 4.7, previous: 4.5, target: 4.8, status: 'improving' },
    { metric: 'Average Event Capacity', current: 76, previous: 71, target: 80, status: 'improving' },
    { metric: 'Vendor Satisfaction', current: 4.3, previous: 4.2, target: 4.5, status: 'stable' }
  ];

  const recentTransactions = [
    { id: 1, event: 'Tech Summit 2024', amount: 25500, type: 'registration', date: '2024-03-10' },
    { id: 2, event: 'Marketing Workshop', amount: 8950, type: 'vendor_payment', date: '2024-03-09' },
    { id: 3, event: 'Art Festival', amount: 12750, type: 'registration', date: '2024-03-08' },
    { id: 4, event: 'Healthcare Conf', amount: 18200, type: 'sponsorship', date: '2024-03-07' },
    { id: 5, event: 'Business Summit', amount: 6800, type: 'vendor_payment', date: '2024-03-06' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'improving': return 'text-green-600';
      case 'declining': return 'text-red-600';
      case 'stable': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'improving': return '↗️';
      case 'declining': return '↘️';
      case 'stable': return '→';
      default: return '';
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>Analytics & Reports</h1>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p>2,847</p>
                    <p className="text-xs text-green-600">+12% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Active Events</p>
                    <p>156</p>
                    <p className="text-xs text-green-600">+8% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p>$427,300</p>
                    <p className="text-xs text-green-600">+23% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Growth Rate</p>
                    <p>18.5%</p>
                    <p className="text-xs text-green-600">+2.1% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="events" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Categories Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={eventCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {eventCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Role Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRoleDistribution.map((role, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: role.color }}
                        ></div>
                        <span>{role.name}</span>
                      </div>
                      <div className="text-right">
                        <p>{role.count}</p>
                        <p className="text-sm text-gray-600">{role.value}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topEvents.map((event, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3>{event.name}</h3>
                          <p className="text-sm text-gray-600">by {event.organizer}</p>
                        </div>
                        <Badge variant="outline">{event.rating}/5.0</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Attendees: </span>
                          <span>{event.attendees}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Revenue: </span>
                          <span>${event.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event & Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="events" fill="#10B981" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3>{transaction.event}</h3>
                          <p className="text-sm text-gray-600">{transaction.type}</p>
                        </div>
                        <div className="text-right">
                          <p>${transaction.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm">{metric.metric}</h3>
                        <span className={getStatusColor(metric.status)}>
                          {getStatusIcon(metric.status)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Current</span>
                          <span>{metric.current}{metric.metric.includes('Rate') || metric.metric.includes('Growth') || metric.metric.includes('Capacity') ? '%' : ''}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Previous</span>
                          <span className="text-sm">{metric.previous}{metric.metric.includes('Rate') || metric.metric.includes('Growth') || metric.metric.includes('Capacity') ? '%' : ''}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Target</span>
                          <span className="text-sm">{metric.target}{metric.metric.includes('Rate') || metric.metric.includes('Growth') || metric.metric.includes('Capacity') ? '%' : ''}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${(metric.current / metric.target) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}