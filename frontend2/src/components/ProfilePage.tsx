import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Star,
  Shield,
  Edit,
  Save,
  Camera,
  Settings,
  Lock
} from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Passionate about creating amazing events and bringing people together.',
    company: 'EventHub Inc.',
    website: 'https://eventhub.com',
    joinDate: '2023-01-15'
  });

  const achievements = [
    { icon: Star, title: '5-Star Organizer', description: 'Maintained 5-star rating for 6 months', color: 'yellow' },
    { icon: Calendar, title: 'Event Master', description: 'Successfully organized 50+ events', color: 'blue' },
    { icon: User, title: 'Community Builder', description: 'Connected 1000+ people through events', color: 'green' },
    { icon: Shield, title: 'Trusted Member', description: 'Verified account with excellent reputation', color: 'purple' }
  ];

  const eventHistory = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      role: user?.role === 'student' ? 'Attendee' : 'Organizer',
      date: '2024-03-15',
      rating: 4.8,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Music Festival',
      role: user?.role === 'student' ? 'Attendee' : 'Vendor',
      date: '2024-03-20',
      rating: 4.9,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Career Fair',
      role: user?.role === 'student' ? 'Attendee' : 'Manager',
      date: '2024-03-25',
      rating: 4.6,
      status: 'upcoming'
    }
  ];

  const handleSave = () => {
    // In a real app, this would update the user profile
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings size={16} className="mr-2" />
            Settings
          </Button>
          {isEditing ? (
            <Button onClick={handleSave}>
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit size={16} className="mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                >
                  <Camera size={14} />
                </Button>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{profileData.name}</h2>
              <Badge variant="secondary" className="mb-2 capitalize">
                {user?.role}
              </Badge>
              <p className="text-sm text-gray-600 mb-4">{profileData.bio}</p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <Mail size={14} />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone size={14} />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin size={14} />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar size={14} />
                  <span>Joined {profileData.joinDate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="info" className="w-full">
            <TabsList>
              <TabsTrigger value="info">Personal Info</TabsTrigger>
              <TabsTrigger value="events">Event History</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      disabled={!isEditing}
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {eventHistory.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{event.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>Role: {event.role}</span>
                            <span>Date: {event.date}</span>
                            {event.rating && (
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span>{event.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg">
                          <div className={`p-2 rounded-lg ${getColorClasses(achievement.color)}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Password</h4>
                        <p className="text-sm text-gray-600">Last updated 3 months ago</p>
                      </div>
                      <Button variant="outline">
                        <Lock size={16} className="mr-2" />
                        Change Password
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Login Activity</h4>
                        <p className="text-sm text-gray-600">Monitor your account access</p>
                      </div>
                      <Button variant="outline">View Activity</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Data Export</h4>
                        <p className="text-sm text-gray-600">Download your account data</p>
                      </div>
                      <Button variant="outline">Export Data</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}