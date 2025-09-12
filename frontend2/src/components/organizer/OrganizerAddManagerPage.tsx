import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNotifications } from '../NotificationContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  ArrowLeft,
  UserPlus,
  Search,
  Mail,
  CheckCircle,
  X,
  Plus,
  Users,
  Crown,
  Settings,
  AlertTriangle
} from 'lucide-react';

export function OrganizerAddManagerPage() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const { sendManagerInvitation } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedManagers, setSelectedManagers] = useState<any[]>([]);
  const [isInviting, setIsInviting] = useState(false);

  // Mock event data
  const eventData = {
    id: eventId || '1',
    title: 'Tech Conference 2024',
    date: '2024-03-15',
    venue: 'Convention Center'
  };

  // Mock available managers
  const availableManagers = [
    { 
      id: '1', 
      name: 'Sarah Johnson', 
      email: 'sarah.johnson@example.com', 
      role: 'Event Manager',
      experience: '5+ years',
      specialties: ['Event Planning', 'Logistics', 'Vendor Management'],
      rating: 4.8,
      eventsManaged: 25,
      available: true
    },
    { 
      id: '2', 
      name: 'Mike Chen', 
      email: 'mike.chen@example.com', 
      role: 'Logistics Manager',
      experience: '3+ years',
      specialties: ['Logistics', 'Operations', 'Team Coordination'],
      rating: 4.6,
      eventsManaged: 18,
      available: true
    },
    { 
      id: '3', 
      name: 'Emily Davis', 
      email: 'emily.davis@example.com', 
      role: 'Registration Manager',
      experience: '4+ years',
      specialties: ['Registration', 'Customer Service', 'Data Management'],
      rating: 4.9,
      eventsManaged: 32,
      available: false
    },
    { 
      id: '4', 
      name: 'David Wilson', 
      email: 'david.wilson@example.com', 
      role: 'Marketing Manager',
      experience: '6+ years',
      specialties: ['Marketing', 'Social Media', 'Promotion'],
      rating: 4.7,
      eventsManaged: 29,
      available: true
    },
    { 
      id: '5', 
      name: 'Lisa Anderson', 
      email: 'lisa.anderson@example.com', 
      role: 'Financial Manager',
      experience: '7+ years',
      specialties: ['Finance', 'Budget Management', 'Reporting'],
      rating: 4.8,
      eventsManaged: 34,
      available: true
    }
  ];

  const managerRoles = [
    'Event Manager',
    'Logistics Manager', 
    'Registration Manager',
    'Marketing Manager',
    'Financial Manager',
    'Operations Manager',
    'Volunteer Coordinator',
    'Vendor Relations Manager'
  ];

  const managerPermissions = [
    'Manage Volunteers',
    'Manage Vendors',
    'Manage Budget',
    'Edit Event Details',
    'Send Notifications',
    'View Reports',
    'Approve Registrations',
    'Manage Tasks',
    'Access Financial Data',
    'Manage Marketing'
  ];

  const filteredManagers = availableManagers.filter(manager => 
    (manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     manager.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
     manager.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    manager.available
  );

  const addManager = (manager: any) => {
    if (!selectedManagers.find(m => m.id === manager.id)) {
      setSelectedManagers([...selectedManagers, {
        ...manager,
        assignedRole: manager.role,
        permissions: [],
        customMessage: ''
      }]);
    }
  };

  const removeManager = (managerId: string) => {
    setSelectedManagers(selectedManagers.filter(m => m.id !== managerId));
  };

  const updateManagerRole = (managerId: string, role: string) => {
    setSelectedManagers(selectedManagers.map(manager => 
      manager.id === managerId ? { ...manager, assignedRole: role } : manager
    ));
  };

  const togglePermission = (managerId: string, permission: string) => {
    setSelectedManagers(selectedManagers.map(manager => {
      if (manager.id === managerId) {
        const currentPermissions = manager.permissions;
        const updatedPermissions = currentPermissions.includes(permission)
          ? currentPermissions.filter((p: string) => p !== permission)
          : [...currentPermissions, permission];
        return { ...manager, permissions: updatedPermissions };
      }
      return manager;
    }));
  };

  const updateCustomMessage = (managerId: string, message: string) => {
    setSelectedManagers(selectedManagers.map(manager => 
      manager.id === managerId ? { ...manager, customMessage: message } : manager
    ));
  };

  const handleInviteManagers = async () => {
    if (selectedManagers.length === 0) return;

    setIsInviting(true);
    try {
      // Send notifications to each selected manager
      for (const manager of selectedManagers) {
        sendManagerInvitation({
          managerId: manager.id,
          managerName: manager.name,
          managerEmail: manager.email,
          eventId: eventData.id,
          eventTitle: eventData.title,
          organizerId: user?.id || '1',
          organizerName: user?.name || 'Current Organizer',
          assignedRole: manager.assignedRole,
          permissions: manager.permissions,
          customMessage: manager.customMessage,
        });
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`Successfully sent invitations to ${selectedManagers.length} manager(s)! They will receive notifications.`);
      navigate('/organizer/manage-events');
    } catch (error) {
      console.error('Failed to invite managers:', error);
      alert('Failed to send invitations. Please try again.');
    } finally {
      setIsInviting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/organizer/manage-events')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Event Management
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Managers to Event</h1>
            <p className="text-gray-600">
              Assign managers to help you organize "{eventData.title}" on {eventData.date}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Manager Search */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Find Managers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Search by name, email, or specialty</Label>
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search managers..."
                      className="w-full"
                    />
                  </div>

                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {filteredManagers.length > 0 ? (
                      filteredManagers.map((manager) => (
                        <div
                          key={manager.id}
                          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{manager.name}</h4>
                                <Badge variant="outline">{manager.role}</Badge>
                                <div className="flex items-center">
                                  <span className="text-yellow-500">★</span>
                                  <span className="text-sm text-gray-600 ml-1">{manager.rating}</span>
                                </div>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-2">{manager.email}</p>
                              
                              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                                <span>{manager.experience} experience</span>
                                <span>{manager.eventsManaged} events managed</span>
                              </div>
                              
                              <div className="flex flex-wrap gap-1">
                                {manager.specialties.map((specialty, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <Button
                              size="sm"
                              onClick={() => addManager(manager)}
                              disabled={selectedManagers.some(m => m.id === manager.id)}
                            >
                              {selectedManagers.some(m => m.id === manager.id) ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <Plus className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        {searchQuery ? 'No managers found matching your search' : 'Enter search terms to find managers'}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Managers */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Selected Managers ({selectedManagers.length})
                  </div>
                  {selectedManagers.length > 0 && (
                    <Button 
                      onClick={handleInviteManagers}
                      disabled={isInviting}
                    >
                      {isInviting ? 'Sending Invites...' : 'Send Invitations'}
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedManagers.length > 0 ? (
                  <div className="space-y-6">
                    {selectedManagers.map((manager) => (
                      <div key={manager.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">
                                {manager.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium">{manager.name}</h4>
                              <p className="text-sm text-gray-600">{manager.email}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeManager(manager.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Role Assignment */}
                        <div className="space-y-2">
                          <Label>Assigned Role</Label>
                          <Select 
                            value={manager.assignedRole} 
                            onValueChange={(value) => updateManagerRole(manager.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {managerRoles.map(role => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Permissions */}
                        <div className="space-y-3">
                          <Label>Permissions</Label>
                          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                            {managerPermissions.map((permission) => (
                              <div key={permission} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${manager.id}-${permission}`}
                                  checked={manager.permissions.includes(permission)}
                                  onCheckedChange={() => togglePermission(manager.id, permission)}
                                />
                                <Label 
                                  htmlFor={`${manager.id}-${permission}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {permission}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Custom Message */}
                        <div className="space-y-2">
                          <Label>Custom Message (Optional)</Label>
                          <Textarea
                            value={manager.customMessage}
                            onChange={(e) => updateCustomMessage(manager.id, e.target.value)}
                            placeholder="Add a personal message to the invitation..."
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No managers selected</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Search and select managers from the list to assign them to your event.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Information Alert */}
            <Alert>
              <Crown className="h-4 w-4" />
              <AlertDescription>
                <strong>About Manager Assignments:</strong><br />
                • Managers will receive email invitations with event access<br />
                • You can modify permissions and roles at any time<br />
                • Managers can only perform actions you've authorized<br />
                • You remain the primary organizer with full control
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}