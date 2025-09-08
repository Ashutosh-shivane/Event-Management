import React, { useState } from 'react';
import { PageType } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Upload,
  Plus,
  X,
  Clock,
  Save,
  Eye,
  Send
} from 'lucide-react';

interface ManagerEventAddPageProps {
  onNavigate: (page: PageType) => void;
}

interface EventForm {
  title: string;
  description: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  venue: string;
  capacity: string;
  price: string;
  earlyBirdPrice: string;
  earlyBirdDeadline: string;
  tags: string[];
  isPublic: boolean;
  requiresApproval: boolean;
  allowWaitlist: boolean;
}

interface AgendaItem {
  time: string;
  title: string;
  description: string;
  speaker: string;
}

interface VendorRequirement {
  service: string;
  description: string;
  budget: string;
  deadline: string;
}

export function ManagerEventAddPage({ onNavigate }: ManagerEventAddPageProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [currentTag, setCurrentTag] = useState("");
  const [eventForm, setEventForm] = useState<EventForm>({
    title: "",
    description: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    venue: "",
    capacity: "",
    price: "",
    earlyBirdPrice: "",
    earlyBirdDeadline: "",
    tags: [],
    isPublic: true,
    requiresApproval: false,
    allowWaitlist: true
  });

  const [agenda, setAgenda] = useState<AgendaItem[]>([
    { time: "", title: "", description: "", speaker: "" }
  ]);

  const [vendorRequirements, setVendorRequirements] = useState<VendorRequirement[]>([
    { service: "", description: "", budget: "", deadline: "" }
  ]);

  const categories = [
    "Technology", "Business", "Education", "Arts & Culture", 
    "Sports", "Health & Wellness", "Networking", "Conference", "Workshop"
  ];

  const services = [
    "Catering", "Photography", "Videography", "Audio/Visual", 
    "Security", "Transportation", "Decoration", "Entertainment"
  ];

  const handleFormChange = (field: keyof EventForm, value: string | boolean) => {
    setEventForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !eventForm.tags.includes(currentTag.trim())) {
      setEventForm(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEventForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addAgendaItem = () => {
    setAgenda(prev => [...prev, { time: "", title: "", description: "", speaker: "" }]);
  };

  const updateAgendaItem = (index: number, field: keyof AgendaItem, value: string) => {
    setAgenda(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const removeAgendaItem = (index: number) => {
    setAgenda(prev => prev.filter((_, i) => i !== index));
  };

  const addVendorRequirement = () => {
    setVendorRequirements(prev => [...prev, { service: "", description: "", budget: "", deadline: "" }]);
  };

  const updateVendorRequirement = (index: number, field: keyof VendorRequirement, value: string) => {
    setVendorRequirements(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const removeVendorRequirement = (index: number) => {
    setVendorRequirements(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveDraft = () => {
    // In real app, save as draft
    console.log("Saving draft...", { eventForm, agenda, vendorRequirements });
  };

  const handlePreview = () => {
    // In real app, show preview
    console.log("Previewing event...", { eventForm, agenda, vendorRequirements });
  };

  const handlePublish = () => {
    // In real app, publish event
    console.log("Publishing event...", { eventForm, agenda, vendorRequirements });
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <h1 className="text-xl font-semibold">Create New Event</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handlePublish}>
                <Send className="h-4 w-4 mr-2" />
                Publish Event
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Event Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={eventForm.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    placeholder="Enter event title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea
                    id="description"
                    value={eventForm.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    placeholder="Describe your event, what attendees can expect, key highlights, etc."
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={eventForm.category} onValueChange={(value) => handleFormChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={eventForm.capacity}
                      onChange={(e) => handleFormChange('capacity', e.target.value)}
                      placeholder="Maximum attendees"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {eventForm.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{tag}</span>
                        <button 
                          onClick={() => removeTag(tag)}
                          className="text-xs hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Date & Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date">Event Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={eventForm.date}
                        onChange={(e) => handleFormChange('date', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={eventForm.startTime}
                        onChange={(e) => handleFormChange('startTime', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={eventForm.endTime}
                        onChange={(e) => handleFormChange('endTime', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Address *</Label>
                    <Input
                      id="location"
                      value={eventForm.location}
                      onChange={(e) => handleFormChange('location', e.target.value)}
                      placeholder="Street address, city, state, zip code"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue Name</Label>
                    <Input
                      id="venue"
                      value={eventForm.venue}
                      onChange={(e) => handleFormChange('venue', e.target.value)}
                      placeholder="Convention center, hotel, university, etc."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Regular Price ($) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={eventForm.price}
                        onChange={(e) => handleFormChange('price', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="earlyBirdPrice">Early Bird Price ($)</Label>
                      <Input
                        id="earlyBirdPrice"
                        type="number"
                        value={eventForm.earlyBirdPrice}
                        onChange={(e) => handleFormChange('earlyBirdPrice', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  {eventForm.earlyBirdPrice && (
                    <div className="space-y-2">
                      <Label htmlFor="earlyBirdDeadline">Early Bird Deadline</Label>
                      <Input
                        id="earlyBirdDeadline"
                        type="date"
                        value={eventForm.earlyBirdDeadline}
                        onChange={(e) => handleFormChange('earlyBirdDeadline', e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-medium mb-2">Upload Event Image</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose a high-quality image that represents your event
                    </p>
                    <Button variant="outline">
                      Choose File
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agenda" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Event Agenda</CardTitle>
                  <Button onClick={addAgendaItem} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agenda.map((item, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Agenda Item {index + 1}</h4>
                        {agenda.length > 1 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => removeAgendaItem(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Time</Label>
                          <Input
                            type="time"
                            value={item.time}
                            onChange={(e) => updateAgendaItem(index, 'time', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Speaker (Optional)</Label>
                          <Input
                            value={item.speaker}
                            onChange={(e) => updateAgendaItem(index, 'speaker', e.target.value)}
                            placeholder="Speaker name"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label>Title</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => updateAgendaItem(index, 'title', e.target.value)}
                          placeholder="Session title"
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label>Description</Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => updateAgendaItem(index, 'description', e.target.value)}
                          placeholder="Brief description of this agenda item"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Vendor Requirements</CardTitle>
                  <Button onClick={addVendorRequirement} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Requirement
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendorRequirements.map((requirement, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Vendor Requirement {index + 1}</h4>
                        {vendorRequirements.length > 1 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => removeVendorRequirement(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Service Type</Label>
                          <Select 
                            value={requirement.service} 
                            onValueChange={(value) => updateVendorRequirement(index, 'service', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map(service => (
                                <SelectItem key={service} value={service}>{service}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Budget ($)</Label>
                          <Input
                            type="number"
                            value={requirement.budget}
                            onChange={(e) => updateVendorRequirement(index, 'budget', e.target.value)}
                            placeholder="Estimated budget"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label>Description</Label>
                        <Textarea
                          value={requirement.description}
                          onChange={(e) => updateVendorRequirement(index, 'description', e.target.value)}
                          placeholder="Detailed requirements for this service"
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <Label>Deadline</Label>
                        <Input
                          type="date"
                          value={requirement.deadline}
                          onChange={(e) => updateVendorRequirement(index, 'deadline', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Visibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Public Event</Label>
                      <p className="text-sm text-muted-foreground">
                        Anyone can find and view this event
                      </p>
                    </div>
                    <Switch
                      checked={eventForm.isPublic}
                      onCheckedChange={(checked) => handleFormChange('isPublic', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Registration Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Requires Approval</Label>
                      <p className="text-sm text-muted-foreground">
                        Manually approve each registration
                      </p>
                    </div>
                    <Switch
                      checked={eventForm.requiresApproval}
                      onCheckedChange={(checked) => handleFormChange('requiresApproval', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Waitlist</Label>
                      <p className="text-sm text-muted-foreground">
                        Let people join waitlist when capacity is full
                      </p>
                    </div>
                    <Switch
                      checked={eventForm.allowWaitlist}
                      onCheckedChange={(checked) => handleFormChange('allowWaitlist', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Confirmation Email Template</Label>
                    <Textarea
                      placeholder="Customize the registration confirmation email..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Event Reminder (Days before event)</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">1 week</SelectItem>
                        <SelectItem value="14">2 weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}