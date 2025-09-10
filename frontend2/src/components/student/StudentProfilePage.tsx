import React, { useState,useEffect } from 'react';
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
  GraduationCap,
  Book,
  Award,
  Camera,
  Save,
  Edit3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

import axios from 'axios';


export function StudentProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

 const [studentdata, setStudentdata] = useState({});

  console.log("student here");


  useEffect(()=>{

     const userId = localStorage.getItem("id");

    if (!userId) {
      console.error("No user id found in localStorage");
      return;
    }

    var tempdata={};


    

    axios.get(`http://localhost:8080/Student/${userId}`)
    .then((response)=>{
      // setStudentdata(response.data);

      tempdata=
      {name: response.data?.name || '',
    email: response.data?.email || '',
    phone: response.data?.phone || '',
    dateOfBirth: response.data?.birthdate || '',
    address: response.data?.address || '',
    city: response.data?.city || '',
    state: response.data?.state || '',
    zipCode: response.data?.zipcode || '',
    
    // Academic Information
    university: response.data?.university || '',
    college: response.data?.college || '',
    degree: response.data?.degree || '',
    major: response.data?.major || '',
    graduationYear: response.data?.graduationYear || '',
    currentYear: response.data?.currentYear || '',
    gpa: response.data?.marks || '',
    
    // Personal Information
    bio: response.data?.bio || '',
    interests:  response.data?.interests ||'',
    skills:  response.data?.skills ||'',
    languages: response.data?.languages ||'',
    
    // Event Preferences
    eventTypes: response.data?.eventtypes ||'',
    availability: response.data?.availability || '',
    volunteerExperience: response.data?.volunteerExperience || '',
    
    // Emergency Contact
    emergencyContactName: response.data?.emergencyContactName || '',
    emergencyContactPhone: response.data?.emergencyContactPhone || '',
    emergencyContactRelation: response.data?.emergencyContactRelation || ''}

    setFormData(tempdata);
    console.log("student here:", tempdata);  

      

    })
    .catch((err) => {
        console.error(err.message || "Something went wrong");
       
      });;

  },[]);

   


  
  const [formData, setFormData] = useState({
    name: studentdata?.name || '',
    email: studentdata?.email || '',
    phone: studentdata?.phone || '',
    dateOfBirth: studentdata?.birthdate || '',
    address: studentdata?.address || '',
    city: studentdata?.city || '',
    state: studentdata?.state || '',
    zipCode: studentdata?.zipcode || '',
    
    // Academic Information
    university: studentdata?.university || '',
    college: studentdata?.college || '',
    degree: studentdata?.degree || '',
    major: studentdata?.major || '',
    graduationYear: studentdata?.graduationYear || '',
    currentYear: studentdata?.currentYear || '',
    gpa: studentdata?.marks || '',
    
    // Personal Information
    bio: studentdata?.bio || '',
    interests: studentdata?.interests || '',
    skills: studentdata?.skills || '',
    languages: studentdata?.languages || '',
    
    // Event Preferences
    eventTypes: studentdata?.eventtypes || '',
    availability: studentdata?.availability || '',
    volunteerExperience: studentdata?.volunteerExperience || '',
    
    // Emergency Contact
    emergencyContactName: studentdata?.emergencyContactName || '',
    emergencyContactPhone: studentdata?.emergencyContactPhone || '',
    emergencyContactRelation: studentdata?.emergencyContactRelation || ''
  });

  // const [formData, setFormData] = useState({});

// Sync formData whenever studentdata changes
// useEffect(() => {
//   if (Object.keys(studentdata).length > 0) {
//     setFormData({
//       name: studentdata?.name || '',
//       email: studentdata?.email || '',
//       phone: studentdata?.phone || '',
//       dateOfBirth: studentdata?.birthdate || '',
//       address: studentdata?.address || '',
//       city: studentdata?.city || '',
//       state: studentdata?.state || '',
//       zipCode: studentdata?.zipcode || '',
      
//       university: studentdata?.university || '',
//       college: studentdata?.college || '',
//       degree: studentdata?.degree || '',
//       major: studentdata?.major || '',
//       graduationYear: studentdata?.graduationYear || '',
//       currentYear: studentdata?.currentYear || '',
//       gpa: studentdata?.marks || '',
      
//       bio: studentdata?.bio || '',
//       interests: studentdata?.interests ? studentdata.interests.split(",") : [],
//       skills: studentdata?.skills ? studentdata.skills.split(",") : [],
//       languages: studentdata?.languages ? studentdata.languages.split(",") : [],
      
//       eventTypes: studentdata?.eventtypes ? studentdata.eventtypes.split(",") : [],
//       availability: studentdata?.availability || '',
//       volunteerExperience: studentdata?.volunteerExperience || '',
      
//       emergencyContactName: studentdata?.emergencyContactName || '',
//       emergencyContactPhone: studentdata?.emergencyContactPhone || '',
//       emergencyContactRelation: studentdata?.emergencyContactRelation || ''
//     });
//   }
// }, [studentdata]);



  const calculateProfileCompletion = () => {
    const requiredFields = [
      'name', 'email', 'phone', 'university', 'degree', 'major', 
      'graduationYear', 'currentYear', 'bio'
    ];
    const optionalFields = [
      'address', 'gpa', 'interests', 'skills', 'languages', 
      'emergencyContactName', 'emergencyContactPhone'
    ];
    
    const completedRequired = requiredFields.filter(field => 
      formData[field] && formData[field].length > 0
    ).length;
    
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

  // const handleArrayInputChange = (field: string, value: string) => {
  //   const items = value.split(',').map(item => item.trim()).filter(item => item);
  //   setFormData(prev => ({
  //     ...prev,
  //     [field]: items
  //   }));
  // };

  function mapFormDataToStudentInDto(formData, userId) {
  return {
    userid: userId,                         // pass the current logged-in user ID
    name: formData.name || '',
    email: formData.email || '',
    phone: formData.phone || '',
    birthdate: formData.dateOfBirth || '',  // map dateOfBirth -> birthdate
    address: formData.address || '',
    city: formData.city || '',
    state: formData.state || '',
    zipcode: formData.zipCode || '',        // map zipCode -> zipcode
    university: formData.university || '',
    college: formData.college || '',
    degree: formData.degree || '',
    major: formData.major || '',
    graduationYear: formData.graduationYear || '',
    currentYear: formData.currentYear || '',
    marks: formData.gpa || '',              // map gpa -> marks
    bio: formData.bio || '',
    interests: formData.interests || '',
    skills: formData.skills || '',
    languages: formData.languages || '',
    eventtypes: formData.eventTypes || '',  // map eventTypes -> eventtypes
    availability: formData.availability || '',
    volunteerExperience: formData.volunteerExperience || '',
    emergencyContactName: formData.emergencyContactName || '',
    emergencyContactPhone: formData.emergencyContactPhone || '',
    emergencyContactRelation: formData.emergencyContactRelation || ''
  };
}


  const handleSaveProfile = async () => {
    setIsSaving(true);

    let indata=mapFormDataToStudentInDto(formData,localStorage.getItem("id"));


    console.log("----");
    console.log(indata);


    try {
      // Simulate API call
      const response = await axios.post(
      `http://localhost:8080/Student/save`,
     indata
    );
      
      if (updateUser) {
        updateUser({
          ...user,
          ...formData,
          profileCompletion: calculateProfileCompletion()
        });
      }

      console.log("dasfwsdf");
      console.log(formData);
      
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

  const interestOptions = [
    'Technology', 'Business', 'Arts', 'Sports', 'Music', 'Science', 
    'Healthcare', 'Education', 'Environment', 'Social Work', 'Travel', 
    'Photography', 'Writing', 'Gaming', 'Fitness'
  ];

  const skillOptions = [
    'Leadership', 'Communication', 'Problem Solving', 'Team Work', 
    'Project Management', 'Public Speaking', 'Event Planning', 
    'Social Media', 'Design', 'Programming', 'Research', 'Writing'
  ];

  const eventTypeOptions = [
    'Academic Conferences', 'Career Fairs', 'Cultural Events', 
    'Sports Events', 'Tech Meetups', 'Workshops', 'Seminars', 
    'Social Events', 'Volunteer Work', 'Community Service'
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
                  <h1 className="text-2xl font-bold text-gray-900">{formData.name || 'Student Profile'}</h1>
                  <p className="text-gray-600">{formData.university}</p>
                  <p className="text-sm text-gray-500">{formData.degree} • {formData.major}</p>
                  <Badge variant="outline" className="mt-1">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    Class of {formData.graduationYear}
                  </Badge>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
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
                      disabled={true}
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
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Information */}
          <TabsContent value="academic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="university">University/College *</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="college">College/School</Label>
                    <Input
                      id="college"
                      value={formData.college}
                      onChange={(e) => handleInputChange('college', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="degree">Degree *</Label>
                    <Select 
                      value={formData.degree}
                      onValueChange={(value) => handleInputChange('degree', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelor">Bachelor's</SelectItem>
                        <SelectItem value="master">Master's</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="associate">Associate</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="major">Major/Field of Study *</Label>
                    <Input
                      id="major"
                      value={formData.major}
                      onChange={(e) => handleInputChange('major', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="currentYear">Current Year *</Label>
                    <Select 
                      value={formData.currentYear}
                      onValueChange={(value) => handleInputChange('currentYear', value)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                        <SelectItem value="5">5th Year</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="graduationYear">Expected Graduation *</Label>
                    <Input
                      id="graduationYear"
                      type="number"
                      value={formData.graduationYear}
                      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="gpa">GPA (Optional)</Label>
                    <Input
                      id="gpa"
                      type="number"
                      step="0.01"
                      value={formData.gpa}
                      onChange={(e) => handleInputChange('gpa', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bio">Bio/About Me *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself, your goals, and what you're passionate about..."
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="interests">Interests (comma-separated)</Label>
                  <Input
                    id="interests"
                    value={formData.interests}
                    onChange={(e) => handleInputChange('interests', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Technology, Music, Sports, Art..."
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {interestOptions.map(interest => (
                      <Badge key={interest} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Leadership, Communication, Programming..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="languages">Languages (comma-separated)</Label>
                  <Input
                    id="languages"
                    value={formData.languages}
                    onChange={(e) => handleInputChange('languages', e.target.value)}
                    disabled={!isEditing}
                    placeholder="English, Spanish, French..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="volunteerExperience">Volunteer Experience</Label>
                  <Textarea
                    id="volunteerExperience"
                    value={formData.volunteerExperience}
                    onChange={(e) => handleInputChange('volunteerExperience', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Describe any volunteer work or relevant experience..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Preferences */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Event Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="eventTypes">Preferred Event Types (comma-separated)</Label>
                  <Input
                    id="eventTypes"
                    value={formData.eventTypes}
                    onChange={(e) => handleInputChange('eventTypes', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Academic Conferences, Career Fairs, Tech Meetups..."
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {eventTypeOptions.map(type => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
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
                      <SelectItem value="weekdays">Weekdays Only</SelectItem>
                      <SelectItem value="weekends">Weekends Only</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                      <SelectItem value="limited">Limited Availability</SelectItem>
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