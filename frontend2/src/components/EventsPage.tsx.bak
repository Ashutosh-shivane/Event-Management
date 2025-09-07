import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Search,
  Filter,
  Plus,
  Star,
  Clock
} from 'lucide-react';

export function EventsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const events = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      description: 'Join industry leaders for the biggest tech conference of the year.',
      date: '2024-03-15',
      time: '09:00 AM',
      location: 'Convention Center, Downtown',
      category: 'Technology',
      organizer: 'TechCorp',
      attendees: 245,
      capacity: 300,
      price: 50,
      rating: 4.8,
      status: 'active',
      image: 'tech-conference.jpg'
    },
    {
      id: 2,
      title: 'Music Festival 2024',
      description: 'Experience amazing live music from top artists.',
      date: '2024-03-20',
      time: '06:00 PM',
      location: 'Central Park Amphitheater',
      category: 'Entertainment',
      organizer: 'Music Events Co.',
      attendees: 450,
      capacity: 500,
      price: 75,
      rating: 4.9,
      status: 'active',
      image: 'music-festival.jpg'
    },
    {
      id: 3,
      title: 'Career Fair 2024',
      description: 'Connect with top employers and explore career opportunities.',
      date: '2024-03-25',
      time: '10:00 AM',
      location: 'University Hall',
      category: 'Career',
      organizer: 'University Career Services',
      attendees: 128,
      capacity: 200,
      price: 0,
      rating: 4.6,
      status: 'active',
      image: 'career-fair.jpg'
    },
    {
      id: 4,
      title: 'Art Workshop Series',
      description: 'Learn painting techniques from professional artists.',
      date: '2024-04-05',
      time: '02:00 PM',
      location: 'Art Studio, Creative District',
      category: 'Education',
      organizer: 'Creative Arts Academy',
      attendees: 15,
      capacity: 20,
      price: 120,
      rating: 4.7,
      status: 'active',
      image: 'art-workshop.jpg'
    }
  ];

  const categories = ['all', 'Technology', 'Entertainment', 'Career', 'Education', 'Sports', 'Business'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const canCreateEvent = user?.role === 'organizer' || user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        {canCreateEvent && (
          <Button className="flex items-center space-x-2">
            <Plus size={16} />
            <span>Create Event</span>
          </Button>
        )}
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter size={16} className="mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg flex items-center justify-center">
              <div className="text-white text-center">
                <Calendar size={48} className="mx-auto mb-2" />
                <p className="text-sm opacity-90">{event.category}</p>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{event.title}</h3>
                <Badge variant="secondary">{event.category}</Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date} at {event.time}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {event.attendees}/{event.capacity} attendees
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-600">{event.rating}</span>
                </div>
                
                <div className="text-right">
                  {event.price > 0 ? (
                    <span className="text-lg font-semibold text-green-600">${event.price}</span>
                  ) : (
                    <span className="text-lg font-semibold text-blue-600">Free</span>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1">View Details</Button>
                {user?.role === 'student' && (
                  <Button variant="outline">Register</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all events.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}