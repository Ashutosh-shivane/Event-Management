import React, { useState } from 'react';
import { PageType } from '../../App';
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
  CheckCircle,
  Camera,
  Upload
} from 'lucide-react';

interface OrganizerEventCreatePageProps {
  onNavigate: (page: PageType) => void;
}

export function OrganizerEventCreatePage({ onNavigate }: OrganizerEventCreatePageProps) {
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
    ticketPrice: '',
    currency: 'USD',
    isPublic: true,
    requiresApproval: false,
    hasTickets: false,
    allowRefunds: true,
    tags: [] as string[],
    requirements: [] as string[],
    agenda: [] as { time: string; title: string; speaker: string; duration: string }[]
  });

  const [eventImage, setEventImage] = useState<string | null>(null);
  const [currentTag, setCurrentTag] = useState('');
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [currentAgendaItem, setCurrentAgendaItem] = useState({
    time: '',
    title: '',
    speaker: '',
    duration: ''
  });

  const eventCategories = [
    'Conference', 'Workshop', 'Seminar', 'Networking', 'Training',
    'Social', 'Charity', 'Sports', 'Cultural', 'Academic', 'Business', 
    'Entertainment', 'Health', 'Technology', 'Other'
  ];

  const popularTags = [
    'Technology', 'Education', 'Business', 'Health', 'Environment', 
    'Arts', 'Music', 'Sports', 'Volunteer', 'Career', 'Innovation', 
    'Community', 'Networking', 'Professional Development'
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];

  const totalSteps = 4;

  const handleInputChange = (field: string, value: string | boolean | number) => {
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

  const addAgendaItem = () => {
    if (currentAgendaItem.time && currentAgendaItem.title) {
      setEventData(prev => ({
        ...prev,
        agenda: [...prev.agenda, { ...currentAgendaItem }]
      }));
      setCurrentAgendaItem({ time: '', title: '', speaker: '', duration: '' });
    }
  };

  const removeAgendaItem = (index: number) => {
    setEventData(prev => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEventImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(eventData.title && eventData.description && eventData.category && 
                 eventData.date && eventData.startTime && eventData.endTime);
      case 2:
        return !!(eventData.venue && eventData.address && eventData.capacity);
      case 3:
        return eventData.hasTickets ? !!eventData.ticketPrice : true;
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
      onNavigate('dashboard');
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
            onClick={() => onNavigate('dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Event</h1>
          <p className="text-gray-600">Organize and plan your event with all the necessary details</p>
          
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

              {/* Event Image Upload */}
              <div className="space-y-2">
                <Label>Event Cover Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {eventImage ? (
                    <div className="relative">
                      <img 
                        src={eventImage} 
                        alt="Event cover" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setEventImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Upload event cover image
                          </span>
                          <span className="mt-1 block text-sm text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </span>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>
                  )}
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
                  <Label htmlFor="requiresApproval">Require approval for registrations</Label>
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
            </CardContent>
          </Card>
        )}

        {/* Step 3: Ticketing & Pricing */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Ticketing & Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasTickets"
                  checked={eventData.hasTickets}
                  onCheckedChange={(checked) => handleInputChange('hasTickets', checked as boolean)}
                />
                <Label htmlFor="hasTickets">This is a paid event (requires tickets)</Label>
              </div>

              {eventData.hasTickets && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ticketPrice">Ticket Price *</Label>
                      <Input
                        id="ticketPrice"
                        type="number"
                        step="0.01"
                        value={eventData.ticketPrice}
                        onChange={(e) => handleInputChange('ticketPrice', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={eventData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map(currency => (
                            <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowRefunds"
                      checked={eventData.allowRefunds}
                      onCheckedChange={(checked) => handleInputChange('allowRefunds', checked as boolean)}
                    />
                    <Label htmlFor="allowRefunds">Allow refunds</Label>
                  </div>

                  <Alert>
                    <DollarSign className="h-4 w-4" />
                    <AlertDescription>
                      Payment processing fees will be automatically calculated and added to your ticket price.
                      You'll receive payouts after the event concludes.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {!eventData.hasTickets && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    This event is free to attend. Attendees will be able to register without payment.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 4: Event Agenda */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Event Agenda (Optional)
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAgendaItem}
                  disabled={!currentAgendaItem.time || !currentAgendaItem.title}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Agenda Item */}
              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">Add Agenda Item</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={currentAgendaItem.time}
                      onChange={(e) => setCurrentAgendaItem(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={currentAgendaItem.duration}
                      onChange={(e) => setCurrentAgendaItem(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 45 minutes"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={currentAgendaItem.title}
                    onChange={(e) => setCurrentAgendaItem(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Session or activity title"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Speaker/Presenter</Label>
                  <Input
                    value={currentAgendaItem.speaker}
                    onChange={(e) => setCurrentAgendaItem(prev => ({ ...prev, speaker: e.target.value }))}
                    placeholder="Name of speaker or presenter (optional)"
                  />
                </div>
              </div>

              {/* Current Agenda */}
              {eventData.agenda.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">Event Agenda</h4>
                  <div className="space-y-2">
                    {eventData.agenda.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <span className="font-medium text-blue-600">{item.time}</span>
                            <span className="font-medium">{item.title}</span>
                            {item.duration && (
                              <span className="text-sm text-gray-500">({item.duration})</span>
                            )}
                          </div>
                          {item.speaker && (
                            <p className="text-sm text-gray-600 mt-1">Speaker: {item.speaker}</p>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAgendaItem(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  Adding an agenda helps attendees understand what to expect and plan their time. 
                  You can always modify the agenda later as your event details evolve.
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