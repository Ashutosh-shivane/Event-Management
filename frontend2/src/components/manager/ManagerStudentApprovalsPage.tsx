import React, { useState } from 'react';
import { ChevronLeft, Users, CheckCircle, Clock, Filter, Search, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { toast } from 'sonner';
import { PageType } from '../../App';

interface Student {
  id: string;
  name: string;
  email: string;
  university: string;
  course: string;
  year: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  skills: string[];
  availability: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  totalStudents: number;
  pendingApprovals: number;
}

interface ManagerStudentApprovalsPageProps {
  onNavigate: (page: PageType) => void;
  eventId?: string | null;
}

export function ManagerStudentApprovalsPage({ onNavigate, eventId }: ManagerStudentApprovalsPageProps) {
  // Mock data for events assigned to this manager
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Tech Conference 2024',
      date: '2024-03-15',
      location: 'Convention Center',
      totalStudents: 45,
      pendingApprovals: 12
    },
    {
      id: '2',
      title: 'Career Fair Spring',
      date: '2024-03-22',
      location: 'University Campus',
      totalStudents: 78,
      pendingApprovals: 8
    },
    {
      id: '3',
      title: 'Innovation Summit',
      date: '2024-04-05',
      location: 'Business District',
      totalStudents: 32,
      pendingApprovals: 15
    }
  ];

  // Mock student data
  const mockStudents: Student[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@university.edu',
      university: 'State University',
      course: 'Computer Science',
      year: '3rd Year',
      registrationDate: '2024-01-15',
      status: 'pending',
      skills: ['React', 'JavaScript', 'Team Leadership'],
      availability: 'Full-time'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'mchen@tech.edu',
      university: 'Tech Institute',
      course: 'Software Engineering',
      year: '4th Year',
      registrationDate: '2024-01-16',
      status: 'pending',
      skills: ['Python', 'Data Analysis', 'Project Management'],
      availability: 'Part-time'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      email: 'emma.r@college.edu',
      university: 'City College',
      course: 'Business Administration',
      year: '2nd Year',
      registrationDate: '2024-01-17',
      status: 'approved',
      skills: ['Marketing', 'Communication', 'Event Planning'],
      availability: 'Full-time'
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'dkim@university.edu',
      university: 'State University',
      course: 'Digital Media',
      year: '3rd Year',
      registrationDate: '2024-01-18',
      status: 'pending',
      skills: ['Graphic Design', 'Video Editing', 'Social Media'],
      availability: 'Full-time'
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      email: 'lthompson@tech.edu',
      university: 'Tech Institute',
      course: 'Information Systems',
      year: '4th Year',
      registrationDate: '2024-01-19',
      status: 'rejected',
      skills: ['Database Management', 'System Analysis'],
      availability: 'Part-time'
    }
  ];

  const [selectedEvent, setSelectedEvent] = useState<string>(eventId || mockEvents[0].id);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showBulkActions, setShowBulkActions] = useState(false);

  const currentEvent = mockEvents.find(event => event.id === selectedEvent);
  
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingStudents = filteredStudents.filter(student => student.status === 'pending');

  const handleStudentApproval = (studentId: string, action: 'approve' | 'reject') => {
    setStudents(prev => prev.map(student =>
      student.id === studentId
        ? { ...student, status: action === 'approve' ? 'approved' : 'rejected' }
        : student
    ));
    
    const student = students.find(s => s.id === studentId);
    toast.success(
      `${student?.name} has been ${action === 'approve' ? 'approved' : 'rejected'} for ${currentEvent?.title}`
    );
  };

  const handleBulkApproval = (action: 'approve' | 'reject') => {
    if (selectedStudents.length === 0) {
      toast.error('Please select students to perform bulk action');
      return;
    }

    setStudents(prev => prev.map(student =>
      selectedStudents.includes(student.id)
        ? { ...student, status: action === 'approve' ? 'approved' : 'rejected' }
        : student
    ));

    toast.success(
      `${selectedStudents.length} students have been ${action === 'approve' ? 'approved' : 'rejected'} for ${currentEvent?.title}`
    );
    setSelectedStudents([]);
    setShowBulkActions(false);
  };

  const handleSelectAll = () => {
    const allPendingIds = pendingStudents.map(student => student.id);
    setSelectedStudents(allPendingIds);
  };

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onNavigate('dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Student Approvals</h1>
                <p className="text-sm text-gray-500">Manage student registrations for your assigned events</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                {pendingStudents.length} Pending Approvals
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Selection */}
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Select Event</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedEvent === event.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedEvent(event.id)}
                  >
                    <h3 className="font-medium text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{event.date} • {event.location}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total: {event.totalStudents}</span>
                      <span className="text-orange-600 font-medium">
                        Pending: {event.pendingApprovals}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search students by name, email, or university..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => setShowBulkActions(!showBulkActions)}
                    className="whitespace-nowrap"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Bulk Actions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bulk Actions */}
        {showBulkActions && (
          <div className="mb-6">
            <Alert>
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAll}
                      disabled={pendingStudents.length === 0}
                    >
                      Select All Pending ({pendingStudents.length})
                    </Button>
                    <span className="text-sm text-gray-600">
                      {selectedStudents.length} students selected
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleBulkApproval('approve')}
                      disabled={selectedStudents.length === 0}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve Selected
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleBulkApproval('reject')}
                      disabled={selectedStudents.length === 0}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject Selected
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Current Event Info */}
        {currentEvent && (
          <div className="mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{currentEvent.title}</h2>
                    <p className="text-gray-600">{currentEvent.date} • {currentEvent.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{currentEvent.totalStudents}</div>
                    <div className="text-sm text-gray-500">Total Students</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Students List */}
        <div className="space-y-4">
          {filteredStudents.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                  <p className="text-gray-500">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'No students have registered for this event yet'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {showBulkActions && student.status === 'pending' && (
                        <div className="mt-1">
                          <Checkbox
                            checked={selectedStudents.includes(student.id)}
                            onCheckedChange={() => handleSelectStudent(student.id)}
                          />
                        </div>
                      )}
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{student.name}</h3>
                          <Badge className={getStatusColor(student.status)}>
                            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p><span className="font-medium">Email:</span> {student.email}</p>
                            <p><span className="font-medium">University:</span> {student.university}</p>
                            <p><span className="font-medium">Course:</span> {student.course} ({student.year})</p>
                          </div>
                          <div>
                            <p><span className="font-medium">Availability:</span> {student.availability}</p>
                            <p><span className="font-medium">Registered:</span> {student.registrationDate}</p>
                            <div className="mt-2">
                              <span className="font-medium">Skills:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {student.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {student.status === 'pending' && (
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => handleStudentApproval(student.id, 'reject')}
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleStudentApproval(student.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    )}
                    {student.status === 'approved' && (
                      <div className="flex items-center text-green-600 ml-4">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span className="text-sm font-medium">Approved</span>
                      </div>
                    )}
                    {student.status === 'rejected' && (
                      <div className="flex items-center text-red-600 ml-4">
                        <X className="h-5 w-5 mr-1" />
                        <span className="text-sm font-medium">Rejected</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}