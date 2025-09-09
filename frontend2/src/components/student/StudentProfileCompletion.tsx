import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  GraduationCap,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Linkedin,
  Github,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  User
} from 'lucide-react';

export function StudentProfileCompletion() {
  const { user, updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const [academicInfo, setAcademicInfo] = useState({
    university: user?.academicInfo?.university || '',
    studentId: user?.academicInfo?.studentId || '',
    year: user?.academicInfo?.year || '',
    major: user?.academicInfo?.major || '',
    graduationYear: user?.academicInfo?.graduationYear || ''
  });

  const [additionalInfo, setAdditionalInfo] = useState({
    phone: user?.additionalInfo?.phone || '',
    dateOfBirth: user?.additionalInfo?.dateOfBirth || '',
    address: user?.additionalInfo?.address || '',
    emergencyContact: user?.additionalInfo?.emergencyContact || '',
    emergencyPhone: user?.additionalInfo?.emergencyPhone || '',
    dietaryRestrictions: user?.additionalInfo?.dietaryRestrictions || '',
    interests: user?.additionalInfo?.interests || [],
    linkedin: user?.additionalInfo?.linkedin || '',
    github: user?.additionalInfo?.github || ''
  });

  const [currentInterest, setCurrentInterest] = useState('');

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const academicYears = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'PhD'];
  const graduationYears = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];
  
  const popularInterests = [
    'Technology', 'Music', 'Sports', 'Arts', 'Volunteering', 'Photography', 
    'Travel', 'Cooking', 'Reading', 'Gaming', 'Fitness', 'Environment',
    'Education', 'Healthcare', 'Business', 'Design', 'Marketing', 'Research'
  ];

  const handleAcademicChange = (field: string, value: string) => {
    setAcademicInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAdditionalChange = (field: string, value: string) => {
    setAdditionalInfo(prev => ({ ...prev, [field]: value }));
  };

  const addInterest = (interest: string) => {
    if (interest && !additionalInfo.interests.includes(interest)) {
      setAdditionalInfo(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const removeInterest = (interest: string) => {
    setAdditionalInfo(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(academicInfo.university && academicInfo.year && academicInfo.major);
      case 2:
        return !!(additionalInfo.phone && additionalInfo.emergencyContact && additionalInfo.emergencyPhone);
      case 3:
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

  const handleComplete = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      updateProfile({
        academicInfo,
        additionalInfo,
        profileCompleted: true
      });
      
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Complete Your Student Profile</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Help us understand your academic background and interests. This information helps us recommend 
          relevant events and volunteer opportunities that align with your studies and career goals.
        </p>
        
        {/* Progress */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Step 1: Academic Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Academic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="university">University/Institution *</Label>
                <Input
                  id="university"
                  value={academicInfo.university}
                  onChange={(e) => handleAcademicChange('university', e.target.value)}
                  placeholder="e.g., University of California, Berkeley"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={academicInfo.studentId}
                  onChange={(e) => handleAcademicChange('studentId', e.target.value)}
                  placeholder="e.g., 123456789"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Academic Year *</Label>
                <Select value={academicInfo.year} onValueChange={(value) => handleAcademicChange('year', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    {academicYears.map(year => (
                      <SelectItem key={year} value={year.toLowerCase().replace(' ', '-')}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                <Select value={academicInfo.graduationYear} onValueChange={(value) => handleAcademicChange('graduationYear', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select graduation year" />
                  </SelectTrigger>
                  <SelectContent>
                    {graduationYears.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="major">Major/Field of Study *</Label>
              <Input
                id="major"
                value={academicInfo.major}
                onChange={(e) => handleAcademicChange('major', e.target.value)}
                placeholder="e.g., Computer Science, Business Administration, Psychology"
              />
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Why do we need this?</strong><br />
                Your academic information helps us match you with relevant events, internships, and volunteer 
                opportunities that align with your field of study and career goals.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Contact & Emergency Information */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Contact & Emergency Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={additionalInfo.phone}
                  onChange={(e) => handleAdditionalChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={additionalInfo.dateOfBirth}
                  onChange={(e) => handleAdditionalChange('dateOfBirth', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={additionalInfo.address}
                onChange={(e) => handleAdditionalChange('address', e.target.value)}
                placeholder="Your current address"
                rows={2}
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-4 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span>Emergency Contact Information</span>
              </h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                  <Input
                    id="emergencyContact"
                    value={additionalInfo.emergencyContact}
                    onChange={(e) => handleAdditionalChange('emergencyContact', e.target.value)}
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={additionalInfo.emergencyPhone}
                    onChange={(e) => handleAdditionalChange('emergencyPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions/Allergies</Label>
              <Textarea
                id="dietaryRestrictions"
                value={additionalInfo.dietaryRestrictions}
                onChange={(e) => handleAdditionalChange('dietaryRestrictions', e.target.value)}
                placeholder="Any dietary restrictions, food allergies, or special requirements"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Interests & Social Links */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Interests & Social Links</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Your Interests</Label>
              
              {/* Current Interests */}
              {additionalInfo.interests.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {additionalInfo.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" 
                           onClick={() => removeInterest(interest)}>
                      {interest} ×
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Add Custom Interest */}
              <div className="flex space-x-2">
                <Input
                  value={currentInterest}
                  onChange={(e) => setCurrentInterest(e.target.value)}
                  placeholder="Add an interest"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addInterest(currentInterest);
                      setCurrentInterest('');
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    addInterest(currentInterest);
                    setCurrentInterest('');
                  }}
                  disabled={!currentInterest.trim()}
                >
                  Add
                </Button>
              </div>
              
              {/* Popular Interests */}
              <div>
                <Label className="text-sm text-muted-foreground">Popular interests:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {popularInterests
                    .filter(interest => !additionalInfo.interests.includes(interest))
                    .slice(0, 12)
                    .map((interest) => (
                    <Badge 
                      key={interest} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-secondary"
                      onClick={() => addInterest(interest)}
                    >
                      + {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="flex items-center space-x-2">
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn Profile</span>
                </Label>
                <Input
                  id="linkedin"
                  value={additionalInfo.linkedin}
                  onChange={(e) => handleAdditionalChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github" className="flex items-center space-x-2">
                  <Github className="h-4 w-4" />
                  <span>GitHub Profile</span>
                </Label>
                <Input
                  id="github"
                  value={additionalInfo.github}
                  onChange={(e) => handleAdditionalChange('github', e.target.value)}
                  placeholder="https://github.com/yourusername"
                />
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Why do we collect this information?</strong><br />
                Your interests help us recommend events that match your passions and career goals. 
                Social links are optional but help event organizers learn more about your background.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
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
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={handleComplete}
            disabled={isSaving}
          >
            {isSaving ? (
              'Saving...'
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Profile
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}