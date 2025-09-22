import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { 
  Calendar, 
  Search, 
  Eye,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  Users,
  MapPin,
  DollarSign,
  Clock,
  Flag,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export function AdminEventManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const events = [
    {
      id: 1,
      title: 'International Tech Summit',
      organizer: 'TechCorp Inc.',
      organizerId: 2,
      category: 'technology',
      status: 'active',
      date: '2024-04-15',
      endDate: '2024-04-17',
      location: 'San Francisco, CA',
      venue: 'Convention Center',
      maxAttendees: 500,
      currentAttendees: 387,
      price: 299,
      budget: 150000,
      expenses: 125000,
      manager: 'Emily Davis',
      approval: 'approved',
      priority: 'high',
      rating: 4.8,
      vendors: 12,
      volunteers: 25
    },
    {
      id: 2,
      title: 'Digital Marketing Workshop',
      organizer: 'Marketing Pro',
      organizerId: 5,
      category: 'business',
      status: 'pending',
      date: '2024-03-25',
      endDate: '2024-03-25',
      location: 'New York, NY',
      venue: 'Business Center',
      maxAttendees: 100,
      currentAttendees: 45,
      price: 149,
      budget: 25000,
      expenses: 18000,
      manager: 'Mike Wilson',
      approval: 'review',
      priority: 'medium',
      rating: null,
      vendors: 3,
      volunteers: 8
    },
    {
      id: 3,
      title: 'Art & Culture Festival',
      organizer: 'Cultural Society',
      organizerId: 8,
      category: 'arts',
      status: 'cancelled',
      date: '2024-05-10',
      endDate: '2024-05-12',
      location: 'Los Angeles, CA',
      venue: 'Arts District',
      maxAttendees: 1000,
      currentAttendees: 234,
      price: 75,
      budget: 80000,
      expenses: 45000,
      manager: null,
      approval: 'rejected',
      priority: 'low',
      rating: null,
      vendors: 8,
      volunteers: 15
    },
    {
      id: 4,
      title: 'Healthcare Innovation Conference',
      organizer: 'MedTech Solutions',
      organizerId: 12,
      category: 'healthcare',
      status: 'completed',
      date: '2024-02-20',
      endDate: '2024-02-22',
      location: 'Boston, MA',
      venue: 'Medical Center',
      maxAttendees: 300,
      currentAttendees: 298,
      price: 399,
      budget: 120000,
      expenses: 118000,
      manager: 'Sarah Johnson',
      approval: 'approved',
      priority: 'high',
      rating: 4.9,
      vendors: 15,
      volunteers: 20
    }
  ];

  const stats = [
    { label: 'Total Events', value: 156, change: '+8%', color: 'blue' },
    { label: 'Active Events', value: 89, change: '+12%', color: 'green' },
    { label: 'Pending Approval', value: 23, change: '+5%', color: 'yellow' },
    { label: 'Revenue Generated', value: '$2.4M', change: '+18%', color: 'purple' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'pending' && event.approval === 'review') ||
                      (activeTab === 'approved' && event.approval === 'approved') ||
                      (activeTab === 'rejected' && event.approval === 'rejected');
    
    return matchesSearch && matchesStatus && matchesCategory && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApprovalColor = (approval: string) => {
    switch (approval) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const EventDetailsModal = ({ event }: { event: any }) => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Event Details - {event.title}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Event Title</label>
              <p>{event.title}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Organizer</label>
              <p>{event.organizer}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Category</label>
              <Badge variant="outline">{event.category}</Badge>
            </div>
            <div>
              <label className="text-sm text-gray-600">Status</label>
              <Badge className={getStatusColor(event.status)}>
                {event.status}
              </Badge>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Date Range</label>
              <p className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {event.date} - {event.endDate}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Location</label>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {event.location}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Venue</label>
              <p>{event.venue}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Manager</label>
              <p>{event.manager || 'Not Assigned'}</p>
            </div>
          </div>
        </div>

        {/* Attendance & Financial Info */}
        <div className="grid grid-cols-3 gap-6 border-t pt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="h-6 w-6 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p>{event.currentAttendees} / {event.maxAttendees}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${(event.currentAttendees / event.maxAttendees) * 100}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <DollarSign className="h-6 w-6 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Budget</p>
                  <p>${event.budget.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Spent: ${event.expenses.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Flag className="h-6 w-6 text-orange-600" />
                <div className="ml-3">
                  <p className="text-sm text-gray-600">Priority</p>
                  <Badge className={getPriorityColor(event.priority)}>
                    {event.priority}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resources */}
        <div className="grid grid-cols-3 gap-6 border-t pt-4">
          <div>
            <label className="text-sm text-gray-600">Vendors</label>
            <p>{event.vendors} vendors assigned</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Volunteers</label>
            <p>{event.volunteers} volunteers</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Rating</label>
            <p>{event.rating ? `${event.rating}/5.0` : 'Not rated yet'}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 border-t pt-4">
          <Button>Edit Event</Button>
          <Button variant="outline">View Attendees</Button>
          <Button variant="outline">Financial Report</Button>
          {event.approval === 'review' && (
            <>
              <Button className="bg-green-600 hover:bg-green-700">Approve</Button>
              <Button variant="outline" className="text-red-600">Reject</Button>
            </>
          )}
          {event.status === 'active' && (
            <Button variant="outline" className="text-red-600">Cancel Event</Button>
          )}
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>Event Management</h1>
        <Button>Export Report</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p>{typeof stat.value === 'string' ? stat.value : stat.value.toLocaleString()}</p>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Event Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="pending">Pending Approval</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search events by title or organizer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Events Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Organizer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div>
                      <p>{event.title}</p>
                      <p className="text-sm text-gray-600">{event.category}</p>
                    </div>
                  </TableCell>
                  <TableCell>{event.organizer}</TableCell>
                  <TableCell>
                    <div>
                      <p>{event.date}</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{event.currentAttendees}/{event.maxAttendees}</p>
                      <div className="w-20 bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-blue-600 h-1 rounded-full" 
                          style={{width: `${(event.currentAttendees / event.maxAttendees) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getApprovalColor(event.approval)}>
                      {event.approval}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(event.priority)}>
                      {event.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <EventDetailsModal event={event} />
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {event.approval === 'review' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}