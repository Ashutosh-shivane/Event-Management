import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, MapPin, Users, Star, MessageSquare } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  capacity: number;
  registeredCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  category: string;
  hasAttended: boolean;
  canProvideFeedback: boolean;
}

// Mock events data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2024',
    description: 'A comprehensive summit covering latest trends in technology and innovation.',
    date: '2024-03-15',
    time: '09:00 AM',
    location: 'Main Auditorium',
    organizer: 'Tech Club',
    capacity: 200,
    registeredCount: 185,
    status: 'completed',
    category: 'Technology',
    hasAttended: true,
    canProvideFeedback: true
  },
  {
    id: '2',
    title: 'Cultural Festival 2024',
    description: 'Annual cultural celebration featuring performances, food, and exhibitions.',
    date: '2024-02-28',
    time: '06:00 PM',
    location: 'Campus Grounds',
    organizer: 'Cultural Committee',
    capacity: 500,
    registeredCount: 423,
    status: 'completed',
    category: 'Cultural',
    hasAttended: true,
    canProvideFeedback: true
  },
  {
    id: '3',
    title: 'Career Development Workshop',
    description: 'Professional workshop on career planning and interview preparation.',
    date: '2024-02-20',
    time: '02:00 PM',
    location: 'Conference Room A',
    organizer: 'Career Services',
    capacity: 50,
    registeredCount: 48,
    status: 'completed',
    category: 'Professional Development',
    hasAttended: true,
    canProvideFeedback: true
  },
  {
    id: '4',
    title: 'Sports Tournament',
    description: 'Inter-department sports competition with multiple events.',
    date: '2024-01-30',
    time: '08:00 AM',
    location: 'Sports Complex',
    organizer: 'Sports Committee',
    capacity: 300,
    registeredCount: 267,
    status: 'completed',
    category: 'Sports',
    hasAttended: false,
    canProvideFeedback: false
  },
  {
    id: '5',
    title: 'Science Exhibition',
    description: 'Student science projects showcase and competition.',
    date: '2024-01-15',
    time: '10:00 AM',
    location: 'Science Building',
    organizer: 'Science Department',
    capacity: 150,
    registeredCount: 134,
    status: 'completed',
    category: 'Academic',
    hasAttended: true,
    canProvideFeedback: true
  }
];

export function StudentFeedbackPage() {
  const navigate = useNavigate();
  const [events] = useState<Event[]>(mockEvents);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'secondary';
      case 'ongoing':
        return 'default';
      case 'upcoming':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const handleProvideFeedback = (eventId: string) => {
    navigate(`/student/feedback/${eventId}`);
  };

  const attendedEvents = events.filter(event => event.hasAttended && event.canProvideFeedback);
  const notAttendedEvents = events.filter(event => !event.hasAttended);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Event Feedback</h1>
          <p className="text-gray-600 mt-1">Provide feedback for events you have attended</p>
        </div>
      </div>

      {/* Events You Can Provide Feedback For */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-medium text-gray-900">Events Available for Feedback</h2>
          <Badge variant="secondary" className="ml-2">
            {attendedEvents.length}
          </Badge>
        </div>

        {attendedEvents.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Available</h3>
              <p className="text-gray-600">
                You haven't attended any events that are available for feedback yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {attendedEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-medium line-clamp-2">
                      {event.title}
                    </CardTitle>
                    <Badge variant={getStatusBadgeVariant(event.status)} className="ml-2 capitalize">
                      {event.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.registeredCount}/{event.capacity} participants
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {event.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">
                      Attended
                    </Badge>
                  </div>

                  <Button 
                    className="w-full mt-4" 
                    onClick={() => handleProvideFeedback(event.id)}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Provide Feedback
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Past Events (Not Attended) */}
      {notAttendedEvents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-medium text-gray-900">Past Events (Not Attended)</h2>
            <Badge variant="outline" className="ml-2">
              {notAttendedEvents.length}
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notAttendedEvents.map((event) => (
              <Card key={event.id} className="opacity-75">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-medium line-clamp-2 text-gray-600">
                      {event.title}
                    </CardTitle>
                    <Badge variant="outline" className="ml-2 capitalize">
                      {event.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{event.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs text-gray-500">
                      {event.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs text-gray-500 border-gray-200">
                      Not Attended
                    </Badge>
                  </div>

                  <Button variant="outline" className="w-full mt-4" disabled>
                    Feedback Not Available
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}