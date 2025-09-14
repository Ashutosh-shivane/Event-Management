import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  BarChart3
} from 'lucide-react';

export function AdminDashboard() {
  const navigate = useNavigate();
  const systemStats = [
    { label: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Active Events', value: '156', change: '+8%', icon: Calendar, color: 'green' },
    { label: 'Total Revenue', value: '$284,590', change: '+15%', icon: DollarSign, color: 'yellow' },
    { label: 'System Health', value: '98.5%', change: '+0.2%', icon: TrendingUp, color: 'purple' }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'event',
      title: 'International Tech Summit',
      organizer: 'TechCorp Inc.',
      status: 'pending',
      date: '2024-04-15',
      attendees: 500,
      priority: 'high'
    },
    {
      id: 2,
      type: 'vendor',
      title: 'Premium Catering Services',
      organizer: 'Gourmet Solutions',
      status: 'review',
      date: '2024-03-20',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'user',
      title: 'Event Manager Role Request',
      organizer: 'John Smith',
      status: 'pending',
      date: '2024-03-18',
      priority: 'low'
    }
  ];

  const recentActivities = [
    { type: 'approval', message: 'Tech Conference 2024 approved', time: '2 hours ago', status: 'success' },
    { type: 'registration', message: '25 new user registrations', time: '4 hours ago', status: 'info' },
    { type: 'payment', message: 'Payment dispute resolved', time: '6 hours ago', status: 'success' },
    { type: 'issue', message: 'Event cancelled due to venue issues', time: '1 day ago', status: 'warning' },
    { type: 'system', message: 'System maintenance completed', time: '2 days ago', status: 'success' }
  ];

  const userGrowth = [
    { month: 'Jan', students: 120, organizers: 15, vendors: 8, managers: 5 },
    { month: 'Feb', students: 145, organizers: 18, vendors: 12, managers: 7 },
    { month: 'Mar', students: 180, organizers: 22, vendors: 15, managers: 9 }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string, status: string) => {
    if (status === 'success') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'warning') return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <TrendingUp className="h-4 w-4 text-blue-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline">System Settings</Button>
          <Button>Generate Report</Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change} from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">by {item.organizer}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                      <Badge variant="outline">{item.type}</Badge>
                    </div>
                  </div>
                  
                  {item.attendees && (
                    <p className="text-sm text-gray-600 mb-3">Expected attendees: {item.attendees}</p>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle size={14} className="mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                      <XCircle size={14} className="mr-1" />
                      Reject
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye size={14} className="mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userGrowth.map((month, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">{month.month} 2024</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Students</span>
                      <span className="font-medium">{month.students}</span>
                    </div>
                    <Progress value={(month.students / 200) * 100} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Organizers</span>
                      <span className="font-medium">{month.organizers}</span>
                    </div>
                    <Progress value={(month.organizers / 30) * 100} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Vendors</span>
                      <span className="font-medium">{month.vendors}</span>
                    </div>
                    <Progress value={(month.vendors / 20) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Server Uptime</span>
                <span className="font-semibold text-green-600">99.9%</span>
              </div>
              <Progress value={99.9} className="h-3" />
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Database Performance</span>
                <span className="font-semibold text-blue-600">98.5%</span>
              </div>
              <Progress value={98.5} className="h-3" />
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">API Response Time</span>
                <span className="font-semibold text-yellow-600">95.2%</span>
              </div>
              <Progress value={95.2} className="h-3" />
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Gateway</span>
                <span className="font-semibold text-green-600">100%</span>
              </div>
              <Progress value={100} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/users')}
              >
                <Users size={20} className="mb-2" />
                User Management
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/events')}
              >
                <Calendar size={20} className="mb-2" />
                Event Oversight
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/reports')}
              >
                <BarChart3 size={20} className="mb-2" />
                Analytics
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/notifications')}
              >
                <AlertTriangle size={20} className="mb-2" />
                System Alerts
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/test-navigation')}
              >
                <Eye size={20} className="mb-2" />
                Test Routes
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/project-status')}
              >
                <CheckCircle size={20} className="mb-2" />
                Project Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 py-2">
                {getActivityIcon(activity.type, activity.status)}
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}