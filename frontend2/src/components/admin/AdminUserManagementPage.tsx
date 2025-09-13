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
  Users, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Calendar,
  Shield
} from 'lucide-react';

export function AdminUserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1-555-0123',
      role: 'student',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-03-10',
      eventsParticipated: 12,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1-555-0124',
      role: 'organizer',
      status: 'active',
      joinDate: '2023-11-20',
      lastLogin: '2024-03-09',
      eventsCreated: 8,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@catering.com',
      phone: '+1-555-0125',
      role: 'vendor',
      status: 'pending',
      joinDate: '2024-03-05',
      lastLogin: '2024-03-08',
      servicesOffered: 5,
      rating: 4.6
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@events.com',
      phone: '+1-555-0126',
      role: 'manager',
      status: 'active',
      joinDate: '2023-12-10',
      lastLogin: '2024-03-10',
      eventsManaged: 15,
      rating: 4.7
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@student.edu',
      phone: '+1-555-0127',
      role: 'student',
      status: 'suspended',
      joinDate: '2024-02-01',
      lastLogin: '2024-03-01',
      eventsParticipated: 3,
      rating: 3.2
    }
  ];

  const stats = [
    { label: 'Total Users', value: 2847, change: '+12%', color: 'blue' },
    { label: 'Active Users', value: 2234, change: '+8%', color: 'green' },
    { label: 'Pending Approval', value: 45, change: '-5%', color: 'yellow' },
    { label: 'Suspended', value: 12, change: '+2%', color: 'red' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'organizer': return 'bg-blue-100 text-blue-800';
      case 'manager': return 'bg-green-100 text-green-800';
      case 'vendor': return 'bg-yellow-100 text-yellow-800';
      case 'student': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const UserDetailsModal = ({ user }: { user: any }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          User Details - {user.name}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <p>{user.name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              {user.email}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <p className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              {user.phone}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Role</label>
            <Badge className={getRoleColor(user.role)}>
              {user.role}
            </Badge>
          </div>
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <Badge className={getStatusColor(user.status)}>
              {user.status}
            </Badge>
          </div>
          <div>
            <label className="text-sm text-gray-600">Join Date</label>
            <p className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {user.joinDate}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Last Login</label>
            <p>{user.lastLogin}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Rating</label>
            <p>{user.rating}/5.0</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-3">Activity Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            {user.eventsParticipated && (
              <div>
                <label className="text-sm text-gray-600">Events Participated</label>
                <p>{user.eventsParticipated}</p>
              </div>
            )}
            {user.eventsCreated && (
              <div>
                <label className="text-sm text-gray-600">Events Created</label>
                <p>{user.eventsCreated}</p>
              </div>
            )}
            {user.eventsManaged && (
              <div>
                <label className="text-sm text-gray-600">Events Managed</label>
                <p>{user.eventsManaged}</p>
              </div>
            )}
            {user.servicesOffered && (
              <div>
                <label className="text-sm text-gray-600">Services Offered</label>
                <p>{user.servicesOffered}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button>Edit User</Button>
          <Button variant="outline">Send Message</Button>
          {user.status === 'active' ? (
            <Button variant="outline" className="text-red-600">Suspend</Button>
          ) : (
            <Button variant="outline" className="text-green-600">Activate</Button>
          )}
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>User Management</h1>
        <Button>Add New User</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p>{stat.value.toLocaleString()}</p>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="organizer">Organizer</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="vendor">Vendor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p>{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>{user.rating}/5.0</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <UserDetailsModal user={user} />
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {user.status === 'active' ? (
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Ban className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="text-green-600">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete User</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {user.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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