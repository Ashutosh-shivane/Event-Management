import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Send,
  X,
} from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";

interface EventForm {
  title: string;
  description: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: string;
  price: string;
  tags: string[];
  requiredVolunteer: string;
}

export function OrganizerEventEditPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  // console.log("eventid "+eventId);

  const [activeTab, setActiveTab] = useState("basic");
  const [currentTag, setCurrentTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [eventForm, setEventForm] = useState<EventForm>({
    title: "",
    description: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    capacity: "",
    price: "",
    requiredVolunteer: "",
    tags: [],
  });

  const categories = [
    "Technology", "Business", "Education", "Arts & Culture",
    "Sports", "Health & Wellness", "Networking", "Conference", "Workshop",
  ];

  // 🔹 Fetch existing event data when component loads

  const userid=localStorage.getItem('id');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/Event/update/${eventId}/${userid}`);
        const data = res.data;

        console.log("here");

        console.log(res.data);

        // Parse backend event data into our form structure
        setEventForm({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          date: data.startAt ? data.startAt.split("T")[0] : "",
          startTime: data.startAt ? data.startAt.split("T")[1]?.slice(0, 5) : "",
          endTime: data.endAt ? data.endAt.split("T")[1]?.slice(0, 5) : "",
          location: data.location || "",          
          capacity: data.capacity ? data.capacity.toString() : "",
          price: data.cost ? data.cost.toString() : "",
          requiredVolunteer: data.requiredVolunteer ? data.requiredVolunteer.toString() : "",
          tags: data.tags ? JSON.parse(data.tags) : [],
        });
      } catch (err) {
        console.error("❌ Error fetching event:", err);
        alert("Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleFormChange = (field: keyof EventForm, value: string | boolean) => {
    setEventForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !eventForm.tags.includes(currentTag.trim())) {
      setEventForm((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEventForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // 🔹 Update Event (PUT Request)
  const handleUpdate = async () => {
    try {
      const payload = {
        title: eventForm.title,
        description: eventForm.description,
        category: eventForm.category,
        startAt: new Date(`${eventForm.date}T${eventForm.startTime}`).toISOString(),
        endAt: new Date(`${eventForm.date}T${eventForm.endTime}`).toISOString(),
        location: eventForm.location,
        requiredVolunteer: parseInt(eventForm.requiredVolunteer || "0"),
        cost: eventForm.price,
        tags: JSON.stringify(eventForm.tags),
        updatedBy: localStorage.getItem("id"),
      };

      const res = await axios.put(
        `http://localhost:8080/Event/update/${eventId}/${userid}`,
        payload,
        
      );

      alert("✅ Event updated successfully!");
      navigate(`/events/${eventId}`);
    } catch (err) {
      console.error("❌ Failed to update event:", err);
      alert("Error updating event");
    }
  };

  if (loading) return <div className="text-center p-8 text-lg">Loading event details...</div>;

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
                onClick={() => navigate("/dashboard")}
                className="flex items-center space-x-2 border border-gray-300 rounded-md"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <h1 className="text-xl font-semibold">Update Event</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleUpdate}>
                <Send className="h-4 w-4 mr-2" />
                Update Event
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
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
                    onChange={(e) => handleFormChange("title", e.target.value)}
                    placeholder="Enter event title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea
                    id="description"
                    value={eventForm.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={eventForm.category}
                      onValueChange={(value) => handleFormChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Required Volunteers *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={eventForm.requiredVolunteer}
                      onChange={(e) => handleFormChange("requiredVolunteer", e.target.value)}
                      placeholder="Enter number"
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
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button type="button" variant="outline" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Date, Time & Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => handleFormChange("date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={eventForm.startTime}
                      onChange={(e) => handleFormChange("startTime", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={eventForm.endTime}
                      onChange={(e) => handleFormChange("endTime", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Address *</Label>
                  <Input
                    id="location"
                    value={eventForm.location}
                    onChange={(e) => handleFormChange("location", e.target.value)}
                  />
                </div>

                

                <div className="space-y-2">
                  <Label htmlFor="price">Price (Rs)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={eventForm.price}
                    onChange={(e) => handleFormChange("price", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
