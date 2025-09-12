import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft,
  Calendar,
  Users,
  DollarSign,
  MapPin,
  Clock,
  Edit,
  Settings,
  UserPlus,
  Eye,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Clock3
} from 'lucide-react';

export function OrganizerEventManagePage() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Mock data for organizer's events
  const myEvents = [
    {
      id: '1',
      title: 'Tech Conference 2024',
      status: 'active',
      registrations: 245,
      capacity: 300,
      revenue: 12250,
      date: '2024-03-15',
      time: '09:00 AM',
      venue: 'Convention Center',
      category: 'Technology',
      managers: [
        { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Event Manager', status: 'active' },
        { id: '2', name: 'Mike Chen', email: 'mike@example.com', role: 'Logistics Manager', status: 'pending' }
      ],
      isPublic: true,
      ticketPrice: 50,
      currency: 'USD'
    },
    {
      id: '2',
      title: 'Music Festival',
      status: 'draft',
      registrations: 0,
      capacity: 500,
      revenue: 0,
      date: '2024-03-20',
      time: '06:00 PM',
      venue: 'Central Park',
      category: 'Entertainment',
      managers: [],
      isPublic: true,
      ticketPrice: 75,
      currency: 'USD'
    },
    {
      id: '3',
      title: 'Career Fair',
      status: 'completed',
      registrations: 128,
      capacity: 200,
      revenue: 0,
      date: '2024-02-25',
      time: '10:00 AM',
      venue: 'University Hall',
      category: 'Career',
      managers: [
        { id: '3', name: 'Emily Davis', email: 'emily@example.com', role: 'Registration Manager', status: 'active' }
      ],
      isPublic: true,
      ticketPrice: 0,
      currency: 'USD'
    },
    {
      id: '4',
      title: 'Startup Pitch Event',
      status: 'active',
      registrations: 85,
      capacity: 150,
      revenue: 4250,
      date: '2024-03-30',
      time: '02:00 PM',
      venue: 'Innovation Hub',
      category: 'Business',
      managers: [],
      isPublic: true,
      ticketPrice: 50,
      currency: 'USD'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'draft': return <Clock3 className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock3 className="h-4 w-4" />;
    }
  };

  const handleAddManager = (eventId: string) => {
    navigate(`/organizer/events/${eventId}/add-manager`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage My Events</h1>
              <p className="text-gray-600">Manage your events, assign managers, and track performance</p>
            </div>
            <Button onClick={() => navigate('/organizer/create-event')}>
              <Calendar className="h-4 w-4 mr-2" />
              Create New Event
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.venue}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getStatusColor(event.status)} flex items-center space-x-1`}>
                      {getStatusIcon(event.status)}
                      <span>{event.status.charAt(0).toUpperCase() + event.status.slice(1)}</span>
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Event Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Registrations</span>
                      <span className="text-sm font-medium">{event.registrations}/{event.capacity}</span>
                    </div>
                    <Progress 
                      value={(event.registrations / event.capacity) * 100} 
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <span className="text-sm font-medium">
                        {event.ticketPrice > 0 ? `$${event.revenue.toLocaleString()}` : 'Free Event'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {event.ticketPrice > 0 ? `$${event.ticketPrice} per ticket` : 'No tickets required'}
                    </div>
                  </div>
                </div>

                {/* Managers Section */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Event Managers</h4>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAddManager(event.id)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Add Manager
                    </Button>
                  </div>
                  
                  {event.managers.length > 0 ? (
                    <div className="space-y-2">
                      {event.managers.map((manager) => (
                        <div key={manager.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                {manager.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{manager.name}</p>
                              <p className="text-xs text-gray-500">{manager.role}</p>
                            </div>
                          </div>
                          <Badge 
                            variant={manager.status === 'active' ? 'default' : 'outline'}
                            className="text-xs"
                          >
                            {manager.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No managers assigned yet</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Event
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{myEvents.length}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {myEvents.filter(e => e.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Events</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {myEvents.reduce((sum, event) => sum + event.registrations, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Registrations</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">
                ${myEvents.reduce((sum, event) => sum + event.revenue, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}