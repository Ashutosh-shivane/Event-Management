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
  CheckCircle,
  AlertTriangle,
  User,
  Mail,
  Phone,
  GraduationCap,
  FileText
} from 'lucide-react';

interface StudentRegisterPageProps {
  eventId: string | null;
  onNavigate: (page: PageType) => void;
}

export function StudentRegisterPage({ eventId, onNavigate }: StudentRegisterPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    year: '',
    previousExperience: '',
    motivation: '',
    availability: '',
    specialSkills: '',
    emergencyContact: '',
    emergencyPhone: '',
    agreeTerms: false,
    agreeBackground: false
  });

  // Mock event data - in real app this would come from props or API
  const event = {
    id: eventId,
    title: 'Tech Conference 2024',
    organizer: 'John Doe',
    date: '2024-03-15',
    time: '9:00 AM - 6:00 PM',
    location: 'Convention Center, Downtown',
    description: 'Join us for an exciting day of technology talks, networking, and learning. This conference brings together industry leaders, students, and professionals to share insights about the latest trends in technology.',
    requirements: [
      'Must be a current student',
      'Basic communication skills',
      'Enthusiasm for technology',
      'Ability to commit to full event duration'
    ],
    roles: [
      { id: 'registration', title: 'Registration Assistant', spots: 5, filled: 2 },
      { id: 'tech-support', title: 'Tech Support', spots: 3, filled: 1 },
      { id: 'guide', title: 'Event Guide', spots: 8, filled: 4 },
      { id: 'social', title: 'Social Media Assistant', spots: 2, filled: 0 }
    ],
    benefits: [
      'Certificate of participation',
      'Networking opportunities',
      'Free meals and refreshments',
      'Access to all conference sessions',
      'Letter of recommendation (if requested)'
    ]
  };

  const [selectedRole, setSelectedRole] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const isFormValid = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'university', 'major', 'year', 'motivation', 'emergencyContact', 'emergencyPhone'];
    return required.every(field => formData[field as keyof typeof formData]) &&
           selectedRole &&
           formData.agreeTerms &&
           formData.agreeBackground;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success and redirect
      alert('Registration submitted successfully! You will receive a confirmation email shortly.');
      onNavigate('dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
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
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="university">University/Institution *</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="major">Major/Field of Study *</Label>
                      <Input
                        id="major"
                        value={formData.major}
                        onChange={(e) => handleInputChange('major', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Academic Year *</Label>
                      <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st-year">1st Year</SelectItem>
                          <SelectItem value="2nd-year">2nd Year</SelectItem>
                          <SelectItem value="3rd-year">3rd Year</SelectItem>
                          <SelectItem value="4th-year">4th Year</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Role Selection */}
              <Card>
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
              </Card>

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
                      value={formData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      placeholder="Any specific availability constraints or preferences"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                        required
                      />
                    </div>
                  </div>
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
                  onClick={() => onNavigate('dashboard')}
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