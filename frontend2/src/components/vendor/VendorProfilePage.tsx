import React from 'react';
import { useAuth } from '../AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  DollarSign,
  Star,
  Package,
  Edit,
  Save,
  X
} from 'lucide-react';

export function VendorProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  // Mock vendor profile data
  const [profileData, setProfileData] = React.useState({
    businessName: 'Premium Catering Solutions',
    businessType: 'Catering',
    contactPerson: 'Sarah Johnson',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345',
    website: 'www.premiumcatering.com',
    description: 'Professional catering services for corporate events, weddings, and special occasions. We provide high-quality food and exceptional service.',
    services: ['Event Catering', 'Corporate Lunch', 'Wedding Catering', 'Equipment Rental'],
    priceRange: 'Premium',
    capacity: '500+ guests',
    experienceYears: '10+',
    certifications: ['Food Safety Certified', 'Licensed Caterer', 'Insured Business'],
    rating: 4.8,
    completedEvents: 250,
    portfolio: []
  });

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
    'Other'
  ];

  const priceRanges = [
    'Budget Friendly',
    'Mid-Range',
    'Premium',
    'Luxury'
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const addService = (service: string) => {
    if (service && !profileData.services.includes(service)) {
      setProfileData(prev => ({
        ...prev,
        services: [...prev.services, service]
      }));
    }
  };

  const removeService = (service: string) => {
    setProfileData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Vendor Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your business information and showcase your services
          </p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Business Name *</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                    />
                  ) : (
                    <p className="font-medium">{profileData.businessName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Business Type *</Label>
                  {isEditing ? (
                    <Select
                      value={profileData.businessType}
                      onValueChange={(value) => handleInputChange('businessType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="font-medium">{profileData.businessType}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Business Description</Label>
                {isEditing ? (
                  <Textarea
                    value={profileData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                ) : (
                  <p>{profileData.description}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Contact Person</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    />
                  ) : (
                    <p>{profileData.contactPerson}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  ) : (
                    <p>{profileData.website}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <p>{profileData.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <p>{profileData.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Business Address</Label>
                {isEditing ? (
                  <Textarea
                    value={profileData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={2}
                  />
                ) : (
                  <p>{profileData.address}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Services & Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Services & Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Services Offered</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.services.map(service => (
                    <Badge key={service} variant="secondary">
                      {service}
                      {isEditing && (
                        <button 
                          onClick={() => removeService(service)}
                          className="ml-2 text-xs"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <Input
                    placeholder="Add new service and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addService(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  {isEditing ? (
                    <Select
                      value={profileData.priceRange}
                      onValueChange={(value) => handleInputChange('priceRange', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map(range => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p>{profileData.priceRange}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Event Capacity</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.capacity}
                      onChange={(e) => handleInputChange('capacity', e.target.value)}
                    />
                  ) : (
                    <p>{profileData.capacity}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Experience</Label>
                  {isEditing ? (
                    <Input
                      value={profileData.experienceYears}
                      onChange={(e) => handleInputChange('experienceYears', e.target.value)}
                    />
                  ) : (
                    <p>{profileData.experienceYears}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Business Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Business Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Rating</span>
                </div>
                <span className="font-bold">{profileData.rating}/5.0</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-blue-500" />
                  <span>Events Completed</span>
                </div>
                <span className="font-bold">{profileData.completedEvents}</span>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profileData.certifications.map(cert => (
                  <Badge key={cert} variant="outline" className="w-full justify-start">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                View Portfolio
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Pricing Calculator
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Globe className="h-4 w-4 mr-2" />
                Public Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}