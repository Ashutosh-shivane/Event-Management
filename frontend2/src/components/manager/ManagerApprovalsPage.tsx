import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Users,
  Search,
  Filter,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  totalStudents: number;
  required_volunteer:string;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export function ManagerApprovalsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');

  // Mock data for events assigned to this manager
  const [events,setEvents] = React.useState<Event[]>([
  ]);




  useEffect(()=>{

    const fetchdata=async ()=>{


    try{

      var userid=localStorage.getItem("id");

     const res= await axios.get(`http://localhost:8080/SER/getstats/${userid}`);

     console.log(res);

     setEvents(res.data);

    }catch(err){
      console.log(err);

    }



  }
    fetchdata();
},[]);

console.log(events);






  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPendingApprovals = events.reduce((sum, event) => sum + event.pendingCount, 0);
  const totalEvents = events.length;
  const eventsWithPending = events.filter(event => event.pendingCount > 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Student Approvals</h1>
          <p className="text-muted-foreground mt-2">
            Manage student registrations for your assigned events
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            {totalPendingApprovals} Pending Approvals
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-semibold">{totalEvents}</p>
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
                <p className="text-2xl font-semibold">{totalPendingApprovals}</p>
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
                <p className="text-sm text-gray-600">Events with Pending</p>
                <p className="text-2xl font-semibold">{eventsWithPending}</p>
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
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-semibold">
                  {events.reduce((sum, event) => sum + event.totalStudents, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="grid gap-6">
        {filteredEvents.map(event => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      {event.pendingCount > 0 && (
                        <Badge className="bg-orange-100 text-orange-800">
                          {event.pendingCount} Pending
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(event.startAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {event.required_volunteer} students
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{event.pendingCount}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{event.approvedCount}</div>
                    <div className="text-sm text-gray-600">Approved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{event.rejectedCount}</div>
                    <div className="text-sm text-gray-600">Rejected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{event.totalStudents}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {event.pendingCount > 0 && (
                      <div className="flex items-center text-sm text-orange-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Action Required
                      </div>
                    )}
                    {event.pendingCount === 0 && event.status !== 'completed' && (
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        All Approved
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Event
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => navigate(`/manager/events/${event.eventId}/approvals`)}
                      disabled={event.pendingCount === 0}
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      {event.pendingCount > 0 ? 'Review Approvals' : 'View All Students'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No events found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters.'
                : 'You don\'t have any assigned events yet.'
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      {totalPendingApprovals > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-800">Pending Approvals</h3>
                <p className="text-sm text-orange-700">
                  You have {totalPendingApprovals} student registrations waiting for approval across {eventsWithPending} events.
                </p>
              </div>
              <Button 
                onClick={() => {
                  const firstEventWithPending = events.find(e => e.pendingCount > 0);
                  if (firstEventWithPending) {
                    navigate(`/manager/events/${firstEventWithPending.id}/approvals`);
                  }
                }}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Review Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}