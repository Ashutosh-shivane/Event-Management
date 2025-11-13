import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { toast } from 'sonner@2.0.3';
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
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Phone,
  Mail,
  Star,
  Bike,
  AlertTriangle,
  CalendarCheck
} from 'lucide-react';
import axios from 'axios';

export function StudentRegisterPage() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProfileWarning, setShowProfileWarning] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [formData, setFormData] = useState({
    previousExperience: '',
    motivation: '',
    availability_notes: '',
    specialSkills: '',
    // Event-specific questions
    availableOnEventDay: '',
    hasBike: '',
    hasTransportation: '',
    dietaryRestrictions: '',
    agreeTerms: false,
    agreeBackground: false
  });

  // Check profile completion on component mount
   useEffect(() => {
    const fetchProfileCompleted = async () => {
      if (user && user.role === "STUDENT") {
        try {

          let userid=localStorage.getItem('id');

          let eventid=localStorage.getItem('eventid');

          const response = await axios.get(
            `http://localhost:8080/Student/GetprofileCompleted/${userid}/${eventid}`
          );
          const profileCompleted = response.data.profileCompleted; 
          
          console.log(profileCompleted);// backend returns 100

          if (profileCompleted != "100") {
            setShowProfileWarning(true);
          } else {
            setShowProfileWarning(false);
          
          }

          const alredy_apply=response.data.alreadyApplied;

          if (alredy_apply ) {
            setAlreadyApplied(true);
          } else {
            setAlreadyApplied(false);
          
          }



        } catch (error) {
          console.error("Error fetching profile completion:", error);
        }
      }
    };

    fetchProfileCompleted();
  }, [user]);

  // Mock event data - in real app this would come from props or API


  const eventDataString = localStorage.getItem("eventDetails");
  const eventData = eventDataString ? JSON.parse(eventDataString) : null;

   const eventDate = new Date(eventData.startAt);

  const event = {
    id: eventData.id,
    title: eventData.title,
    organizer: eventData.createdByName,
    date: eventDate.toLocaleDateString(),
    time:eventDate.toLocaleTimeString(),
    location: eventData.location,
    description: eventData.description,
    requirements: [
     
    ],
    roles: [
     
    ],
    benefits: [
     
    ]
  };

  



  // const [selectedRole, setSelectedRole] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const isFormValid = () => {
    const required = ['motivation', 'availableOnEventDay', 'hasBike', 'hasTransportation'];
    return required.every(field => formData[field as keyof typeof formData]) &&          
           formData.agreeTerms &&
           formData.agreeBackground;
  };

  const handleGoToProfile = () => {
    navigate('/profile'); // Navigate directly to profile page
  };


  function mapFormDataToDTO(formData: any): any {
  return {
    eventid: localStorage.getItem("eventid"),          // eventId → eventid
    userid: localStorage.getItem("id"),                                 // pass logged-in user id
    prevExp: formData.previousExperience,           // previousExperience → prevExp
    reasonforevent: formData.motivation,            // motivation → reasonforevent
    skills: formData.specialSkills,                 // specialSkills → skills
    notes: formData.availability_notes,             // selectedRole → notes (if empty keep "")
    availability: formData.availableOnEventDay,            // availability → availability
    haveBike: formData.hasBike,                     // hasBike → haveBike
    transportMedium: formData.hasTransportation,    // hasTransportation → transportMedium
    dietaryRestrictions: formData.dietaryRestrictions, // dietaryRestrictions → dietaryRestrictions
    status: "PENDING"                               // default status
  };
}



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      let indata=mapFormDataToDTO(formData);
    
      // Simulate API call
      const response = await axios.post(
      `http://localhost:8080/Student/RegisterEvent`,
     indata
    );
      
      // Log the complete form data (in real app, this would be sent to API)
      console.log('Registration Data:', {
        ...formData,
        selectedRole,
        eventId: event.id
      });
      
      // Show success and redirect
      toast.success('Registration submitted successfully! You will receive a confirmation email shortly.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If profile is not completed, show warning
  if (showProfileWarning) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Registration</h1>
            <p className="text-gray-600">Complete your profile to register for events</p>
          </div>

          {/* Profile Completion Required Card */}
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile First</h2>
                  <p className="text-gray-600 mb-4">
                    To ensure we have all the necessary information for event registration and to provide you with the best experience, please complete your student profile first. This will only take a few minutes.
                  </p>
                  <p className="text-sm text-gray-500">
                    Once your profile is 100% complete, you'll be able to register for events instantly.
                  </p>
                </div>

                <Alert className="border-orange-200 bg-orange-50 text-left">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription>
                    <strong className="text-orange-800">Required Profile Information:</strong>
                    <ul className="mt-2 text-orange-700 list-disc list-inside space-y-1">
                      <li>Academic information (university, student ID, major)</li>
                      <li>Contact details and emergency contacts</li>
                      <li>Skills and interests</li>
                      <li>Availability preferences</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    onClick={handleGoToProfile}
                    className="bg-orange-600 hover:bg-orange-700"
                    disabled={true}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Complete Profile Now
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                  >
                    Return to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }



 if (alreadyApplied) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Already Registered</h1>
          <p className="text-gray-600 mb-4">
            You have already applied for this event. You cannot register again.
          </p>
          <Button 
            variant="outline" 
             onClick={() => navigate('/dashboard')}
            className="mt-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}



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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Registration</h1>
          <p className="text-gray-600">Register as a volunteer for this event</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Information */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    Organized by {event.organizer}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Event Description</h4>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {event.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-500 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Benefits</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {event.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-3 w-3 mr-2 mt-1 text-blue-500 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">


              {/* Role Selection */}
              {/* <Card >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Volunteer Role Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.roles.map((role) => (
                      <div
                        key={role.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedRole === role.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        } ${role.filled >= role.spots ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => {
                          if (role.filled < role.spots) {
                            setSelectedRole(role.id);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{role.title}</h4>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="role"
                              value={role.id}
                              checked={selectedRole === role.id}
                              onChange={() => setSelectedRole(role.id)}
                              disabled={role.filled >= role.spots}
                              className="mr-2"
                            />
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {role.filled}/{role.spots} positions filled
                          {role.filled >= role.spots && (
                            <Badge variant="destructive" className="ml-2">Full</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card> */}

              {/* Experience & Motivation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Experience & Motivation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="previousExperience">Previous Volunteer Experience</Label>
                    <Textarea
                      id="previousExperience"
                      value={formData.previousExperience}
                      onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                      placeholder="Describe any previous volunteer experience or relevant activities"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Why do you want to volunteer for this event? *</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                      placeholder="Tell us what motivates you to volunteer and how this aligns with your interests"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialSkills">Special Skills or Qualifications</Label>
                    <Textarea
                      id="specialSkills"
                      value={formData.specialSkills}
                      onChange={(e) => handleInputChange('specialSkills', e.target.value)}
                      placeholder="Any special skills, languages, or qualifications that might be relevant"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability Notes</Label>
                    <Textarea
                      id="availability"
                      value={formData.availability_notes}
                      onChange={(e) => handleInputChange('availability_notes', e.target.value)}
                      placeholder="Any specific availability constraints or preferences"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>



              {/* Event-Specific Questions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarCheck className="h-5 w-5 mr-2 text-blue-500" />
                    Event-Specific Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="availableOnEventDay">Are you available on {event.date}? *</Label>
                    <Select value={formData.availableOnEventDay} onValueChange={(value) => handleInputChange('availableOnEventDay', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes-full-day">Yes, I'm available for the full event duration</SelectItem>
                        <SelectItem value="yes-partial">Yes, but only for part of the day</SelectItem>
                        <SelectItem value="maybe">Maybe, depends on other commitments</SelectItem>
                        <SelectItem value="no">No, I have conflicts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hasBike">Do you have a bike for transportation? *</Label>
                    <Select value={formData.hasBike} onValueChange={(value) => handleInputChange('hasBike', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bike availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes, I have my own bike</SelectItem>
                        <SelectItem value="yes-can-bring">Yes, and I can bring it to the event</SelectItem>
                        <SelectItem value="no-but-can-rent">No, but I can rent one if needed</SelectItem>
                        <SelectItem value="no">No, I don't have access to a bike</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hasTransportation">How will you get to the event location? *</Label>
                    <Select value={formData.hasTransportation} onValueChange={(value) => handleInputChange('hasTransportation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transportation method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="own-car">Own car</SelectItem>
                        <SelectItem value="public-transport">Public transportation</SelectItem>
                        <SelectItem value="bike">Bicycle</SelectItem>
                        <SelectItem value="walking">Walking</SelectItem>
                        <SelectItem value="rideshare">Rideshare/Taxi</SelectItem>
                        <SelectItem value="family-friend">Family/Friend drop-off</SelectItem>
                        <SelectItem value="need-help">Need transportation assistance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dietaryRestrictions">Dietary Restrictions or Allergies</Label>
                    <Textarea
                      id="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                      placeholder="Please list any dietary restrictions, food allergies, or special meal requirements"
                      rows={2}
                    />
                  </div>

                  <Alert className="border-blue-200 bg-blue-50">
                    <Bike className="h-4 w-4 text-blue-600" />
                    <AlertDescription>
                      <strong className="text-blue-800">Note:</strong>
                      <span className="text-blue-700 ml-1">
                        Some volunteer roles may require mobility around the event venue. Having transportation or a bike can be helpful for certain assignments.
                      </span>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleCheckboxChange('agreeTerms', checked as boolean)}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm leading-6">
                      I agree to the <button type="button" className="text-blue-600 hover:underline">Terms and Conditions</button> and 
                      <button type="button" className="text-blue-600 hover:underline ml-1">Privacy Policy</button> *
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeBackground"
                      checked={formData.agreeBackground}
                      onCheckedChange={(checked) => handleCheckboxChange('agreeBackground', checked as boolean)}
                    />
                    <Label htmlFor="agreeBackground" className="text-sm leading-6">
                      I understand that a background check may be required for certain volunteer positions *
                    </Label>
                  </div>

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      By submitting this registration, you commit to attending the event. Please only register if you are certain you can fulfill the volunteer commitment.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className="px-8"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}