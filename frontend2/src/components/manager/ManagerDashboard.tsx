import React from 'react';
import { useAuth } from '../AuthContext';
import { PageType } from '../../App';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  UserCheck,
  Building,
  Plus,
  User,
  AlertCircle
} from 'lucide-react';

interface ManagerDashboardProps {
  onNavigate: (page: PageType) => void;
  onEventSelect: (eventId: string) => void;
  onPageChange?: (page: string) => void;
}

export function ManagerDashboard({ onNavigate, onEventSelect, onPageChange }: ManagerDashboardProps) {
  const { user } = useAuth();

  const assignedEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      organizer: 'John Doe',
      status: 'in-progress',
      progress: 75,
      volunteers: 12,
      vendors: 5,
      date: '2024-03-15',
      tasks: { completed: 8, total: 12 }
    },
    {
      id: 2,
      title: 'Music Festival',
      organizer: 'Jane Smith',
      status: 'planning',
      progress: 45,
      volunteers: 0,
      vendors: 2,
      date: '2024-03-20',
      tasks: { completed: 3, total: 8 }
    },
    {
      id: 3,
      title: 'Career Fair',
      organizer: 'Mike Johnson',
      status: 'approved',
      progress: 90,
      volunteers: 8,
      vendors: 3,
      date: '2024-03-25',
      tasks: { completed: 10, total: 11 }
    }
  ];

  const pendingApprovals = [
    { id: 1, type: 'vendor', name: 'Catering Solutions Inc.', event: 'Tech Conference 2024', amount: '$2,500' },
    { id: 2, type: 'volunteer', name: 'Sarah Wilson', event: 'Music Festival', role: 'Registration Assistant' },
    { id: 3, type: 'budget', name: 'Audio Equipment', event: 'Career Fair', amount: '$1,200' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
        <div className="flex space-x-3">
          <Button 
            onClick={() => onNavigate('add-event')}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Event</span>
          </Button>
          <Button variant="outline">View All Events</Button>
        </div>
      </div>

      {/* Profile Completion Alert */}
      {!user?.profileCompleted && user?.role === 'manager' && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <strong className="text-orange-800">Complete your manager profile</strong>
              <p className="text-orange-700 mt-1">
                Help us understand your management expertise and connect you with suitable teams and opportunities.
              </p>
            </div>
            <Button 
              size="sm" 
              className="ml-4 bg-orange-600 hover:bg-orange-700"
              onClick={() => onPageChange?.('profile')}
            >
              <User className="h-4 w-4 mr-2" />
              Complete Profile
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Profile Completed Success */}
      {user?.profileCompleted && user.role === 'manager' && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>
            <strong className="text-green-800">Profile completed!</strong>
            <span className="text-green-700 ml-2">
              Your manager profile is complete and you'll receive relevant event management opportunities.
            </span>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Assigned Events</p>
                <p className="text-2xl font-semibold">8</p>
                <p className="text-xs text-blue-600">3 active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completed Tasks</p>
                <p className="text-2xl font-semibold">24</p>
                <p className="text-xs text-green-600">92% completion rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-semibold">7</p>
                <p className="text-xs text-orange-600">Needs attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Team Members</p>
                <p className="text-2xl font-semibold">35</p>
                <p className="text-xs text-purple-600">Volunteers & Vendors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assigned Events */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">by {event.organizer}</p>
                    </div>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{event.progress}%</span>
                    </div>
                    <Progress value={event.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Tasks</p>
                      <p className="font-semibold">{event.tasks.completed}/{event.tasks.total}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Volunteers</p>
                      <p className="font-semibold">{event.volunteers}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Vendors</p>
                      <p className="font-semibold">{event.vendors}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onEventSelect(event.id.toString())}
                    >
                      Manage
                    </Button>
                    <Button size="sm" variant="outline">Tasks</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      {approval.type === 'vendor' && <Building className="h-4 w-4 text-blue-500 mr-2" />}
                      {approval.type === 'volunteer' && <UserCheck className="h-4 w-4 text-green-500 mr-2" />}
                      {approval.type === 'budget' && <Clock className="h-4 w-4 text-orange-500 mr-2" />}
                      <div>
                        <p className="font-medium text-gray-900">{approval.name}</p>
                        <p className="text-sm text-gray-600">{approval.event}</p>
                        {approval.role && <p className="text-xs text-gray-500">{approval.role}</p>}
                      </div>
                    </div>
                    {approval.amount && (
                      <span className="font-semibold text-green-600">{approval.amount}</span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">Reject</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Task Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">In Progress</h3>
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-600">Active tasks</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Completed</h3>
              <p className="text-2xl font-bold text-green-600">24</p>
              <p className="text-sm text-gray-600">This month</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Overdue</h3>
              <p className="text-2xl font-bold text-orange-600">3</p>
              <p className="text-sm text-gray-600">Need attention</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}