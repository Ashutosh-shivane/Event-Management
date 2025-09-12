import React, { useState } from 'react';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
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

import axios from 'axios';



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



interface VendorRequirement {
  service: string;
  description: string;
  budget: string;
  deadline: string;
}

export function OrganizerEventCreatePage() {
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
    requiredVolunteer:0,
    venue: "",
    capacity: "",
    price: "",
    tags: []
  });

 

  

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

  

  



 

  
  const handleSaveDraft = () => {
    // In real app, save as draft
    console.log("Saving draft...", { eventForm });
  };

  const handlePreview = () => {
    // In real app, show preview
    console.log("Previewing event...", { eventForm });
  };

 const handlePublish = async () => {
    try {
      console.log("Publishing event...", eventForm);
      const res = await createEvent(eventForm);
      alert("Event created successfully! ID: " + res.id);
     
    } catch (err) {
      alert("Error while creating event");

    }
  };

  // helper function
async function createEvent(eventForm:any) {
  try {

    const API_BASE = "http://localhost:8080/Event";
    const payload = {
      title: eventForm.title,
      description: eventForm.description,
      startAt:
        eventForm.date && eventForm.startTime
          ? new Date(`${eventForm.date}T${eventForm.startTime}`).toISOString()
          : null,
      endAt:
        eventForm.date && eventForm.endTime
          ? new Date(`${eventForm.date}T${eventForm.endTime}`).toISOString()
          : null,
      location: eventForm.venue+eventForm.location,
      requiredVolunteer: eventForm.requiredVolunteer
        ? parseInt(eventForm.requiredVolunteer, 10)
        : 0,
      status: "PUBLISHED",
      managedByManager: true,

      // optional extras
      category: eventForm.category,
      
      cost: eventForm.price,
      tags: JSON.stringify(eventForm.tags),
      createdid:localStorage.getItem('id')
      
    };

    console.log(payload);

     const response = await axios.post(`${API_BASE}/create`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });

    console.log("✅ Event created:", response.data);
    return response.data;
  } catch (err) {
    console.error("❌ Failed to create event:", err);
    throw err;
  }
}



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
                      value={eventForm.requiredVolunteer}
                      onChange={(e) => handleFormChange('requiredVolunteer', e.target.value)}
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
                      <Label htmlFor="price"> Price (Rs) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={eventForm.price}
                        onChange={(e) => handleFormChange('price', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                   
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