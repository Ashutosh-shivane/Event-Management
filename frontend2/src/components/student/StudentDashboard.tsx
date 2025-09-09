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
  User,
  AlertCircle,
  Trophy,
  Star
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (page: PageType) => void;
  onEventSelect: (eventId: string) => void;
  onPageChange?: (page: string) => void;
}

export function StudentDashboard({ onNavigate, onEventSelect, onPageChange }: StudentDashboardProps) {
  const { user } = useAuth();

  const registeredEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      organizer: 'John Doe',
      status: 'confirmed',
      date: '2024-03-15',
      role: 'Registration Assistant',
      hours: 8,
      completed: false
    },
    {
      id: 2,
      title: 'Music Festival',
      organizer: 'Jane Smith',
      status: 'pending',
      date: '2024-03-20',
      role: 'Stage Helper',
      hours: 12,
      completed: false
    },
    {
      id: 3,
      title: 'Career Fair',
      organizer: 'Mike Johnson',
      status: 'completed',
      date: '2024-02-28',
      role: 'Information Booth',
      hours: 6,
      completed: true
    }
  ];

  const availableEvents = [
    { id: 4, title: 'Spring Workshop', date: '2024-04-10', volunteers: 15, maxVolunteers: 20 },
    { id: 5, title: 'Community Outreach', date: '2024-04-15', volunteers: 8, maxVolunteers: 12 },
    { id: 6, title: 'Art Exhibition', date: '2024-04-20', volunteers: 22, maxVolunteers: 25 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedHours = registeredEvents
    .filter(event => event.completed)
    .reduce((total, event) => total + event.hours, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <Button 
          onClick={() => onNavigate('events')}
          className="flex items-center space-x-2"
        >
          <Calendar className="h-4 w-4" />
          <span>Browse Events</span>
        </Button>
      </div>

      {/* Profile Completion Alert */}
      {!user?.profileCompleted && user?.role === 'STUDENT' && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="flex items-center justify-between">
            <div>
              <strong className="text-orange-800">Complete your student profile</strong>
              <p className="text-orange-700 mt-1">
                Add your academic information and interests to get better event recommendations and opportunities.
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
      {user?.profileCompleted && user.role === 'student' && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>
            <strong className="text-green-800">Profile completed!</strong>
            <span className="text-green-700 ml-2">
              You'll now receive personalized event recommendations based on your interests and academic background.
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
                <p className="text-sm text-gray-600">Registered Events</p>
                <p className="text-2xl font-semibold">3</p>
                <p className="text-xs text-blue-600">2 upcoming</p>
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

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-2xl font-semibold">4.8</p>
                <p className="text-xs text-orange-600">⭐⭐⭐⭐⭐</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Events */}
        <Card>
          <CardHeader>
            <CardTitle>My Registered Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {registeredEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
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
                      onClick={() => onEventSelect(event.id.toString())}
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
              <Users className="h-5 w-5 mr-2" />
              Available Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600">📅 {event.date}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Volunteers</span>
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
                      onClick={() => onNavigate('student-register')}
                      disabled={event.volunteers >= event.maxVolunteers}
                    >
                      {event.volunteers >= event.maxVolunteers ? 'Full' : 'Register'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onEventSelect(event.id.toString())}
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

      {/* Achievement Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Achievements & Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Team Player</h3>
              <p className="text-sm text-gray-600">Worked with 5+ teams</p>
              <Badge variant="secondary" className="mt-2">Earned</Badge>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Time Keeper</h3>
              <p className="text-sm text-gray-600">25+ volunteer hours</p>
              <div className="mt-2">
                <Progress value={24} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">1 hour to go</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Rising Star</h3>
              <p className="text-sm text-gray-600">4.8+ rating average</p>
              <Badge variant="secondary" className="mt-2">Earned</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}