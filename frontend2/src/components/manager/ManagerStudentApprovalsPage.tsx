import React,{useEffect,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  Users, 
  CheckCircle, 
  Clock, 
  Filter, 
  Search, 
  Check, 
  X, 
  User,
  Mail,
  GraduationCap,
  Calendar,
  MapPin,
  AlertCircle,
  UserCheck,
  UserX,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';

import axios from 'axios';

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
  gpa?: string;
  experience?: string;
  motivation?: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  capacity: number;
  requirements: string[];
}

export function ManagerStudentApprovalsPage() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('pending');

 const [event, setEvent] = useState<Event>({
  id: '0',
  title: '',
  date: '',
  location: '',
  description: '',
  capacity: 0,
  requirements: []
});


const [students, setStudents] = React.useState<Student[]>([]);



    useEffect(()=>{

    const fetchdata=async ()=>{


    try{
     const res= await axios.get(`http://localhost:8080/SER/getEventstats/${eventId}`);


      const mappedEvent = mapBackendEventToFrontend(res.data.event);
      setEvent(mappedEvent);

      const mappedStudents: Student[] = res.data.students.map(mapBackendStudentToFrontend);
      setStudents(mappedStudents);

     console.log(res);

    //  setEvents(res.data);

    }catch(err){
      console.log(err);

    }



  }
    fetchdata();
},[]);


function mapBackendEventToFrontend(event: any): Event {
  return {
    id: String(event.id),
    title: event.title,
    date: new Date(event.startAt).toISOString().split("T")[0], // "YYYY-MM-DD"
    location: event.location,
    description: event.description,
    capacity: Number(event.requiredVolunteer),
    requirements: event.tags ? event.tags.split(",") : [] // map tags into requirements array
  };

}

function mapBackendStudentToFrontend(studentData: any): Student {
  return {
    id: String(studentData.id),
    name: studentData.name || "",
    email: studentData.username || "",
    university: studentData.university || "",
    course: studentData.degree || "",        // map backend "degree" to frontend "course"
    year: studentData.currentYear || "",
    registrationDate: "",                     // backend doesn’t provide this, set empty or map if available
    status: studentData.status?.toLowerCase() || "pending",
    skills: studentData.skills ? studentData.skills.split(",").map((s: string) => s.trim()) : [],
    availability: studentData.availability || "",
    gpa: studentData.marks || "",
    experience: "",                           // backend doesn’t provide this
    motivation: studentData.bio || ""        // map bio to motivation
  };
}



 


  // // Mock event data
  // const event: Event = {
  //   id: eventId || '1',
  //   title: 'Tech Conference 2024',
  //   date: '2024-03-15',
  //   location: 'Convention Center',
  //   description: 'Annual technology conference focusing on emerging trends in AI and machine learning.',
  //   capacity: 100,
  //   requirements: ['Computer Science background', 'Basic programming knowledge', 'Team collaboration skills']
  // };

  // Mock students data
  // const [students, setStudents] = React.useState<Student[]>([
  //   {
  //     id: '1',
  //     name: 'Alice Johnson',
  //     email: 'alice.johnson@university.edu',
  //     university: 'University of Technology',
  //     course: 'Computer Science',
  //     year: '3rd Year',
  //     registrationDate: '2024-02-15',
  //     status: 'pending',
  //     skills: ['JavaScript', 'React', 'Node.js'],
  //     availability: 'Full time',
  //     gpa: '3.8',
  //     experience: '2 internships, 3 personal projects',
  //     motivation: 'Passionate about AI and machine learning, looking to expand knowledge in emerging technologies.'
  //   },
  //   {
  //     id: '2',
  //     name: 'Bob Smith',
  //     email: 'bob.smith@university.edu',
  //     university: 'State University',
  //     course: 'Software Engineering',
  //     year: '4th Year',
  //     registrationDate: '2024-02-14',
  //     status: 'approved',
  //     skills: ['Python', 'Django', 'PostgreSQL'],
  //     availability: 'Part time',
  //     gpa: '3.9',
  //     experience: '1 internship, 5 personal projects',
  //     motivation: 'Senior student eager to learn about industry best practices and network with professionals.'
  //   },
  //   {
  //     id: '3',
  //     name: 'Carol Davis',
  //     email: 'carol.davis@university.edu',
  //     university: 'Tech Institute',
  //     course: 'Data Science',
  //     year: '2nd Year',
  //     registrationDate: '2024-02-16',
  //     status: 'pending',
  //     skills: ['Python', 'Machine Learning', 'SQL'],
  //     availability: 'Full time',
  //     gpa: '3.7',
  //     experience: '1 research project, 2 personal projects',
  //     motivation: 'Interested in applying data science concepts to real-world problems.'
  //   },
  //   {
  //     id: '4',
  //     name: 'David Wilson',
  //     email: 'david.wilson@university.edu',
  //     university: 'Metropolitan University',
  //     course: 'Information Technology',
  //     year: '3rd Year',
  //     registrationDate: '2024-02-13',
  //     status: 'rejected',
  //     skills: ['Java', 'Spring Boot', 'MySQL'],
  //     availability: 'Full time',
  //     gpa: '3.5',
  //     experience: '1 internship',
  //     motivation: 'Looking to enhance technical skills and gain industry exposure.'
  //   },
  //   {
  //     id: '5',
  //     name: 'Eva Martinez',
  //     email: 'eva.martinez@university.edu',
  //     university: 'University of Technology',
  //     course: 'Computer Engineering',
  //     year: '4th Year',
  //     registrationDate: '2024-02-17',
  //     status: 'pending',
  //     skills: ['C++', 'Embedded Systems', 'IoT'],
  //     availability: 'Part time',
  //     gpa: '3.9',
  //     experience: '2 internships, 1 research project',
  //     motivation: 'Excited to explore IoT applications and connect with industry leaders.'
  //   },
  //   {
  //     id: '6',
  //     name: 'Frank Brown',
  //     email: 'frank.brown@university.edu',
  //     university: 'State University',
  //     course: 'Computer Science',
  //     year: '2nd Year',
  //     registrationDate: '2024-02-18',
  //     status: 'approved',
  //     skills: ['JavaScript', 'Vue.js', 'MongoDB'],
  //     availability: 'Full time',
  //     gpa: '3.6',
  //     experience: '3 personal projects',
  //     motivation: 'Passionate about web development and eager to learn from experienced developers.'
  //   }
  // ]);

  // Filter students by tab and search
  const getFilteredStudents = (status: string) => {
    return students.filter(student => {
      const matchesStatus = status === 'all' || student.status === status;
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.course.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  };

  const pendingStudents = getFilteredStudents('pending');
  const approvedStudents = getFilteredStudents('approved');
  const rejectedStudents = getFilteredStudents('rejected');
  const allStudents = getFilteredStudents('all');

  const handleStudentAction = (studentId: string, action: 'approve' | 'reject') => {
    setStudents(prev => prev.map(student =>
      student.id === studentId
        ? { ...student, status: action === 'approve' ? 'approved' : 'rejected' }
        : student
    ));

    console.log(students);
    
    const student = students.find(s => s.id === studentId);
    toast.success(
      `${student?.name} has been ${action === 'approve' ? 'approved' : 'rejected'} for ${event.title}`
    );
  };

  const handleBulkAction = (action: 'approve' | 'reject') => {
    if (selectedStudents.length === 0) {
      toast.error('Please select students to perform bulk action');
      return;
    }

    setStudents(prev => prev.map(student =>
      selectedStudents.includes(student.id)
        ? { ...student, status: action === 'approve' ? 'approved' : 'rejected' }
        : student
    ));

    console.log(students);

    toast.success(
      `${selectedStudents.length} students have been ${action === 'approve' ? 'approved' : 'rejected'}`
    );
    setSelectedStudents([]);
    setShowBulkActions(false);
  };

  const handleSelectStudent = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    }
  };

  const handleSelectAll = (status: string) => {
    const studentsToSelect = getFilteredStudents(status);
    const studentIds = studentsToSelect.map(s => s.id);
    setSelectedStudents(studentIds);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <X className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };



  const handleSaveAll = async () => {

    console.log("here");

    console.log(students);
  try {

    const studentStatusArray = students.map(student => ({
  id: Number(student.id),
  status: student.status.toUpperCase()
}));

console.log(studentStatusArray);


    const res=await axios.patch(`http://localhost:8080/SER/saveEventstats/${eventId}/save`, studentStatusArray); // send current state
    toast.success('All student statuses saved!');


    console.log("here");

    console.log(students);


  } catch (err) {
    toast.error('Failed to save statuses.');
  }
};





  React.useEffect(() => {
    setShowBulkActions(selectedStudents.length > 0);
  }, [selectedStudents]);

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
                onClick={() => navigate('/manager/approvals')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Events
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{event.title}</h1>
                <p className="text-sm text-gray-500">Student Registration Management</p>
              </div>
            </div>


          


            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Info Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2">
                <h3 className="font-medium text-gray-900 mb-2">Event Description</h3>
                <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {event.requirements.map((req, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{allStudents.length}</div>
                  <div className="text-sm text-blue-700">Total Applications</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">{event.capacity}</div>
                  <div className="text-sm text-gray-700">Event Capacity</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{pendingStudents.length}</div>
                  <div className="text-sm text-orange-700">Pending Review</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{approvedStudents.length}</div>
                  <div className="text-sm text-green-700">Approved</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search students by name, email, university, or course..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export List
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>


             <Button onClick={handleSaveAll} variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white">
  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
  Save Changes
</Button>



              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {showBulkActions && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800">
                    {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleBulkAction('approve')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve Selected
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleBulkAction('reject')}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Selected
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedStudents([])}
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Students Tabs */}
        <Card>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pending" className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Pending ({pendingStudents.length})</span>
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Approved ({approvedStudents.length})</span>
                </TabsTrigger>
                <TabsTrigger value="rejected" className="flex items-center space-x-2">
                  <X className="h-4 w-4" />
                  <span>Rejected ({rejectedStudents.length})</span>
                </TabsTrigger>
                <TabsTrigger value="all" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>All ({allStudents.length})</span>
                </TabsTrigger>
              </TabsList>

              {/* Pending Students */}
              <TabsContent value="pending" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Students Awaiting Approval</h3>
                  {pendingStudents.length > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSelectAll('pending')}
                    >
                      Select All Pending
                    </Button>
                  )}
                </div>
                {pendingStudents.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                    <p className="text-gray-600">No pending student approvals.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingStudents.map(student => (
                      <Card key={student.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                              <Checkbox
                                checked={selectedStudents.includes(student.id)}
                                onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                              />
                              <Avatar className="h-12 w-12">
                                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-medium text-gray-900">{student.name}</h4>
                                  <Badge className={getStatusColor(student.status)}>
                                    {getStatusIcon(student.status)}
                                    <span className="ml-1 capitalize">{student.status}</span>
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                  <div>
                                    <div className="flex items-center mb-1">
                                      <Mail className="h-3 w-3 mr-1" />
                                      {student.email}
                                    </div>
                                    <div className="flex items-center">
                                      <GraduationCap className="h-3 w-3 mr-1" />
                                      {student.university}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-1">{student.course} - {student.year}</div>
                                    <div>GPA: {student.gpa}</div>
                                  </div>
                                  <div>
                                    <div className="mb-1">Skills: {student.skills.join(', ')}</div>
                                    <div>Availability: {student.availability}</div>
                                  </div>
                                </div>
                                {student.motivation && (
                                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                    <h5 className="text-sm font-medium text-gray-900 mb-1">Motivation</h5>
                                    <p className="text-sm text-gray-600">{student.motivation}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <Button
                                size="sm"
                                onClick={() => handleStudentAction(student.id, 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStudentAction(student.id, 'reject')}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Approved Students */}
              <TabsContent value="approved" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Approved Students</h3>
                  <div className="text-sm text-gray-600">
                    {approvedStudents.length} of {event.capacity} capacity
                  </div>
                </div>
                {approvedStudents.length === 0 ? (
                  <div className="text-center py-12">
                    <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No approved students yet</h3>
                    <p className="text-gray-600">Students you approve will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {approvedStudents.map(student => (
                      <Card key={student.id} className="border-green-200 bg-green-50">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-medium text-gray-900">{student.name}</h4>
                                  <Badge className={getStatusColor(student.status)}>
                                    {getStatusIcon(student.status)}
                                    <span className="ml-1 capitalize">{student.status}</span>
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                  <div>
                                    <div className="flex items-center mb-1">
                                      <Mail className="h-3 w-3 mr-1" />
                                      {student.email}
                                    </div>
                                    <div className="flex items-center">
                                      <GraduationCap className="h-3 w-3 mr-1" />
                                      {student.university}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-1">{student.course} - {student.year}</div>
                                    <div>GPA: {student.gpa}</div>
                                  </div>
                                  <div>
                                    <div className="mb-1">Skills: {student.skills.join(', ')}</div>
                                    <div>Availability: {student.availability}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStudentAction(student.id, 'reject')}
                              >
                                <UserX className="h-4 w-4 mr-1" />
                                Revoke
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Rejected Students */}
              <TabsContent value="rejected" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Rejected Students</h3>
                </div>
                {rejectedStudents.length === 0 ? (
                  <div className="text-center py-12">
                    <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No rejected students</h3>
                    <p className="text-gray-600">Students you reject will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rejectedStudents.map(student => (
                      <Card key={student.id} className="border-red-200 bg-red-50">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-medium text-gray-900">{student.name}</h4>
                                  <Badge className={getStatusColor(student.status)}>
                                    {getStatusIcon(student.status)}
                                    <span className="ml-1 capitalize">{student.status}</span>
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                  <div>
                                    <div className="flex items-center mb-1">
                                      <Mail className="h-3 w-3 mr-1" />
                                      {student.email}
                                    </div>
                                    <div className="flex items-center">
                                      <GraduationCap className="h-3 w-3 mr-1" />
                                      {student.university}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-1">{student.course} - {student.year}</div>
                                    <div>GPA: {student.gpa}</div>
                                  </div>
                                  <div>
                                    <div className="mb-1">Skills: {student.skills.join(', ')}</div>
                                    <div>Availability: {student.availability}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <Button
                                size="sm"
                                onClick={() => handleStudentAction(student.id, 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* All Students */}
              <TabsContent value="all" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">All Student Applications</h3>
                  <div className="text-sm text-gray-600">
                    Total: {allStudents.length} applications
                  </div>
                </div>
                <div className="space-y-4">
                  {allStudents.map(student => (
                    <Card key={student.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-medium text-gray-900">{student.name}</h4>
                                <Badge className={getStatusColor(student.status)}>
                                  {getStatusIcon(student.status)}
                                  <span className="ml-1 capitalize">{student.status}</span>
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div>
                                  <div className="flex items-center mb-1">
                                    <Mail className="h-3 w-3 mr-1" />
                                    {student.email}
                                  </div>
                                  <div className="flex items-center">
                                    <GraduationCap className="h-3 w-3 mr-1" />
                                    {student.university}
                                  </div>
                                </div>
                                <div>
                                  <div className="mb-1">{student.course} - {student.year}</div>
                                  <div>GPA: {student.gpa}</div>
                                </div>
                                <div>
                                  <div className="mb-1">Skills: {student.skills.join(', ')}</div>
                                  <div>Availability: {student.availability}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            {student.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleStudentAction(student.id, 'approve')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleStudentAction(student.id, 'reject')}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                            {student.status === 'approved' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStudentAction(student.id, 'reject')}
                              >
                                <UserX className="h-4 w-4 mr-1" />
                                Revoke
                              </Button>
                            )}
                            {student.status === 'rejected' && (
                              <Button
                                size="sm"
                                onClick={() => handleStudentAction(student.id, 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}