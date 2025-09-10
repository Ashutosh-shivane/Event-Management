import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase,
  Award,
  Star,
  Camera,
  Save,
  Edit3,
  CheckCircle,
  AlertCircle,
  Building,
  Users,
  TrendingUp
} from 'lucide-react';

export function ManagerProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    
    // Professional Information
    jobTitle: user?.jobTitle || '',
    company: user?.company || '',
    industry: user?.industry || '',
    yearsExperience: user?.yearsExperience || '',
    currentSalary: user?.currentSalary || '',
    expectedSalary: user?.expectedSalary || '',
    
    // Management Information
    teamSize: user?.teamSize || '',
    managementLevel: user?.managementLevel || '',
    specializations: user?.specializations || [],
    certifications: user?.certifications || [],
    languages: user?.languages || [],
    
    // Personal Information
    bio: user?.bio || '',
    achievements: user?.achievements || '',
    managementPhilosophy: user?.managementPhilosophy || '',
    
    // Event Management Experience
    eventTypes: user?.eventTypes || [],
    eventSizes: user?.eventSizes || [],
    budgetRange: user?.budgetRange || '',
    availability: user?.availability || '',
    preferredRoles: user?.preferredRoles || [],
    
    // References
    references: user?.references || [
      { name: '', position: '', company: '', email: '', phone: '' }
    ],
    
    // Emergency Contact
    emergencyContactName: user?.emergencyContactName || '',
    emergencyContactPhone: user?.emergencyContactPhone || '',
    emergencyContactRelation: user?.emergencyContactRelation || ''
  });

  const calculateProfileCompletion = () => {
    const requiredFields = [
      'name', 'email', 'phone', 'jobTitle', 'company', 'yearsExperience', 
      'managementLevel', 'bio', 'specializations', 'eventTypes'
    ];
    const optionalFields = [
      'address', 'industry', 'teamSize', 'certifications', 'languages',
      'achievements', 'managementPhilosophy', 'budgetRange', 'availability',
      'emergencyContactName', 'emergencyContactPhone'
    ];
    
    const completedRequired = requiredFields.filter(field => {
      if (Array.isArray(formData[field])) {
        return formData[field].length > 0;
      }
      return formData[field] && formData[field].length > 0;
    }).length;
    
    const completedOptional = optionalFields.filter(field => {
      if (Array.isArray(formData[field])) {
        return formData[field].length > 0;
      }
      return formData[field] && formData[field].length > 0;
    }).length;
    
    const totalFields = requiredFields.length + optionalFields.length;
    const completedFields = completedRequired + completedOptional;
    
    return Math.round((completedFields / totalFields) * 100);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: items
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (updateUser) {
        updateUser({
          ...user,
          ...formData,
          profileCompletion: calculateProfileCompletion()
        });
      }
      
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const profileCompletion = calculateProfileCompletion();

  const specializationOptions = [
    'Event Planning', 'Project Management', 'Team Leadership', 'Budget Management',
    'Vendor Relations', 'Marketing', 'Logistics', 'Risk Management', 
    'Stakeholder Management', 'Quality Assurance', 'Operations', 'Strategy'
  ];

  const eventTypeOptions = [
    'Corporate Events', 'Conferences', 'Trade Shows', 'Workshops', 
    'Cultural Events', 'Sports Events', 'Fundraisers', 'Product Launches',
    'Educational Events', 'Social Events', 'Virtual Events', 'Hybrid Events'
  ];

  const roleOptions = [
    'Event Manager', 'Project Manager', 'Operations Manager', 'Marketing Manager',
    'Logistics Manager', 'Budget Manager', 'Vendor Manager', 'Team Lead'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/api/placeholder/80/80" />
                    <AvatarFallback className="text-xl">
                      {formData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 p-2">
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>
                
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{formData.name || 'Manager Profile'}</h1>
                  <p className="text-gray-600">{formData.jobTitle} at {formData.company}</p>
                  <p className="text-sm text-gray-500">{formData.yearsExperience} years experience • {formData.managementLevel}</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <Badge variant="outline" className="bg-blue-50">
                      <Briefcase className="h-3 w-3 mr-1" />
                      Manager
                    </Badge>
                    <Badge variant="outline" className="bg-green-50">
                      <Star className="h-3 w-3 mr-1" />
                      4.8 Rating
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Profile Completion</span>
                  <Progress value={profileCompletion} className="w-32 mt-1" />
                  <span className="text-xs text-gray-500">{profileCompletion}%</span>
                </div>
                
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          {/* Basic Information */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="border-t pt-4 mt-6">
                  <Label htmlFor="bio">Professional Bio *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Describe your professional background, experience, and what makes you an effective manager..."
                    rows={4}
                  />
                </div>

                {/* Emergency Contact */}
                <div className="border-t pt-4 mt-6">
                  <h3 className="font-medium mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="emergencyContactName">Contact Name</Label>
                      <Input
                        id="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                      <Input
                        id="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="emergencyContactRelation">Relationship</Label>
                      <Select 
                        value={formData.emergencyContactRelation}
                        onValueChange={(value) => handleInputChange('emergencyContactRelation', value)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="colleague">Colleague</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Information */}
          <TabsContent value="professional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobTitle">Current Job Title *</Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Select 
                      value={formData.industry}
                      onValueChange={(value) => handleInputChange('industry', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="media">Media & Entertainment</SelectItem>
                        <SelectItem value="nonprofit">Non-profit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="yearsExperience">Years of Experience *</Label>
                    <Select 
                      value={formData.yearsExperience}
                      onValueChange={(value) => handleInputChange('yearsExperience', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16-20">16-20 years</SelectItem>
                        <SelectItem value="20+">20+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="currentSalary">Current Salary (Optional)</Label>
                    <Input
                      id="currentSalary"
                      type="number"
                      value={formData.currentSalary}
                      onChange={(e) => handleInputChange('currentSalary', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Annual salary"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="expectedSalary">Expected Salary (Optional)</Label>
                    <Input
                      id="expectedSalary"
                      type="number"
                      value={formData.expectedSalary}
                      onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Expected annual salary"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="languages">Languages (comma-separated)</Label>
                  <Input
                    id="languages"
                    value={formData.languages.join(', ')}
                    onChange={(e) => handleArrayInputChange('languages', e.target.value)}
                    disabled={!isEditing}
                    placeholder="English, Spanish, French..."
                  />
                </div>

                <div>
                  <Label htmlFor="certifications">Certifications (comma-separated)</Label>
                  <Input
                    id="certifications"
                    value={formData.certifications.join(', ')}
                    onChange={(e) => handleArrayInputChange('certifications', e.target.value)}
                    disabled={!isEditing}
                    placeholder="PMP, Agile, Six Sigma..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Management Information */}
          <TabsContent value="management" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Management Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="managementLevel">Management Level *</Label>
                    <Select 
                      value={formData.managementLevel}
                      onValueChange={(value) => handleInputChange('managementLevel', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="team-lead">Team Lead</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="senior-manager">Senior Manager</SelectItem>
                        <SelectItem value="director">Director</SelectItem>
                        <SelectItem value="vp">VP</SelectItem>
                        <SelectItem value="c-level">C-Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Select 
                      value={formData.teamSize}
                      onValueChange={(value) => handleInputChange('teamSize', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 people</SelectItem>
                        <SelectItem value="6-10">6-10 people</SelectItem>
                        <SelectItem value="11-25">11-25 people</SelectItem>
                        <SelectItem value="26-50">26-50 people</SelectItem>
                        <SelectItem value="50+">50+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="specializations">Specializations *</Label>
                  <Input
                    id="specializations"
                    value={formData.specializations.join(', ')}
                    onChange={(e) => handleArrayInputChange('specializations', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Event Planning, Project Management, Team Leadership..."
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {specializationOptions.map(spec => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="managementPhilosophy">Management Philosophy</Label>
                  <Textarea
                    id="managementPhilosophy"
                    value={formData.managementPhilosophy}
                    onChange={(e) => handleInputChange('managementPhilosophy', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Describe your management style and philosophy..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="achievements">Key Achievements</Label>
                  <Textarea
                    id="achievements"
                    value={formData.achievements}
                    onChange={(e) => handleInputChange('achievements', e.target.value)}
                    disabled={!isEditing}
                    placeholder="List your major professional achievements and accomplishments..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Management Experience */}
          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Event Management Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="eventTypes">Event Types Experience *</Label>
                  <Input
                    id="eventTypes"
                    value={formData.eventTypes.join(', ')}
                    onChange={(e) => handleArrayInputChange('eventTypes', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Corporate Events, Conferences, Trade Shows..."
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {eventTypeOptions.map(type => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventSizes">Event Sizes Managed</Label>
                    <Input
                      id="eventSizes"
                      value={formData.eventSizes.join(', ')}
                      onChange={(e) => handleArrayInputChange('eventSizes', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Small (50-100), Medium (100-500), Large (500+)..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="budgetRange">Budget Range Experience</Label>
                    <Select 
                      value={formData.budgetRange}
                      onValueChange={(value) => handleInputChange('budgetRange', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-10k">Under $10K</SelectItem>
                        <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                        <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                        <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                        <SelectItem value="over-1m">Over $1M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Work Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="preferredRoles">Preferred Management Roles</Label>
                  <Input
                    id="preferredRoles"
                    value={formData.preferredRoles.join(', ')}
                    onChange={(e) => handleArrayInputChange('preferredRoles', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Event Manager, Project Manager, Operations Manager..."
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {roleOptions.map(role => (
                      <Badge key={role} variant="outline" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select 
                    value={formData.availability}
                    onValueChange={(value) => handleInputChange('availability', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="weekends-only">Weekends Only</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        {isEditing && (
          <Card className="mt-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {profileCompletion < 70 && (
                    <div className="flex items-center text-amber-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Complete more fields to improve your profile</span>
                    </div>
                  )}
                  {profileCompletion >= 70 && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Great! Your profile is well-completed</span>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="min-w-[120px]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}