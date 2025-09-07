import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Star,
  Heart,
  Ticket
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
  onEventSelect: (eventId: string) => void;
}

export function StudentDashboard({ onNavigate, onEventSelect }: StudentDashboardProps) {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: '2024-03-15',
      time: '09:00 AM',
      location: 'Convention Center',
      attendees: 250,
      category: 'Technology',
      registered: true,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Music Festival',
      date: '2024-03-20',
      time: '06:00 PM',
      location: 'Central Park',
      attendees: 500,
      category: 'Entertainment',
      registered: false,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Career Fair',
      date: '2024-03-25',
      time: '10:00 AM',
      location: 'University Hall',
      attendees: 150,
      category: 'Career',
      registered: true,
      rating: 4.6
    }
  ];

  const myEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      status: 'confirmed',
      date: '2024-03-15'
    },
    {
      id: 2,
      title: 'Career Fair',
      status: 'pending',
      date: '2024-03-25'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <Button>Browse Events</Button>
      </div>

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
                <p className="text-2xl font-semibold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Ticket className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Attended Events</p>
                <p className="text-2xl font-semibold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Favorite Events</p>
                <p className="text-2xl font-semibold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-semibold">4.7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <Badge variant={event.registered ? "secondary" : "outline"}>
                      {event.registered ? 'Registered' : 'Available'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}
                    <Clock className="h-4 w-4 ml-4 mr-1" />
                    {event.time}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                    <Users className="h-4 w-4 ml-4 mr-1" />
                    {event.attendees} attendees
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">{event.rating}</span>
                    </div>
                    
                    {!event.registered && (
                      <Button size="sm" variant="outline">Register</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Events */}
        <Card>
          <CardHeader>
            <CardTitle>My Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <Badge variant={event.status === 'confirmed' ? "secondary" : "outline"}>
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="outline">Download Ticket</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Registered for Tech Conference 2024</p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Rated Music Workshop (5 stars)</p>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Added Career Fair to favorites</p>
              <span className="text-xs text-gray-400">2 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}