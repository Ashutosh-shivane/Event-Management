import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { 
  Search, 
  Eye,
  CheckCircle,
  XCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  DollarSign,
  Calendar,
  Users,
  FileText,
  Shield,
  AlertTriangle
} from 'lucide-react';

export function AdminVendorApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  const vendors = [
    {
      id: 1,
      name: 'Premium Catering Solutions',
      contactName: 'Sarah Johnson',
      email: 'sarah@premiumcatering.com',
      phone: '+1-555-0123',
      website: 'www.premiumcatering.com',
      location: 'San Francisco, CA',
      category: 'catering',
      status: 'pending',
      submissionDate: '2024-03-08',
      businessLicense: 'verified',
      insurance: 'verified',
      experience: '8 years',
      pricing: '$50-150 per person',
      services: ['Corporate Catering', 'Wedding Catering', 'Event Planning'],
      portfolio: [
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=400&h=300&fit=crop'
      ],
      pastEvents: 45,
      rating: null,
      notes: 'New premium catering service with excellent credentials'
    },
    {
      id: 2,
      name: 'TechAV Solutions',
      contactName: 'Mike Wilson',
      email: 'mike@techav.com',
      phone: '+1-555-0124',
      website: 'www.techav.com',
      location: 'New York, NY',
      category: 'audio-visual',
      status: 'approved',
      submissionDate: '2024-03-05',
      approvalDate: '2024-03-07',
      businessLicense: 'verified',
      insurance: 'verified',
      experience: '12 years',
      pricing: '$500-2500 per event',
      services: ['Sound Systems', 'Lighting', 'Video Production'],
      portfolio: [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=400&h=300&fit=crop'
      ],
      pastEvents: 120,
      rating: 4.8,
      notes: 'Excellent track record with corporate events'
    },
    {
      id: 3,
      name: 'Elite Security Services',
      contactName: 'David Brown',
      email: 'david@elitesecurity.com',
      phone: '+1-555-0125',
      website: 'www.elitesecurity.com',
      location: 'Los Angeles, CA',
      category: 'security',
      status: 'rejected',
      submissionDate: '2024-03-02',
      rejectionDate: '2024-03-04',
      businessLicense: 'pending',
      insurance: 'verified',
      experience: '3 years',
      pricing: '$25-75 per hour',
      services: ['Event Security', 'Crowd Control', 'VIP Protection'],
      portfolio: [],
      pastEvents: 12,
      rating: null,
      rejectionReason: 'Insufficient experience and pending business license'
    },
    {
      id: 4,
      name: 'Creative Decorations Co',
      contactName: 'Emily Davis',
      email: 'emily@creativedecorations.com',
      phone: '+1-555-0126',
      website: 'www.creativedecorations.com',
      location: 'Chicago, IL',
      category: 'decorations',
      status: 'review',
      submissionDate: '2024-03-10',
      businessLicense: 'verified',
      insurance: 'verified',
      experience: '6 years',
      pricing: '$200-1500 per event',
      services: ['Event Decorations', 'Floral Arrangements', 'Theme Design'],
      portfolio: [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=300&fit=crop'
      ],
      pastEvents: 78,
      rating: 4.6,
      notes: 'Strong portfolio, needs verification call'
    }
  ];

  const stats = [
    { label: 'Total Applications', value: 234, change: '+12%', color: 'blue' },
    { label: 'Pending Review', value: 45, change: '+8%', color: 'yellow' },
    { label: 'Approved Vendors', value: 156, change: '+15%', color: 'green' },
    { label: 'Rejected', value: 33, change: '-2%', color: 'red' }
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || vendor.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      catering: 'bg-orange-100 text-orange-800',
      'audio-visual': 'bg-purple-100 text-purple-800',
      security: 'bg-red-100 text-red-800',
      decorations: 'bg-pink-100 text-pink-800',
      photography: 'bg-blue-100 text-blue-800',
      transport: 'bg-green-100 text-green-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'rejected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleApproveVendor = (vendorId: number) => {
    console.log(`Approving vendor ${vendorId}`);
    // Here you would update the vendor status in your backend
  };

  const handleRejectVendor = (vendorId: number) => {
    console.log(`Rejecting vendor ${vendorId}`);
    // Here you would update the vendor status in your backend
  };

  const VendorDetailsModal = ({ vendor }: { vendor: any }) => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Vendor Application - {vendor.name}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Business Name</label>
              <p>{vendor.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Contact Person</label>
              <p>{vendor.contactName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {vendor.email}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {vendor.phone}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Website</label>
              <p className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                {vendor.website}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Location</label>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {vendor.location}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Category</label>
              <Badge className={getCategoryColor(vendor.category)}>
                {vendor.category}
              </Badge>
            </div>
            <div>
              <label className="text-sm text-gray-600">Status</label>
              <Badge className={getStatusColor(vendor.status)}>
                {vendor.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="border-t pt-4">
          <h3 className="mb-4">Business Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Experience</label>
                <p className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {vendor.experience}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Past Events</label>
                <p className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {vendor.pastEvents} events completed
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Pricing Range</label>
                <p className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {vendor.pricing}
                </p>
              </div>
              {vendor.rating && (
                <div>
                  <label className="text-sm text-gray-600">Rating</label>
                  <p className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    {vendor.rating}/5.0
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Business License</label>
                <p className={getVerificationColor(vendor.businessLicense)}>
                  {vendor.businessLicense === 'verified' && <CheckCircle className="h-4 w-4 inline mr-2" />}
                  {vendor.businessLicense === 'pending' && <AlertTriangle className="h-4 w-4 inline mr-2" />}
                  {vendor.businessLicense === 'rejected' && <XCircle className="h-4 w-4 inline mr-2" />}
                  {vendor.businessLicense}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Insurance</label>
                <p className={getVerificationColor(vendor.insurance)}>
                  {vendor.insurance === 'verified' && <CheckCircle className="h-4 w-4 inline mr-2" />}
                  {vendor.insurance === 'pending' && <AlertTriangle className="h-4 w-4 inline mr-2" />}
                  {vendor.insurance === 'rejected' && <XCircle className="h-4 w-4 inline mr-2" />}
                  {vendor.insurance}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Submission Date</label>
                <p>{vendor.submissionDate}</p>
              </div>
              {vendor.approvalDate && (
                <div>
                  <label className="text-sm text-gray-600">Approval Date</label>
                  <p>{vendor.approvalDate}</p>
                </div>
              )}
              {vendor.rejectionDate && (
                <div>
                  <label className="text-sm text-gray-600">Rejection Date</label>
                  <p>{vendor.rejectionDate}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="border-t pt-4">
          <h3 className="mb-4">Services Offered</h3>
          <div className="flex flex-wrap gap-2">
            {vendor.services.map((service: string, index: number) => (
              <Badge key={index} variant="outline">{service}</Badge>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        {vendor.portfolio.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="mb-4">Portfolio</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {vendor.portfolio.map((image: string, index: number) => (
                <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img src={image} alt={`Portfolio ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {vendor.notes && (
          <div className="border-t pt-4">
            <label className="text-sm text-gray-600">Notes</label>
            <p>{vendor.notes}</p>
          </div>
        )}

        {/* Rejection Reason */}
        {vendor.rejectionReason && (
          <div className="border-t pt-4 bg-red-50 p-4 rounded-lg">
            <label className="text-sm text-gray-600">Rejection Reason</label>
            <p className="text-red-800">{vendor.rejectionReason}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2 border-t pt-4">
          <Button>Edit Details</Button>
          <Button variant="outline">Contact Vendor</Button>
          {vendor.status === 'pending' && (
            <>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleApproveVendor(vendor.id)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button 
                variant="outline" 
                className="text-red-600 border-red-600"
                onClick={() => handleRejectVendor(vendor.id)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
          {vendor.status === 'review' && (
            <>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleApproveVendor(vendor.id)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button variant="outline">Request More Info</Button>
            </>
          )}
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>Vendor Approvals</h1>
        <Button>Vendor Guidelines</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p>{stat.value}</p>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} this month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs and Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="review">Under Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search vendors by name, contact, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Vendors Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div>
                      <p>{vendor.name}</p>
                      <p className="text-sm text-gray-600">{vendor.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(vendor.category)}>
                      {vendor.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{vendor.contactName}</p>
                      <p className="text-sm text-gray-600">{vendor.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{vendor.experience}</p>
                      <p className="text-sm text-gray-600">{vendor.pastEvents} events</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className={`text-sm ${getVerificationColor(vendor.businessLicense)}`}>
                        License: {vendor.businessLicense}
                      </p>
                      <p className={`text-sm ${getVerificationColor(vendor.insurance)}`}>
                        Insurance: {vendor.insurance}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(vendor.status)}>
                      {vendor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{vendor.submissionDate}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <VendorDetailsModal vendor={vendor} />
                      </Dialog>
                      {vendor.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApproveVendor(vendor.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 border-red-600"
                            onClick={() => handleRejectVendor(vendor.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}