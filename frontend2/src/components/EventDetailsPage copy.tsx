import React, { useState } from 'react';
import { PageType } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Star,
  MessageCircle,
  Share2,
  Bookmark,
  Edit,
  Trash2,
  UserPlus,
  FileText,
  Camera,
  Award
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventDetailsPageProps {
  eventId: string | null;
  onNavigate: (page: PageType) => void;
}



function Spinner() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px'
    }}>
      <div style={{
        border: '6px solid #f3f3f3',
        borderTop: '6px solid #3498db',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite'
      }} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}


export function EventDetailsPage({ eventId, onNavigate }: EventDetailsPageProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  console.log(eventId);

  // Mock event data - in real app, this would be fetched based on eventId
  const event = {
    id: eventId || "1",
    title: "Annual Tech Conference 2025",
    description: "Join us for the biggest technology conference of the year featuring industry leaders, innovative workshops, and networking opportunities with over 2000 attendees.",
    date: "March 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Convention Center, Downtown",
    category: "Technology",
    status: "Published",
    price: 299,
    capacity: 2000,
    registered: 1650,
    rating: 4.8,
    reviews: 342,
    organizer: {
      name: "TechEvents Inc.",
      avatar: "",
      rating: 4.9,
      events: 156
    },
    manager: {
      name: "Sarah Johnson",
      email: "sarah@techevents.com",
      phone: "+1 (555) 123-4567"
    },
    speakers: [
      { name: "John Doe", title: "CTO, TechCorp", avatar: "" },
      { name: "Jane Smith", title: "AI Researcher", avatar: "" },
      { name: "Mike Johnson", title: "Startup Founder", avatar: "" }
    ],
    agenda: [
      { time: "9:00 AM", title: "Registration & Welcome Coffee", speaker: "" },
      { time: "10:00 AM", title: "Keynote: Future of Technology", speaker: "John Doe" },
      { time: "11:30 AM", title: "Workshop: AI in Business", speaker: "Jane Smith" },
      { time: "1:00 PM", title: "Networking Lunch", speaker: "" },
      { time: "2:30 PM", title: "Panel: Startup Ecosystem", speaker: "Mike Johnson" },
      { time: "4:00 PM", title: "Closing Remarks", speaker: "" }
    ],
    vendors: [
      { name: "Premium Catering Co.", service: "Catering", status: "Confirmed", amount: 15000 },
      { name: "AV Solutions", service: "Audio/Video", status: "Confirmed", amount: 8000 },
      { name: "Event Photography", service: "Photography", status: "Pending", amount: 3000 },
      { name: "Security Plus", service: "Security", status: "Confirmed", amount: 5000 }
    ],
    volunteers: [
      { name: "Alex Brown", role: "Registration", status: "Confirmed" },
      { name: "Emma Wilson", role: "Technical Support", status: "Confirmed" },
      { name: "David Lee", role: "Guest Relations", status: "Pending" },
      { name: "Lisa Chen", role: "Photography", status: "Confirmed" }
    ]
  };

  const registrationProgress = (event.registered / event.capacity) * 100;

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
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Event Hero */}
        <div className="mb-8">
          <div className="relative rounded-xl overflow-hidden h-80 mb-6">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1712971404080-87271ce2e473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMG1hbmFnZW1lbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc1NzIzNDc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <Badge className="mb-3 bg-primary">{event.category}</Badge>
              <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center space-x-6 text-sm opacity-90">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{event.registered}</div>
                    <div className="text-sm text-muted-foreground">Registered</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">${event.price}</div>
                    <div className="text-sm text-muted-foreground">Ticket Price</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{event.rating}</div>
                    <div className="text-sm text-muted-foreground">{event.reviews} Reviews</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Registration</span>
                    <span>{Math.round(registrationProgress)}%</span>
                  </div>
                  <Progress value={registrationProgress} />
                  <div className="text-xs text-muted-foreground">
                    {event.capacity - event.registered} spots remaining
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Register Button */}
          <div className="flex justify-center mb-8">
            <Button 
              size="lg" 
              className="px-8"
              onClick={() => setIsRegistered(!isRegistered)}
              disabled={event.registered >= event.capacity}
            >
              {isRegistered ? (
                <>
                  <Award className="h-5 w-5 mr-2" />
                  Registered
                </>
              ) : event.registered >= event.capacity ? (
                "Sold Out"
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Register for ${event.price}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="speakers">Speakers</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {event.description}
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-semibold">What You'll Learn:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Latest trends in AI and machine learning</li>
                        <li>• Best practices for startup growth</li>
                        <li>• Networking strategies for tech professionals</li>
                        <li>• Future of work and remote collaboration</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Event Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium">{event.location}</div>
                          <div className="text-sm text-muted-foreground">
                            123 Convention Blvd, Downtown District
                          </div>
                        </div>
                      </div>
                      <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-muted-foreground">Map placeholder</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Organizer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={event.organizer.avatar} />
                          <AvatarFallback>{event.organizer.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{event.organizer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.organizer.events} events organized
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{event.organizer.rating}</span>
                        <span className="text-sm text-muted-foreground">rating</span>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Organizer
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Event Manager</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium">{event.manager.name}</div>
                        <div className="text-sm text-muted-foreground">{event.manager.email}</div>
                        <div className="text-sm text-muted-foreground">{event.manager.phone}</div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Manager
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Event Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="mb-4">
                      {event.status}
                    </Badge>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span>Jan 15, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Updated:</span>
                        <span>Jan 20, 2025</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="agenda" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-border">
                      <div className="text-sm font-medium text-muted-foreground min-w-20">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        {item.speaker && (
                          <div className="text-sm text-muted-foreground mt-1">
                            Speaker: {item.speaker}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="speakers" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {event.speakers.map((speaker, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <Avatar className="h-20 w-20 mx-auto">
                        <AvatarImage src={speaker.avatar} />
                        <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{speaker.name}</div>
                        <div className="text-sm text-muted-foreground">{speaker.title}</div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vendors" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.vendors.map((vendor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">{vendor.name}</div>
                        <div className="text-sm text-muted-foreground">{vendor.service}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={vendor.status === 'Confirmed' ? 'default' : 'secondary'}>
                          {vendor.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-1">
                          ${vendor.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volunteers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Volunteers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.volunteers.map((volunteer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{volunteer.name}</div>
                          <div className="text-sm text-muted-foreground">{volunteer.role}</div>
                        </div>
                      </div>
                      <Badge variant={volunteer.status === 'Confirmed' ? 'default' : 'secondary'}>
                        {volunteer.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        name: "John Smith",
                        rating: 5,
                        date: "March 16, 2024",
                        review: "Excellent conference with great speakers and networking opportunities. Well organized and informative sessions."
                      },
                      {
                        name: "Emily Davis",
                        rating: 4,
                        date: "March 16, 2024", 
                        review: "Good event overall. The venue was perfect and the content was valuable. Could use more interactive sessions."
                      },
                      {
                        name: "Michael Brown",
                        rating: 5,
                        date: "March 15, 2024",
                        review: "Amazing experience! Met so many interesting people and learned a lot about the latest tech trends."
                      }
                    ].map((review, index) => (
                      <div key={index} className="space-y-3 pb-6 border-b border-border last:border-b-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{review.name}</div>
                              <div className="text-sm text-muted-foreground">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.review}</p>
                      </div>
                    ))}
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