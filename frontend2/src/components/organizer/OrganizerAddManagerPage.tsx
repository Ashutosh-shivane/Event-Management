import React, { useState,useEffect } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
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
  AlertTriangle,
  DollarSign,
  Clock,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Eye
} from 'lucide-react';
import axios from 'axios';

interface RoleDefinition {
  id: string;
  title: string;
  description: string;
  budget: number;
  currency: string;
  responsibilities: string[];
  requirements: string[];
  deadline: string;
}

interface ManagerInvitation {
  id: string;
  managerId: string;
  roleId: string;
  status: 'PENDING' | 'ACCEPT' | 'DECLINE' | 'COUNTER_OFFER';
  originalBudget: number;
  counterOffer?: number;
  counterMessage?: string;
  sentAt: Date;
  respondedAt?: Date;
}

export function OrganizerAddManagerPage() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const { sendManagerInvitation } = useNotifications();
  const [activeTab, setActiveTab] = useState('roles');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const [isLoading ,setIsLoading]=useState(false);
  
  // Role definition state
  const [roleDefinitions, setRoleDefinitions] = useState<RoleDefinition[]>([
   
  ]);
  
  // Manager invitations state
   const [managerInvitations, setManagerInvitations] = useState<ManagerInvitation[]>([
  
  ]);
  
  // Form state for new role
  const [newRole, setNewRole] = useState({
    title: '',
    description: '',
    budget: '',
    currency: 'USD',
    responsibilities: [''],
    requirements: [''],
    deadline: ''
  });

  // Mock event data
  const [eventData,setEventData] =useState( {
    id: eventId || '0',
    title: '',
    date: '',
    venue: ''
  });

  // Mock available managers

  const[availableManagers,setAvailableManagers]=useState([]);

  

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

  


  function mapInvitations(invitationList:any): ManagerInvitation[] {
  return invitationList.map(invite => ({
    id: String(invite.id),
    managerId: invite.userid,
    roleId: invite.roleid,
    status: invite.status || "PENDING",
    originalBudget:  0,
    counterOffer:   Number(invite.proposed_budget)? Number(invite.proposed_budget) : 0,
    counterMessage: invite.manager_msg || undefined,
    sentAt: invite.sentAt ? new Date(invite.sentAt) : new Date(),
    respondedAt: invite.respondedAt ? new Date(invite.respondedAt) : undefined,
  }));
}

function mapInvitationSingle(invite: any): ManagerInvitation {
  return {
    id: String(invite.id),
    managerId: invite.userid,
    roleId: invite.roleid,
    status: invite.status || "PENDING",
    originalBudget: 0,
    counterOffer: Number(invite.proposed_budget) ? Number(invite.proposed_budget) : 0,
    counterMessage: invite.manager_msg || undefined,
    sentAt: invite.sentAt ? new Date(invite.sentAt) : new Date(),
    respondedAt: invite.respondedAt ? new Date(invite.respondedAt) : undefined,
  };
}



  function mapManagers(managerlist) {
  return managerlist.map(manager => ({
    id: String(manager.id),
    name: manager.name,
    email: manager.username || "",
    role: manager.role || "Manager",
    experience: manager.years_exp ? `${manager.years_exp}+ years` : "Not specified",
    specialties: manager.specializations ? manager.specializations.split(',') : [],
    rating: manager.rating ? parseFloat(manager.rating) : 0,
    eventsManaged:  "Not specified", // fake number until backend gives it
    available: manager.availability !== null ? manager.availability : false
  }));
}



  useEffect(()=>{

     const fetchData = async () => {
    try{

      console.log(eventId+"   here check eventid");

       const res = await axios.get(`http://localhost:8080/OME/GetData/${eventId}`)
      .then((res)=>{
        console.log(res.data);

        const test=mapManagers(res.data.managerlist);
        console.log(test);

        const invitationlist=mapInvitations(res.data.invitationList);

        const tempevent={
           id: res.data.event.id,
    title: res.data.event.title,
    date: res.data.event.startAt,
    venue: res.data.event.location

        }

        setManagerInvitations(invitationlist);

        setAvailableManagers(test);

        setEventData(tempevent);


         const mappedRoles: RoleDefinition[] = res.data.rolelist.map((role: any) => ({
  id: role.id ? role.id.toString() : Date.now().toString(),
  title: role.title,
  description: role.description,
  budget: parseFloat(role.budget),
  currency: role.currency,
  responsibilities: role.responsibilities
    ? role.responsibilities.split(",").map((r: string) => r.trim()).filter((r: string) => r !== "")
    : [],
  requirements: role.requirments
    ? role.requirments.split(",").map((r: string) => r.trim()).filter((r: string) => r !== "")
    : [],
  deadline: role.deadline
}));

        setRoleDefinitions(mappedRoles);

      })


    }catch(err){
      console.log(err);
    }
  }
      fetchData();
  },[eventId]);



  const filteredManagers = availableManagers.filter(manager => 
    (manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     manager.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
     manager.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    manager.available
  );

  const addResponsibility = () => {
    setNewRole(prev => ({
      ...prev,
      responsibilities: [...prev.responsibilities, '']
    }));
  };

  const removeResponsibility = (index: number) => {
    setNewRole(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }));
  };

  const updateResponsibility = (index: number, value: string) => {
    setNewRole(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.map((item, i) => i === index ? value : item)
    }));
  };

  const addRequirement = () => {
    setNewRole(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index: number) => {
    setNewRole(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setNewRole(prev => ({
      ...prev,
      requirements: prev.requirements.map((item, i) => i === index ? value : item)
    }));
  };

  const  handleCreateRole = async () => {
    if (!newRole.title || !newRole.budget || !newRole.deadline) {
      alert('Please fill in all required fields');
      return;
    }


    try{

      console.log(newRole);



      const payload = {
  title: newRole.title,
  description: newRole.description,
  budget: newRole.budget,
  currency:newRole.currency,
  responsibilities: newRole.responsibilities.join(","),     // "b"
  requirments: newRole.requirements.join(","),      // "2342"
  eventid:eventId ,
  deadline: newRole.deadline
};


     const res=await  axios.post("http://localhost:8080/OME/save/Role",payload);

     console.log(res.data);



     const mappedRoles: RoleDefinition[] = res.data.map((role: any) => ({
  id: role.id ? role.id.toString() : Date.now().toString(),
  title: role.title,
  description: role.description,
  budget: parseFloat(role.budget),
  currency: role.currency,
  responsibilities: role.responsibilities
    ? role.responsibilities.split(",").map((r: string) => r.trim()).filter((r: string) => r !== "")
    : [],
  requirements: role.requirments
    ? role.requirments.split(",").map((r: string) => r.trim()).filter((r: string) => r !== "")
    : [],
  deadline: role.deadline
}));


 setRoleDefinitions(mappedRoles);

    
    
    alert('Role created successfully!');

    }catch(err){
      console.log(err);
    }



   
  };

  const removeRole = (roleId: string) => {
    setRoleDefinitions(prev => prev.filter(role => role.id !== roleId));
    setManagerInvitations(prev => prev.filter(inv => inv.roleId !== roleId));
  };

  const sendInvitationToManager = async (managerId: string, roleId: string) => {

    console.log(managerId,roleId);

    const role = roleDefinitions.find(r => r.id === roleId);
    const manager = availableManagers.find(m => m.id === managerId);

    console.log(role);
    console.log(manager);
    
    if (!role || !manager) return;

    // Check if invitation already exists
    const existingInvitation = managerInvitations.find(
      inv => inv.managerId === managerId && inv.roleId === roleId
    );
    
    if (existingInvitation) {
      alert('Invitation already sent to this manager for this role');
      return;
    }

    setIsInviting(true);
    try {
      // Create new invitation
      

      const payload={
        eventid:eventId,
        roleid:roleId,
        userid:managerId,
        sentAt: new Date().toISOString(),
        status:"SENT"

      }

      var invitation:ManagerInvitation;
      try{
      const res=await axios.post("http://localhost:8080/OME/SaveManagerInvitation",payload);

     invitation =mapInvitationSingle(res.data);

      }catch(error){
        console.log(error);

      }

      



    



      setManagerInvitations(prev => [...prev, invitation]);

     

      
      
      alert(`Invitation sent to ${manager.name} for ${role.title} role!`);
    } catch (error) {
      console.error('Failed to send invitation:', error);
      alert('Failed to send invitation. Please try again.');
    } finally {
      setIsInviting(false);
    }
  };

  const handleManagerSelection = async (invitationId: string) => {
    const invitation = managerInvitations.find(inv => inv.id === invitationId);
    const manager = availableManagers.find(m => m.id === invitation?.managerId);
    const role = roleDefinitions.find(r => r.id === invitation?.roleId);
    
    if (invitation && manager && role) {
      const finalBudget = invitation.counterOffer || invitation.originalBudget;
      alert(`Selected ${manager.name} for ${role.title} role with budget ${role.currency} ${finalBudget}`);
      
      // Update invitation status to selected




     
      // Create new invitation
      

      

      
      try{
      const res=await axios.patch(`http://localhost:8080/OME/SelectManagerByOrg/${invitationId}/${invitation?.managerId}`);


       const invitationlist=mapInvitations(res.data);

       console.log(invitationlist);


        setManagerInvitations(invitationlist);

       

     

      }catch(error){
        console.log(error);

      }

      


      setManagerInvitations(prev => prev.map(inv => 
        inv.id === invitationId 
          ? { ...inv, status: 'ACCEPT' as const }
          : inv.roleId === invitation.roleId 
            ? { ...inv, status: 'DECLINE' as const }
            : inv
      ));
    }
  };

  const getManagersForRole = (roleId: string) => {
    const role = roleDefinitions.find(r => r.id === roleId);
    if (!role) return [];
    
    return availableManagers.filter(manager => 
      manager.specialties.some(specialty => 
        role.title.toLowerCase().includes(specialty.toLowerCase()) ||
        specialty.toLowerCase().includes(role.title.toLowerCase())
      ) || manager.role.toLowerCase().includes(role.title.toLowerCase())
    );
  };

  const getInvitationStatus = (managerId: string, roleId: string) => {
    return managerInvitations.find(inv => inv.managerId === managerId && inv.roleId === roleId);
  };


  const LoaderPopup = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center space-y-4 border border-gray-200">
      <svg
        className="animate-spin h-10 w-10 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <p className="text-gray-700 font-semibold text-lg">Sending Invitation...</p>
    </div>
  </div>
);



  return (




    <div className="min-h-screen bg-gray-50 py-8">

      {isLoading && <LoaderPopup />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Event Team</h1>
            <p className="text-gray-600">
              Define roles, set budgets, and invite managers for "{eventData.title}" on {eventData.date}
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roles">Role Definitions</TabsTrigger>
            <TabsTrigger value="managers">Available Managers</TabsTrigger>
            <TabsTrigger value="invitations">Invitation Status</TabsTrigger>
          </TabsList>

          {/* Role Definitions Tab */}
          <TabsContent value="roles" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create New Role */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Role
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Role Title *</Label>
                    <Input
                      value={newRole.title}
                      onChange={(e) => setNewRole(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Event Manager"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newRole.description}
                      onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the role..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Budget *</Label>
                      <Input
                        type="number"
                        value={newRole.budget}
                        onChange={(e) => setNewRole(prev => ({ ...prev, budget: e.target.value }))}
                        placeholder="5000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select 
                        value={newRole.currency} 
                        onValueChange={(value) => setNewRole(prev => ({ ...prev, currency: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Application Deadline *</Label>
                    <Input
                      type="date"
                      value={newRole.deadline}
                      onChange={(e) => setNewRole(prev => ({ ...prev, deadline: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Responsibilities</Label>
                    {newRole.responsibilities.map((responsibility, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={responsibility}
                          onChange={(e) => updateResponsibility(index, e.target.value)}
                          placeholder="Enter responsibility..."
                        />
                        {newRole.responsibilities.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeResponsibility(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addResponsibility}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Responsibility
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Requirements</Label>
                    {newRole.requirements.map((requirement, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={requirement}
                          onChange={(e) => updateRequirement(index, e.target.value)}
                          placeholder="Enter requirement..."
                        />
                        {newRole.requirements.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeRequirement(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addRequirement}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Requirement
                    </Button>
                  </div>

                  <Button onClick={handleCreateRole} className="w-full">
                    Create Role
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Roles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="h-5 w-5 mr-2" />
                    Defined Roles ({roleDefinitions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {roleDefinitions.length > 0 ? (
                    <div className="space-y-4">
                      {roleDefinitions.map((role) => (
                        <div key={role.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{role.title}</h4>
                              <p className="text-sm text-gray-600">{role.description}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRole(role.id)

                              
                              }

                             style={{ display: "none" }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {role.currency} {role.budget}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              Due: {role.deadline}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <Label className="text-xs">Responsibilities:</Label>
                              <ul className="text-xs text-gray-600 list-disc list-inside">
                                {role.responsibilities.map((resp, index) => (
                                  <li key={index}>{resp}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <Label className="text-xs">Requirements:</Label>
                              <ul className="text-xs text-gray-600 list-disc list-inside">
                                {role.requirements.map((req, index) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Crown className="mx-auto h-12 w-12 text-gray-300" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No roles defined</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Create roles to start inviting managers.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Available Managers Tab */}
          <TabsContent value="managers" className="space-y-6">
            {roleDefinitions.length === 0 ? (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Please define at least one role before inviting managers.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-8">
                {roleDefinitions.map((role) => (
                  <Card key={role.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          Managers for {role.title}
                        </div>
                        <Badge variant="outline">
                          Budget: {role.currency} {role.budget}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {getManagersForRole(role.id).map((manager) => {
                          const invitation = getInvitationStatus(manager.id, role.id);
                          return (
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
                                
                                <div className="flex items-center gap-2">
                                  {invitation ? (
                                    <Badge 
                                      variant={
                                        invitation.status === 'ACCEPT' ? 'default' :
                                        invitation.status === 'COUNTER_OFFER' ? 'secondary' :
                                        invitation.status === 'DECLINE' ? 'destructive' :
                                        'outline'
                                      }
                                    >
                                      {invitation.status === 'ACCEPT' ? 'ACCEPT' :
                                       invitation.status === 'COUNTER_OFFER' ? 'Counter Offer' :
                                       invitation.status === 'DECLINE' ? 'DECLINE' :
                                       'PENDING'}
                                    </Badge>
                                  ) : (
                                    <Button
                                      size="sm"
                                      onClick={() => sendInvitationToManager(manager.id, role.id)}
                                      disabled={isInviting}
                                    >
                                      {isInviting ? 'Sending...' : 'Invite'}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        
                        {getManagersForRole(role.id).length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <Users className="mx-auto h-12 w-12 text-gray-300" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No suitable managers found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              No managers match the specialties for this role.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Invitation Status Tab */}
          <TabsContent value="invitations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Invitation Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {managerInvitations.length > 0 ? (
                  <div className="space-y-4">
                    {managerInvitations.map((invitation) => {
                      const manager = availableManagers.find(m => m.id === invitation.managerId);
                      const role = roleDefinitions.find(r => r.id === invitation.roleId);
                      
                      if (!manager || !role) return null;
                      
                      return (
                      <div
  key={invitation.id}
  className={`border rounded-lg p-4 space-y-3 ${
    invitation.status === 'SELECTED' ? 'bg-green-100' : 'bg-white'
  }`}
>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{manager.name}</h4>
                                <Badge variant="outline">{role.title}</Badge>
                                <Badge 
                                  variant={
                                    invitation.status === 'ACCEPT' ? 'default' :
                                    invitation.status === 'COUNTER_OFFER' ? 'secondary' :
                                    invitation.status === 'DECLINE' ? 'destructive' :
                                    invitation.status === 'SELECTED' ? 'success' :
                                    'outline'
                                  }
                                >
                                  {invitation.status === 'ACCEPT' ? 'ACCEPT' :
                                   invitation.status === 'COUNTER_OFFER' ? 'Counter Offer' :
                                   invitation.status === 'DECLINE' ? 'DECLINE' :
                                   invitation.status === 'SELECTED' ? 'SELECTED' :
                                   'PENDING'}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                                <div>
                                  <span className="font-medium">Original Budget:</span> {role.currency} {invitation.originalBudget}
                                </div>
                                {invitation.counterOffer && (
                                  <div>
                                    <span className="font-medium">Counter Offer:</span> {role.currency} {invitation.counterOffer}
                                  </div>
                                )}
                                <div>
                                  <span className="font-medium">Sent:</span> {invitation.sentAt.toLocaleDateString()}
                                </div>
                                {invitation.respondedAt && (
                                  <div>
                                    <span className="font-medium">Responded:</span> {invitation.respondedAt.toLocaleDateString()}
                                  </div>
                                )}
                              </div>

                              {invitation.counterMessage && (
                                <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
                                  <p className="text-sm"><strong>Manager's Message:</strong></p>
                                  <p className="text-sm text-gray-700">{invitation.counterMessage}</p>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex gap-2">
                              {(invitation.status === 'ACCEPT' || invitation.status === 'COUNTER_OFFER') && (
                                <Button
                                  size="sm"
                                  onClick={() => handleManagerSelection(invitation.id)}
                                >
                                  Select Manager
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Mail className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No invitations sent</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Start by defining roles and inviting managers.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}