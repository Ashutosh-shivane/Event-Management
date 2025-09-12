import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';

export function OrganizerDashboard() {
  const navigate = useNavigate();

  const myEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: '2024-03-15',
      status: 'active',
      volunteers: 45,
      maxVolunteers: 60,
      budget: 15000,
      spent: 8500,
      progress: 75
    },
    {
      id: 2,
      title: 'Cultural Festival',
      date: '2024-04-20',
      status: 'draft',
      volunteers: 12,
      maxVolunteers: 40,
      budget: 8000,
      spent: 2000,
      progress: 25
    },
    {
      id: 3,
      title: 'Career Fair 2024',
      date: '2024-02-10',
      status: 'completed',
      volunteers: 35,
      maxVolunteers: 35,
      budget: 12000,
      spent: 11500,
      progress: 100
    }
  ];

  const totalStats = {
    totalEvents: myEvents.length,
    activeEvents: myEvents.filter(e => e.status === 'active').length,
    totalVolunteers: myEvents.reduce((sum, e) => sum + e.volunteers, 0),
    totalBudget: myEvents.reduce((sum, e) => sum + e.budget, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => navigate('/organizer/manage-events')}
          >
            <Users size={16} />
            <span>Manage Events</span>
          </Button>
          <Button 
            className="flex items-center space-x-2"
            onClick={() => navigate('/organizer/create-event')}
          >
            <Plus size={16} />
            <span>Create Event</span>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-semibold">{totalStats.totalEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Events</p>
                <p className="text-2xl font-semibold">{totalStats.activeEvents}</p>
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
                <p className="text-sm text-gray-600">Total Volunteers</p>
                <p className="text-2xl font-semibold">{totalStats.totalVolunteers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-semibold">${totalStats.totalBudget.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>My Events</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/organizer/manage-events')}
            >
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">?? {event.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Volunteers</p>
                    <p className="font-semibold">{event.volunteers}/{event.maxVolunteers}</p>
                    <Progress 
                      value={(event.volunteers / event.maxVolunteers) * 100} 
                      className="h-1 mt-1" 
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget Used</p>
                    <p className="font-semibold">${event.spent.toLocaleString()}/${event.budget.toLocaleString()}</p>
                    <Progress 
                      value={(event.spent / event.budget) * 100} 
                      className="h-1 mt-1" 
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="font-semibold">{event.progress}%</p>
                    <Progress value={event.progress} className="h-1 mt-1" />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate(`/organizer/events/${event.id}/edit`)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate(`/organizer/events/${event.id}/add-manager`)}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Add Manager
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/organizer/create-event')}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Create New Event</h3>
            <p className="text-sm text-gray-600">Start planning your next event with our easy-to-use tools</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/organizer/manage-events')}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Manage Events</h3>
            <p className="text-sm text-gray-600">View and manage all your existing events in one place</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/reports')}>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">View Reports</h3>
            <p className="text-sm text-gray-600">Analyze your event performance and volunteer engagement</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}