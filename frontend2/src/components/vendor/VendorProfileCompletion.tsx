import React from 'react';
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
  Building2,
  MapPin,
  Package,
  DollarSign,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export function VendorProfileCompletion() {
  const { updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSaving, setIsSaving] = React.useState(false);
  const totalSteps = 3;

  const [businessInfo, setBusinessInfo] = React.useState({
    businessName: '',
    businessType: '',
    contactPerson: '',
    description: '',
    website: '',
    foundedYear: '',
    teamSize: ''
  });

  const [contactInfo, setContactInfo] = React.useState({
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    operatingHours: '',
    serviceAreas: []
  });

  const [servicesInfo, setServicesInfo] = React.useState({
    services: [],
    priceRange: '',
    capacity: '',
    experienceYears: '',
    certifications: [],
    portfolioItems: [],
    specializations: []
  });

  const [currentService, setCurrentService] = React.useState('');
  const [currentArea, setCurrentArea] = React.useState('');

  const businessTypes = [
    'Catering',
    'Photography',
    'Videography',
    'Event Planning',
    'Decoration',
    'Entertainment',
    'Transportation',
    'Equipment Rental',
    'Venue',
    'Security',
    'Cleaning',
    'Audio/Visual',
    'Floral',
    'Other'
  ];

  const priceRanges = [
    'Budget Friendly ($-$$)',
    'Mid-Range ($$-$$$)',
    'Premium ($$$-$$$$)',
    'Luxury ($$$$+)'
  ];

  const handleBusinessChange = (field: string, value: string) => {
    setBusinessInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: string, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleServicesChange = (field: string, value: string) => {
    setServicesInfo(prev => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    if (currentService && !servicesInfo.services.includes(currentService)) {
      setServicesInfo(prev => ({
        ...prev,
        services: [...prev.services, currentService]
      }));
      setCurrentService('');
    }
  };

  const removeService = (service: string) => {
    setServicesInfo(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }));
  };

  const addServiceArea = () => {
    if (currentArea && !contactInfo.serviceAreas.includes(currentArea)) {
      setContactInfo(prev => ({
        ...prev,
        serviceAreas: [...prev.serviceAreas, currentArea]
      }));
      setCurrentArea('');
    }
  };

  const removeServiceArea = (area: string) => {
    setContactInfo(prev => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter(a => a !== area)
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(businessInfo.businessName && businessInfo.businessType && businessInfo.contactPerson);
      case 2:
        return !!(contactInfo.phone && contactInfo.address && contactInfo.city);
      case 3:
        return servicesInfo.services.length > 0;
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
        businessInfo,
        contactInfo,
        servicesInfo,
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
        <h1 className="text-3xl font-bold">Complete Your Vendor Profile</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Set up your business profile to start receiving event opportunities. This information 
          helps event organizers find and evaluate your services.
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className={currentStep >= 1 ? 'text-primary font-medium' : ''}>
                Business Info
              </span>
              <span className={currentStep >= 2 ? 'text-primary font-medium' : ''}>
                Contact Details
              </span>
              <span className={currentStep >= 3 ? 'text-primary font-medium' : ''}>
                Services
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Business Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Business Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={businessInfo.businessName}
                  onChange={(e) => handleBusinessChange('businessName', e.target.value)}
                  placeholder="e.g., Premium Event Solutions"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={businessInfo.businessType} onValueChange={(value) => handleBusinessChange('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={businessInfo.contactPerson}
                  onChange={(e) => handleBusinessChange('contactPerson', e.target.value)}
                  placeholder="Primary contact name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={businessInfo.website}
                  onChange={(e) => handleBusinessChange('website', e.target.value)}
                  placeholder="https://your-website.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                value={businessInfo.description}
                onChange={(e) => handleBusinessChange('description', e.target.value)}
                placeholder="Describe your business, services, and what makes you unique..."
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input
                  id="foundedYear"
                  value={businessInfo.foundedYear}
                  onChange={(e) => handleBusinessChange('foundedYear', e.target.value)}
                  placeholder="e.g., 2015"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Select value={businessInfo.teamSize} onValueChange={(value) => handleBusinessChange('teamSize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Just me</SelectItem>
                    <SelectItem value="2-5">2-5 people</SelectItem>
                    <SelectItem value="6-15">6-15 people</SelectItem>
                    <SelectItem value="16-50">16-50 people</SelectItem>
                    <SelectItem value="50+">50+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Contact Information */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={contactInfo.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operatingHours">Operating Hours</Label>
                <Input
                  id="operatingHours"
                  value={contactInfo.operatingHours}
                  onChange={(e) => handleContactChange('operatingHours', e.target.value)}
                  placeholder="e.g., Mon-Fri 9AM-6PM"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address *</Label>
              <Input
                id="address"
                value={contactInfo.address}
                onChange={(e) => handleContactChange('address', e.target.value)}
                placeholder="Street address"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={contactInfo.city}
                  onChange={(e) => handleContactChange('city', e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={contactInfo.state}
                  onChange={(e) => handleContactChange('state', e.target.value)}
                  placeholder="State"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={contactInfo.zipCode}
                  onChange={(e) => handleContactChange('zipCode', e.target.value)}
                  placeholder="ZIP Code"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Service Areas</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {contactInfo.serviceAreas.map(area => (
                  <Badge key={area} variant="secondary">
                    {area}
                    <button 
                      onClick={() => removeServiceArea(area)}
                      className="ml-2 text-xs"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={currentArea}
                  onChange={(e) => setCurrentArea(e.target.value)}
                  placeholder="Add service area (e.g., San Francisco Bay Area)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addServiceArea();
                    }
                  }}
                />
                <Button type="button" onClick={addServiceArea} variant="outline">
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Services & Expertise */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Services & Expertise</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Services Offered *</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {servicesInfo.services.map(service => (
                  <Badge key={service} variant="secondary">
                    {service}
                    <button 
                      onClick={() => removeService(service)}
                      className="ml-2 text-xs"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={currentService}
                  onChange={(e) => setCurrentService(e.target.value)}
                  placeholder="Add a service you offer"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addService();
                    }
                  }}
                />
                <Button type="button" onClick={addService} variant="outline">
                  Add
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priceRange">Price Range</Label>
                <Select value={servicesInfo.priceRange} onValueChange={(value) => handleServicesChange('priceRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map(range => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Event Capacity</Label>
                <Input
                  id="capacity"
                  value={servicesInfo.capacity}
                  onChange={(e) => handleServicesChange('capacity', e.target.value)}
                  placeholder="e.g., Up to 500 guests"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Select value={servicesInfo.experienceYears} onValueChange={(value) => handleServicesChange('experienceYears', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Less than 1 year">Less than 1 year</SelectItem>
                  <SelectItem value="1-2 years">1-2 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value="6-10 years">6-10 years</SelectItem>
                  <SelectItem value="10+ years">10+ years</SelectItem>
                </SelectContent>
              </Select>
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
          <ArrowLeft className="h-4 w-4 mr-2" />
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
            disabled={!validateStep(currentStep) || isSaving}
            className="px-8"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </>
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