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
  Building,
  Award,
  Star,
  Camera,
  Save,
  Edit3,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Users,
  TrendingUp,
  Globe,
  DollarSign
} from 'lucide-react';

export function OrganizerProfilePage() {
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
    
    // Organization Information
    organizationName: user?.organizationName || '',
    organizationType: user?.organizationType || '',
    industry: user?.industry || '',
    establishedYear: user?.establishedYear || '',
    website: user?.website || '',
    socialMedia: user?.socialMedia || {},
    
    // Professional Information
    jobTitle: user?.jobTitle || '',
    yearsExperience: user?.yearsExperience || '',
    specializations: user?.specializations || [],
    certifications: user?.certifications || [],
    languages: user?.languages || [],
    
    // Personal Information
    bio: user?.bio || '',
    achievements: user?.achievements || '',
    vision: user?.vision || '',
    
    // Event Organizing Experience
    eventTypes: user?.eventTypes || [],
    eventSizes: user?.eventSizes || [],
    budgetRanges: user?.budgetRanges || [],
    eventsOrganized: user?.eventsOrganized || '',
    successStories: user?.successStories || '',
    
    // Business Information
    businessModel: user?.businessModel || '',
    targetAudience: user?.targetAudience || [],
    averageEventBudget: user?.averageEventBudget || '',
    teamSize: user?.teamSize || '',
    
    // Contact & Legal
    businessAddress: user?.businessAddress || '',
    businessPhone: user?.businessPhone || '',
    businessEmail: user?.businessEmail || '',
    taxId: user?.taxId || '',
    
    // Emergency Contact
    emergencyContactName: user?.emergencyContactName || '',
    emergencyContactPhone: user?.emergencyContactPhone || '',
    emergencyContactRelation: user?.emergencyContactRelation || ''
  });

  const calculateProfileCompletion = () => {
    const requiredFields = [
      'name', 'email', 'phone', 'organizationName', 'organizationType', 
      'jobTitle', 'yearsExperience', 'bio', 'specializations', 'eventTypes'
    ];
    const optionalFields = [
      'address', 'industry', 'website', 'achievements', 'vision',
      'eventSizes', 'budgetRanges', 'businessModel', 'targetAudience',
      'businessAddress', 'emergencyContactName', 'emergencyContactPhone'
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
    'Event Planning', 'Corporate Events', 'Wedding Planning', 'Conference Management',
    'Trade Show Organization', 'Festival Production', 'Non-profit Events', 'Sports Events',
    'Cultural Events', 'Educational Events', 'Virtual Events', 'Hybrid Events'
  ];

  const eventTypeOptions = [
    'Corporate Events', 'Conferences', 'Trade Shows', 'Weddings', 'Festivals',
    'Sports Events', 'Cultural Events', 'Educational Events', 'Non-profit Events',
    'Product Launches', 'Awards Ceremonies', 'Galas', 'Workshops', 'Seminars'
  ];

  const organizationTypeOptions = [
    'Event Management Company', 'Corporate', 'Non-profit', 'Educational Institution',
    'Government Agency', 'Freelance', 'Wedding Planner', 'Festival Organizer'
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
                  <h1 className="text-2xl font-bold text-gray-900">{formData.name || 'Organizer Profile'}</h1>
                  <p className="text-gray-600">{formData.jobTitle} at {formData.organizationName}</p>
                  <p className="text-sm text-gray-500">{formData.yearsExperience} years experience • {formData.organizationType}</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <Badge variant="outline" className="bg-purple-50">
                      <Building className="h-3 w-3 mr-1" />
                      Organizer
                    </Badge>
                    <Badge variant="outline" className="bg-green-50">
                      <Star className="h-3 w-3 mr-1" />
                      4.9 Rating
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
            <TabsTrigger value="organization">Organization</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
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
                    <Label htmlFor="address">Personal Address</Label>
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
                    placeholder="Describe your background in event organization, your passion for creating memorable experiences, and what sets you apart..."
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
                          <SelectItem value="business-partner">Business Partner</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organization Information */}
          <TabsContent value="organization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Organization Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange('organizationName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="organizationType">Organization Type *</Label>
                    <Select 
                      value={formData.organizationType}
                      onValueChange={(value) => handleInputChange('organizationType', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationTypeOptions.map(type => (
                          <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        <SelectItem value="events">Events & Entertainment</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="weddings">Weddings</SelectItem>
                        <SelectItem value="nonprofit">Non-profit</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="establishedYear">Established Year</Label>
                    <Input
                      id="establishedYear"
                      type="number"
                      value={formData.establishedYear}
                      onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://www.yourcompany.com"
                    />
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
                        <SelectItem value="solo">Solo (Just me)</SelectItem>
                        <SelectItem value="2-5">2-5 people</SelectItem>
                        <SelectItem value="6-10">6-10 people</SelectItem>
                        <SelectItem value="11-25">11-25 people</SelectItem>
                        <SelectItem value="26-50">26-50 people</SelectItem>
                        <SelectItem value="50+">50+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t pt-4 mt-6">
                  <h3 className="font-medium mb-4">Business Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="businessAddress">Business Address</Label>
                      <Input
                        id="businessAddress"
                        value={formData.businessAddress}
                        onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="businessPhone">Business Phone</Label>
                      <Input
                        id="businessPhone"
                        value={formData.businessPhone}
                        onChange={(e) => handleInputChange('businessPhone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="businessEmail">Business Email</Label>
                      <Input
                        id="businessEmail"
                        type="email"
                        value={formData.businessEmail}
                        onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="taxId">Tax ID/EIN (Optional)</Label>
                      <Input
                        id="taxId"
                        value={formData.taxId}
                        onChange={(e) => handleInputChange('taxId', e.target.value)}
                        disabled={!isEditing}
                      />
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
                    <Label htmlFor="jobTitle">Job Title/Role *</Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Event Organizer, CEO, Founder..."
                    />
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
                </div>

                <div>
                  <Label htmlFor="specializations">Specializations *</Label>
                  <Input
                    id="specializations"
                    value={formData.specializations.join(', ')}
                    onChange={(e) => handleArrayInputChange('specializations', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Event Planning, Corporate Events, Wedding Planning..."
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
                  <Label htmlFor="certifications">Certifications (comma-separated)</Label>
                  <Input
                    id="certifications"
                    value={formData.certifications.join(', ')}
                    onChange={(e) => handleArrayInputChange('certifications', e.target.value)}
                    disabled={!isEditing}
                    placeholder="CMP, CSEP, PMP, Wedding Planning Certification..."
                  />
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
                  <Label htmlFor="vision">Vision & Mission</Label>
                  <Textarea
                    id="vision"
                    value={formData.vision}
                    onChange={(e) => handleInputChange('vision', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Describe your vision for events and what drives your organization..."
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
                    placeholder="List your major achievements, awards, notable events organized..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Experience */}
          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Event Organizing Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="eventTypes">Event Types *</Label>
                  <Input
                    id="eventTypes"
                    value={formData.eventTypes.join(', ')}
                    onChange={(e) => handleArrayInputChange('eventTypes', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Corporate Events, Conferences, Weddings, Festivals..."
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
                    <Label htmlFor="eventSizes">Event Sizes Organized</Label>
                    <Input
                      id="eventSizes"
                      value={formData.eventSizes.join(', ')}
                      onChange={(e) => handleArrayInputChange('eventSizes', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Intimate (10-50), Small (50-100), Medium (100-500)..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="eventsOrganized">Total Events Organized</Label>
                    <Input
                      id="eventsOrganized"
                      type="number"
                      value={formData.eventsOrganized}
                      onChange={(e) => handleInputChange('eventsOrganized', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Number of events"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="budgetRanges">Budget Ranges Managed</Label>
                  <Input
                    id="budgetRanges"
                    value={formData.budgetRanges.join(', ')}
                    onChange={(e) => handleArrayInputChange('budgetRanges', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Under $10K, $10K-$50K, $50K-$100K, $100K+..."
                  />
                </div>

                <div>
                  <Label htmlFor="successStories">Success Stories & Case Studies</Label>
                  <Textarea
                    id="successStories"
                    value={formData.successStories}
                    onChange={(e) => handleInputChange('successStories', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Describe some of your most successful events and what made them special..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Information */}
          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessModel">Business Model</Label>
                    <Select 
                      value={formData.businessModel}
                      onValueChange={(value) => handleInputChange('businessModel', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-service">Full-Service Event Planning</SelectItem>
                        <SelectItem value="consultation">Consultation Only</SelectItem>
                        <SelectItem value="coordination">Day-of Coordination</SelectItem>
                        <SelectItem value="partial">Partial Planning</SelectItem>
                        <SelectItem value="venue">Venue Management</SelectItem>
                        <SelectItem value="specialized">Specialized Events</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="averageEventBudget">Average Event Budget</Label>
                    <Select 
                      value={formData.averageEventBudget}
                      onValueChange={(value) => handleInputChange('averageEventBudget', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select average budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5k">Under $5K</SelectItem>
                        <SelectItem value="5k-15k">$5K - $15K</SelectItem>
                        <SelectItem value="15k-30k">$15K - $30K</SelectItem>
                        <SelectItem value="30k-50k">$30K - $50K</SelectItem>
                        <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                        <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                        <SelectItem value="250k+">$250K+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    value={formData.targetAudience.join(', ')}
                    onChange={(e) => handleArrayInputChange('targetAudience', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Corporations, Non-profits, Private Individuals, Educational Institutions..."
                  />
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