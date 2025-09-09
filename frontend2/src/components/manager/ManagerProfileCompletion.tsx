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
  Briefcase,
  Award,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Linkedin,
  Globe,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Building,
  Users
} from 'lucide-react';

export function ManagerProfileCompletion() {
  const { user, updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const [professionalInfo, setProfessionalInfo] = useState({
    company: user?.professionalInfo?.company || '',
    position: user?.professionalInfo?.position || '',
    experienceLevel: user?.professionalInfo?.experienceLevel || '',
    yearsOfExperience: user?.professionalInfo?.yearsOfExperience || '',
    department: user?.professionalInfo?.department || '',
    teamSize: user?.professionalInfo?.teamSize || '',
    eventTypesManaged: user?.professionalInfo?.eventTypesManaged || [],
    certifications: user?.professionalInfo?.certifications || [],
    specialSkills: user?.professionalInfo?.specialSkills || []
  });

  const [additionalInfo, setAdditionalInfo] = useState({
    phone: user?.additionalInfo?.phone || '',
    address: user?.additionalInfo?.address || '',
    emergencyContact: user?.additionalInfo?.emergencyContact || '',
    emergencyPhone: user?.additionalInfo?.emergencyPhone || '',
    linkedin: user?.additionalInfo?.linkedin || '',
    website: user?.additionalInfo?.website || '',
    bio: user?.additionalInfo?.bio || ''
  });

  const [currentEventType, setCurrentEventType] = useState('');
  const [currentCertification, setCurrentCertification] = useState('');
  const [currentSkill, setCurrentSkill] = useState('');

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const experienceLevels = ['Entry Level', 'Mid-Level', 'Senior Level', 'Executive Level'];
  const yearsOptions = ['0-1 years', '2-5 years', '6-10 years', '11-15 years', '16+ years'];
  const teamSizeOptions = ['1-5 people', '6-15 people', '16-30 people', '31-50 people', '50+ people'];

  const popularEventTypes = [
    'Corporate Events', 'Conferences', 'Trade Shows', 'Workshops', 'Seminars',
    'Team Building', 'Product Launches', 'Networking Events', 'Awards Ceremonies',
    'Training Sessions', 'Charity Events', 'Music Festivals', 'Sports Events'
  ];

  const popularCertifications = [
    'CMP - Certified Meeting Professional',
    'CEM - Certified in Exhibition Management',
    'CSEP - Certified Special Events Professional',
    'DES - Digital Event Strategist',
    'PMP - Project Management Professional',
    'CMM - Certificate in Meeting Management',
    'CPCE - Certified Professional in Catering and Events',
    'CFEE - Certified Festival & Event Executive'
  ];

  const popularSkills = [
    'Event Planning', 'Project Management', 'Budget Management', 'Vendor Relations',
    'Risk Management', 'Marketing & Promotion', 'Logistics Coordination', 'Team Leadership',
    'Client Relations', 'Contract Negotiation', 'Crisis Management', 'Digital Marketing',
    'Social Media Management', 'Event Technology', 'Public Speaking', 'Networking'
  ];

  const handleProfessionalChange = (field: string, value: string) => {
    setProfessionalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAdditionalChange = (field: string, value: string) => {
    setAdditionalInfo(prev => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: string, value: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
    if (value && !professionalInfo[field as keyof typeof professionalInfo].includes(value)) {
      setter(prev => ({
        ...prev,
        [field]: [...prev[field], value]
      }));
    }
  };

  const removeFromArray = (field: string, value: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
    setter(prev => ({
      ...prev,
      [field]: prev[field].filter((item: string) => item !== value)
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(professionalInfo.company && professionalInfo.position && 
                 professionalInfo.experienceLevel && professionalInfo.yearsOfExperience);
      case 2:
        return !!(additionalInfo.phone && additionalInfo.emergencyContact && 
                 additionalInfo.emergencyPhone);
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
        professionalInfo,
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
        <h1 className="text-3xl font-bold">Complete Your Manager Profile</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Help us understand your management expertise and preferences. This information helps us provide 
          relevant event opportunities and connect you with the right teams and vendors.
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

      {/* Step 1: Professional Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>Professional Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization *</Label>
                <Input
                  id="company"
                  value={professionalInfo.company}
                  onChange={(e) => handleProfessionalChange('company', e.target.value)}
                  placeholder="e.g., EventCorp Inc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Job Title/Position *</Label>
                <Input
                  id="position"
                  value={professionalInfo.position}
                  onChange={(e) => handleProfessionalChange('position', e.target.value)}
                  placeholder="e.g., Event Manager, Senior Coordinator"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level *</Label>
                <Select value={professionalInfo.experienceLevel} onValueChange={(value) => handleProfessionalChange('experienceLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map(level => (
                      <SelectItem key={level} value={level.toLowerCase().replace(' ', '-')}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience *</Label>
                <Select value={professionalInfo.yearsOfExperience} onValueChange={(value) => handleProfessionalChange('yearsOfExperience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearsOptions.map(years => (
                      <SelectItem key={years} value={years}>{years}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={professionalInfo.department}
                  onChange={(e) => handleProfessionalChange('department', e.target.value)}
                  placeholder="e.g., Events & Marketing, Operations"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamSize">Typical Team Size Managed</Label>
                <Select value={professionalInfo.teamSize} onValueChange={(value) => handleProfessionalChange('teamSize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamSizeOptions.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Event Types You Manage</Label>
              
              {/* Current Event Types */}
              {professionalInfo.eventTypesManaged.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {professionalInfo.eventTypesManaged.map((eventType, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" 
                           onClick={() => removeFromArray('eventTypesManaged', eventType, setProfessionalInfo)}>
                      {eventType} ×
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Add Custom Event Type */}
              <div className="flex space-x-2">
                <Input
                  value={currentEventType}
                  onChange={(e) => setCurrentEventType(e.target.value)}
                  placeholder="Add event type"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToArray('eventTypesManaged', currentEventType, setProfessionalInfo);
                      setCurrentEventType('');
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    addToArray('eventTypesManaged', currentEventType, setProfessionalInfo);
                    setCurrentEventType('');
                  }}
                  disabled={!currentEventType.trim()}
                >
                  Add
                </Button>
              </div>
              
              {/* Popular Event Types */}
              <div>
                <Label className="text-sm text-muted-foreground">Popular event types:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {popularEventTypes
                    .filter(eventType => !professionalInfo.eventTypesManaged.includes(eventType))
                    .slice(0, 10)
                    .map((eventType) => (
                    <Badge 
                      key={eventType} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-secondary"
                      onClick={() => addToArray('eventTypesManaged', eventType, setProfessionalInfo)}
                    >
                      + {eventType}
                    </Badge>
                  ))}
                </div>
              </div>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                value={additionalInfo.address}
                onChange={(e) => handleAdditionalChange('address', e.target.value)}
                placeholder="Your business address"
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
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                value={additionalInfo.bio}
                onChange={(e) => handleAdditionalChange('bio', e.target.value)}
                placeholder="Brief description of your management experience and approach"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Certifications & Skills */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Certifications & Professional Links</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Professional Certifications</Label>
              
              {/* Current Certifications */}
              {professionalInfo.certifications.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {professionalInfo.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" 
                           onClick={() => removeFromArray('certifications', cert, setProfessionalInfo)}>
                      {cert} ×
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Add Custom Certification */}
              <div className="flex space-x-2">
                <Input
                  value={currentCertification}
                  onChange={(e) => setCurrentCertification(e.target.value)}
                  placeholder="Add certification"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToArray('certifications', currentCertification, setProfessionalInfo);
                      setCurrentCertification('');
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    addToArray('certifications', currentCertification, setProfessionalInfo);
                    setCurrentCertification('');
                  }}
                  disabled={!currentCertification.trim()}
                >
                  Add
                </Button>
              </div>
              
              {/* Popular Certifications */}
              <div>
                <Label className="text-sm text-muted-foreground">Popular certifications:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {popularCertifications
                    .filter(cert => !professionalInfo.certifications.includes(cert))
                    .slice(0, 6)
                    .map((cert) => (
                    <Badge 
                      key={cert} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-secondary"
                      onClick={() => addToArray('certifications', cert, setProfessionalInfo)}
                    >
                      + {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Special Skills & Expertise</Label>
              
              {/* Current Skills */}
              {professionalInfo.specialSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {professionalInfo.specialSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer" 
                           onClick={() => removeFromArray('specialSkills', skill, setProfessionalInfo)}>
                      {skill} ×
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Add Custom Skill */}
              <div className="flex space-x-2">
                <Input
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="Add skill"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToArray('specialSkills', currentSkill, setProfessionalInfo);
                      setCurrentSkill('');
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    addToArray('specialSkills', currentSkill, setProfessionalInfo);
                    setCurrentSkill('');
                  }}
                  disabled={!currentSkill.trim()}
                >
                  Add
                </Button>
              </div>
              
              {/* Popular Skills */}
              <div>
                <Label className="text-sm text-muted-foreground">Popular skills:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {popularSkills
                    .filter(skill => !professionalInfo.specialSkills.includes(skill))
                    .slice(0, 12)
                    .map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-secondary"
                      onClick={() => addToArray('specialSkills', skill, setProfessionalInfo)}
                    >
                      + {skill}
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
                <Label htmlFor="website" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Company/Personal Website</span>
                </Label>
                <Input
                  id="website"
                  value={additionalInfo.website}
                  onChange={(e) => handleAdditionalChange('website', e.target.value)}
                  placeholder="https://yourcompany.com"
                />
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Why do we collect this information?</strong><br />
                Your professional details help us match you with relevant event opportunities and connect you with 
                suitable teams, vendors, and clients. This information is also used to showcase your expertise to potential partners.
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