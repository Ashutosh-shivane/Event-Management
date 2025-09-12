import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  FileText,
  Image,
  Plus,
  X,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export function ManagerEventAddPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    startTime: '',
    endTime: '',
    venue: '',
    address: '',
    capacity: '',
    budget: '',
    isPublic: true,
    requiresApproval: false,
    tags: [] as string[],
    requirements: [] as string[],
    benefits: [] as string[]
  });

  const [volunteerRoles, setVolunteerRoles] = useState([
    { title: '', description: '', count: '', requirements: '' }
  ]);

  const [vendorNeeds, setVendorNeeds] = useState([
    { category: '', description: '', budget: '', deadline: '' }
  ]);

  const [currentTag, setCurrentTag] = useState('');
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [currentBenefit, setCurrentBenefit] = useState('');

  const eventCategories = [
    'Conference', 'Workshop', 'Seminar', 'Networking', 'Training',
    'Social', 'Charity', 'Sports', 'Cultural', 'Academic', 'Business', 'Other'
  ];

  const popularTags = [
    'Technology', 'Education', 'Business', 'Health', 'Environment', 
    'Arts', 'Music', 'Sports', 'Volunteer', 'Career', 'Innovation', 'Community'
  ];

  const vendorCategories = [
    'Catering', 'Audio/Visual', 'Photography', 'Security', 'Transportation',
    'Decoration', 'Marketing', 'Printing', 'Cleaning', 'Entertainment'
  ];

  const totalSteps = 4;

  const handleInputChange = (field: string, value: string | boolean) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: string, value: string) => {
    if (value && !eventData[field as keyof typeof eventData].includes(value)) {
      setEventData(prev => ({
        ...prev,
        [field]: [...prev[field as keyof typeof eventData] as string[], value]
      }));
    }
  };

  const removeFromArray = (field: string, value: string) => {
    setEventData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof eventData] as string[]).filter(item => item !== value)
    }));
  };

  const addVolunteerRole = () => {
    setVolunteerRoles([...volunteerRoles, { title: '', description: '', count: '', requirements: '' }]);
  };

  const updateVolunteerRole = (index: number, field: string, value: string) => {
    const updated = [...volunteerRoles];
    updated[index] = { ...updated[index], [field]: value };
    setVolunteerRoles(updated);
  };

  const removeVolunteerRole = (index: number) => {
    setVolunteerRoles(volunteerRoles.filter((_, i) => i !== index));
  };

  const addVendorNeed = () => {
    setVendorNeeds([...vendorNeeds, { category: '', description: '', budget: '', deadline: '' }]);
  };

  const updateVendorNeed = (index: number, field: string, value: string) => {
    const updated = [...vendorNeeds];
    updated[index] = { ...updated[index], [field]: value };
    setVendorNeeds(updated);
  };

  const removeVendorNeed = (index: number) => {
    setVendorNeeds(vendorNeeds.filter((_, i) => i !== index));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(eventData.title && eventData.description && eventData.category && 
                 eventData.date && eventData.startTime && eventData.endTime);
      case 2:
        return !!(eventData.venue && eventData.address && eventData.capacity);
      case 3:
        return volunteerRoles.every(role => role.title && role.count);
      case 4:
        return true; // Optional step
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success and redirect
      alert('Event created successfully! It has been submitted for review.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Event creation failed:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Event</h1>
          <p className="text-gray-600">Plan and organize your event with all the necessary details</p>
          
          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Basic Event Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={eventData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter a compelling event title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Event Description *</Label>
                <Textarea
                  id="description"
                  value={eventData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide a detailed description of your event"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Event Category *</Label>
                  <Select value={eventData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventCategories.map(category => (
                        <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Event Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={eventData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={eventData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={eventData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Event Tags</Label>
                
                {/* Current Tags */}
                {eventData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {eventData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer" 
                             onClick={() => removeFromArray('tags', tag)}>
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                )}
                
                {/* Add Custom Tag */}
                <div className="flex space-x-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('tags', currentTag);
                        setCurrentTag('');
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      addToArray('tags', currentTag);
                      setCurrentTag('');
                    }}
                    disabled={!currentTag.trim()}
                  >
                    Add
                  </Button>
                </div>
                
                {/* Popular Tags */}
                <div>
                  <Label className="text-sm text-muted-foreground">Popular tags:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {popularTags
                      .filter(tag => !eventData.tags.includes(tag))
                      .slice(0, 8)
                      .map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => addToArray('tags', tag)}
                      >
                        + {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Venue & Logistics */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Venue & Logistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="venue">Venue Name *</Label>
                <Input
                  id="venue"
                  value={eventData.venue}
                  onChange={(e) => handleInputChange('venue', e.target.value)}
                  placeholder="e.g., Convention Center, University Hall"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Venue Address *</Label>
                <Textarea
                  id="address"
                  value={eventData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Full address including city, state, zip code"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Expected Capacity *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={eventData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    placeholder="Number of attendees"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated Budget</Label>
                  <Input
                    id="budget"
                    value={eventData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder="e.g., $5,000 - $10,000"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Event Settings</Label>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPublic"
                    checked={eventData.isPublic}
                    onCheckedChange={(checked) => handleInputChange('isPublic', checked as boolean)}
                  />
                  <Label htmlFor="isPublic">Make this event public (visible to all users)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="requiresApproval"
                    checked={eventData.requiresApproval}
                    onCheckedChange={(checked) => handleInputChange('requiresApproval', checked as boolean)}
                  />
                  <Label htmlFor="requiresApproval">Require approval for volunteer registration</Label>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Event Requirements</Label>
                
                {/* Current Requirements */}
                {eventData.requirements.length > 0 && (
                  <div className="space-y-2">
                    {eventData.requirements.map((req, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{req}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromArray('requirements', req)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add Requirement */}
                <div className="flex space-x-2">
                  <Input
                    value={currentRequirement}
                    onChange={(e) => setCurrentRequirement(e.target.value)}
                    placeholder="Add a requirement (e.g., Must be 18+ years old)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('requirements', currentRequirement);
                        setCurrentRequirement('');
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      addToArray('requirements', currentRequirement);
                      setCurrentRequirement('');
                    }}
                    disabled={!currentRequirement.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Benefits for Volunteers</Label>
                
                {/* Current Benefits */}
                {eventData.benefits.length > 0 && (
                  <div className="space-y-2">
                    {eventData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center justify-between bg-green-50 p-2 rounded">
                        <span className="text-sm">{benefit}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromArray('benefits', benefit)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add Benefit */}
                <div className="flex space-x-2">
                  <Input
                    value={currentBenefit}
                    onChange={(e) => setCurrentBenefit(e.target.value)}
                    placeholder="Add a benefit (e.g., Certificate of participation)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('benefits', currentBenefit);
                        setCurrentBenefit('');
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      addToArray('benefits', currentBenefit);
                      setCurrentBenefit('');
                    }}
                    disabled={!currentBenefit.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Volunteer Roles */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Volunteer Roles
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addVolunteerRole}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Role
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {volunteerRoles.map((role, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Volunteer Role {index + 1}</h4>
                    {volunteerRoles.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVolunteerRole(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Role Title *</Label>
                      <Input
                        value={role.title}
                        onChange={(e) => updateVolunteerRole(index, 'title', e.target.value)}
                        placeholder="e.g., Registration Assistant"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Number Needed *</Label>
                      <Input
                        type="number"
                        value={role.count}
                        onChange={(e) => updateVolunteerRole(index, 'count', e.target.value)}
                        placeholder="e.g., 5"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Role Description</Label>
                    <Textarea
                      value={role.description}
                      onChange={(e) => updateVolunteerRole(index, 'description', e.target.value)}
                      placeholder="Describe the responsibilities and duties"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Special Requirements</Label>
                    <Input
                      value={role.requirements}
                      onChange={(e) => updateVolunteerRole(index, 'requirements', e.target.value)}
                      placeholder="Any specific skills or requirements"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 4: Vendor Requirements */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Vendor Requirements (Optional)
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addVendorNeed}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vendor Need
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {vendorNeeds.map((need, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Vendor Requirement {index + 1}</h4>
                    {vendorNeeds.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVendorNeed(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Vendor Category</Label>
                      <Select 
                        value={need.category} 
                        onValueChange={(value) => updateVendorNeed(index, 'category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {vendorCategories.map(category => (
                            <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Budget Range</Label>
                      <Input
                        value={need.budget}
                        onChange={(e) => updateVendorNeed(index, 'budget', e.target.value)}
                        placeholder="e.g., $500 - $1,000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={need.description}
                      onChange={(e) => updateVendorNeed(index, 'description', e.target.value)}
                      placeholder="Describe what you need from this vendor"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Deadline</Label>
                    <Input
                      type="date"
                      value={need.deadline}
                      onChange={(e) => updateVendorNeed(index, 'deadline', e.target.value)}
                    />
                  </div>
                </div>
              ))}

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Vendor requirements are optional but help vendors understand your needs better. 
                  You can always add or modify vendor requirements after creating the event.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button 
              onClick={nextStep}
              disabled={!validateStep(currentStep)}
            >
              Next Step
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !validateStep(currentStep)}
              className="px-8"
            >
              {isSubmitting ? 'Creating Event...' : 'Create Event'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}