import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
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
import axios from 'axios';





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

export function EventDetailsPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);

  const [eventdata, setEventdata] = useState({});

  console.log(eventId);

   const mapEvent = (row) => ({
  id: row[0],
  title: row[1],
  description: row[2],
  startAt: row[3],
  endAt: row[4],
  location: row[5],
  managedByManager: row[6],
  requiredVolunteer: row[7],
  status: row[8],
  category: row[9],
  tags: row[10],
  cost: row[11],
  createdById: row[12],
  createdByName: row[13],
});


    // eventId="1";

    localStorage.setItem("eventid", String(eventId));


  useEffect(() => {
    axios
      .get(`http://localhost:8080/Event/${eventId}`) // replace with your backend URL
      .then((response) => {

        const mapped = mapEvent(response.data[0]);
        setEventdata(mapped);
        // setEventdata( mapEvent(response.data[0])); // store events
        setLoading(false);
        console.log(response.data[0]);
        console.log(mapped); 

        localStorage.setItem("eventDetails", JSON.stringify(mapped));

        
        
        

        
        // done loading
      })
      .catch((err) => {
        console.error(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);


 



  // Mock event data - in real app, this would be fetched based on eventId
  const event = {
    id: eventId,
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
    }





  };

  // const registrationProgress = (event.registered / event.capacity) * 100;

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
                onClick={() => navigate('/dashboard')}
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


      {loading && <Spinner />}




      {!loading &&(


      <div className="container mx-auto px-6 py-8 max-w-6xl">








        {/* Event Hero */}

        <div className="mb-8">
          <div className="relative rounded-xl overflow-hidden h-80 mb-6">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1712971404080-87271ce2e473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMG1hbmFnZW1lbnQlMjBjb25mZXJlbmNlfGVufDF8fHx8MTc1NzIzNDc4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt={eventdata.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <Badge className="mb-3 bg-primary">{eventdata.category}</Badge>
              <h1 className="text-4xl font-bold mb-2">{eventdata.title}</h1>
              <div className="flex items-center space-x-6 text-sm opacity-90">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(eventdata.startAt).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
})}
</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>
{/* Time Range */}
{new Date(eventdata.startAt).toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
})}
 - 
{new Date(eventdata.endAt).toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
})}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{eventdata.location}</span>
                </div>
              </div>
            </div>
          </div>

          


          

          {/* Register Button */}
          <div className="flex justify-center mb-8">
            <Button
              size="lg"
              className="px-8"
               onClick={() => {
                if (isRegistered) {
                  setIsRegistered(false);
                } else if (event.registered < event.capacity) {
                  navigate(`/events/${eventId}/register`);
                }
              }}
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
                  Register for Rs. {eventdata.cost}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            {/* <TabsTrigger value="agenda">Agenda</TabsTrigger>
            <TabsTrigger value="speakers">Speakers</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
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
                      {eventdata.description}
                    </p>
                   
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
                          <div className="font-medium">{eventdata.location}</div>
                         
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
                          {/* <AvatarImage src={event.organizer.avatar} /> */}
                          {/* <AvatarFallback>{event.organizer.name.slice(0, 2)}</AvatarFallback> */}
                        </Avatar>
                        <div>
                          <div className="font-medium">{eventdata.createdByName}</div>
                          <div className="text-sm text-muted-foreground">
                            {/* {event.organizer.events} events organized */}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {/* <span className="font-medium">{event.organizer.rating}</span> */}
                        {/* <span className="text-sm text-muted-foreground">rating</span> */}
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
                    <CardTitle>Event Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="mb-4">
                      {eventdata.status}
                    </Badge>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span>  {new Date(eventdata.startAt).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric' 
  })} at {new Date(eventdata.startAt).toLocaleTimeString('en-US', { 
    hour: '2-digit', minute: '2-digit' 
  })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Updated:</span>
                        <span>  {new Date(eventdata.startAt).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric' 
  })} at {new Date(eventdata.startAt).toLocaleTimeString('en-US', { 
    hour: '2-digit', minute: '2-digit' 
  })}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>


        </Tabs>
      </div>
      )}

    </div>
  );
}