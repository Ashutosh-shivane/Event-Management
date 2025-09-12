import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
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
  User,
  MapPin,
  Star
} from 'lucide-react';

export function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const registeredEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      organizer: 'Tech Society',
      role: 'Registration Volunteer',
      date: 'Jan 15, 2024',
      hours: 4,
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Cultural Festival',
      organizer: 'Cultural Committee',
      role: 'Stage Management',
      date: 'Jan 25, 2024',
      hours: 6,
      status: 'pending'
    }
  ];

  const availableEvents = [
    {
      id: 3,
      title: 'Career Fair 2024',
      organizer: 'Career Services',
      date: 'Feb 10, 2024',
      location: 'Main Auditorium',
      volunteers: 8,
      maxVolunteers: 15,
      hours: 5,
      description: 'Help students connect with potential employers'
    },
    {
      id: 4,
      title: 'Science Exhibition',
      organizer: 'Science Department',
      date: 'Feb 20, 2024',
      location: 'Science Building',
      volunteers: 12,
      maxVolunteers: 12,
      hours: 4,
      description: 'Assist with setup and visitor guidance'
    }
  ];

  const completedHours = registeredEvents
    .filter(event => event.status === 'confirmed')
    .reduce((total, event) => total + event.hours, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
        </div>
        <Button onClick={() => navigate('/events')}>
          <Calendar className="h-4 w-4 mr-2" />
          Browse Events
        </Button>
      </div>

      {/* Profile Completion Alert */}
      {!user?.profileCompleted && user?.role === 'student' && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <strong className="text-orange-800">Complete your profile to unlock all features!</strong>
              <p className="text-orange-700 mt-1">
                Add your skills, availability, and interests to get matched with the best volunteer opportunities.
              </p>
            </div>
            <Button 
              size="sm" 
              className="ml-4 bg-orange-600 hover:bg-orange-700"
              onClick={() => navigate('/profile')}
            >
              <User className="h-4 w-4 mr-2" />
              Complete Profile
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Profile Completed Success */}
      {user?.profileCompleted && user.role === 'student' && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>
            <strong className="text-green-800">Profile completed!</strong>
            <span className="text-green-700 ml-2">You're now eligible for all volunteer opportunities.</span>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Registrations</p>
                <p className="text-2xl font-semibold">{registeredEvents.length}</p>
                <p className="text-xs text-blue-600">This semester</p>
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
                <p className="text-sm text-gray-600">Completed Events</p>
                <p className="text-2xl font-semibold">1</p>
                <p className="text-xs text-green-600">This semester</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Volunteer Hours</p>
                <p className="text-2xl font-semibold">{completedHours}</p>
                <p className="text-xs text-purple-600">Total earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Registrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="h-5 w-5 mr-2" />
              My Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {registeredEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">by {event.organizer}</p>
                      <p className="text-sm text-gray-500">{event.role}</p>
                    </div>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">
                      📅 {event.date}
                    </span>
                    <span className="text-sm font-medium">
                      {event.hours} hours
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      View Details
                    </Button>
                    {event.status === 'confirmed' && (
                      <Button size="sm" variant="outline">Check In</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Available Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">by {event.organizer}</p>
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                    <span>📅 {event.date}</span>
                    <span>📍 {event.location}</span>
                    <span>⏰ {event.hours} hours</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Volunteers needed</span>
                      <span>{event.volunteers}/{event.maxVolunteers}</span>
                    </div>
                    <Progress 
                      value={(event.volunteers / event.maxVolunteers) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      onClick={() => navigate(`/events/${event.id}/register`)}
                      disabled={event.volunteers >= event.maxVolunteers}
                    >
                      {event.volunteers >= event.maxVolunteers ? 'Full' : 'Register'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="flex items-center justify-center h-24"
              onClick={() => navigate('/events')}
            >
              <div className="text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2" />
                <span>Browse All Events</span>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center h-24"
              onClick={() => navigate('/profile')}
            >
              <div className="text-center">
                <User className="h-6 w-6 mx-auto mb-2" />
                <span>Update Profile</span>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center h-24"
              onClick={() => navigate('/chat')}
            >
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <span>Community Chat</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}