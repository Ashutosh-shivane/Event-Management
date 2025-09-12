import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Search,
  Filter,
  DollarSign,
  Calendar,
  MapPin,
  Users,
  Clock,
  Eye,
  Send,
  Star,
  TrendingUp,
  Package
} from 'lucide-react';

interface Bid {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  location: string;
  serviceType: string;
  expectedGuests: number;
  budget: string;
  description: string;
  requirements: string[];
  deadline: string;
  status: 'open' | 'bidding' | 'closed' | 'awarded';
  organizerName: string;
  organizerRating: number;
  bidCount: number;
  myBid?: {
    amount: number;
    proposal: string;
    submittedAt: string;
    status: 'pending' | 'accepted' | 'rejected';
  };
}

export function VendorBidsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('all');
  const [selectedBid, setSelectedBid] = React.useState<Bid | null>(null);
  const [showBidForm, setShowBidForm] = React.useState(false);
  const [bidAmount, setBidAmount] = React.useState('');
  const [bidProposal, setBidProposal] = React.useState('');

  // Mock bid opportunities data
  const [bids] = React.useState<Bid[]>([
    {
      id: 'bid-1',
      eventId: 'event-1',
      eventTitle: 'Tech Conference 2024',
      eventDate: '2024-04-15',
      location: 'San Francisco, CA',
      serviceType: 'Catering',
      expectedGuests: 250,
      budget: '$3,000 - $5,000',
      description: 'Premium catering services needed for a tech conference with breakfast, lunch, and coffee breaks.',
      requirements: ['Licensed Food Handler', 'Vegetarian Options', 'Gluten-Free Options'],
      deadline: '2024-03-20',
      status: 'open',
      organizerName: 'TechEvents Inc.',
      organizerRating: 4.8,
      bidCount: 5
    },
    {
      id: 'bid-2',
      eventId: 'event-2',
      eventTitle: 'Wedding Reception',
      eventDate: '2024-05-20',
      location: 'Napa Valley, CA',
      serviceType: 'Photography',
      expectedGuests: 120,
      budget: '$2,000 - $3,500',
      description: 'Wedding photography for outdoor ceremony and indoor reception. 8-hour coverage needed.',
      requirements: ['Portfolio Required', 'Backup Equipment', 'Raw Image Delivery'],
      deadline: '2024-03-25',
      status: 'bidding',
      organizerName: 'Sarah & Mike',
      organizerRating: 5.0,
      bidCount: 8,
      myBid: {
        amount: 2800,
        proposal: 'Professional wedding photography with 2 photographers and same-day preview...',
        submittedAt: '2024-03-18',
        status: 'pending'
      }
    },
    {
      id: 'bid-3',
      eventId: 'event-3',
      eventTitle: 'Corporate Gala',
      eventDate: '2024-06-10',
      location: 'Los Angeles, CA',
      serviceType: 'Event Planning',
      expectedGuests: 500,
      budget: '$15,000 - $25,000',
      description: 'Full event planning and coordination for annual corporate gala including venue, catering, entertainment.',
      requirements: ['Event Planning License', '5+ Years Experience', 'Insurance Required'],
      deadline: '2024-03-30',
      status: 'closed',
      organizerName: 'Corporate Solutions LLC',
      organizerRating: 4.6,
      bidCount: 12,
      myBid: {
        amount: 22000,
        proposal: 'Comprehensive event planning package with premium vendors...',
        submittedAt: '2024-03-15',
        status: 'rejected'
      }
    }
  ]);

  const filteredBids = bids.filter(bid => {
    const matchesSearch = bid.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || bid.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'bidding': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'awarded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBidStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitBid = () => {
    if (!selectedBid || !bidAmount || !bidProposal) return;
    
    // Simulate bid submission
    console.log('Submitting bid:', {
      bidId: selectedBid.id,
      amount: bidAmount,
      proposal: bidProposal
    });
    
    setShowBidForm(false);
    setBidAmount('');
    setBidProposal('');
    setSelectedBid(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Bid Opportunities</h1>
          <p className="text-muted-foreground mt-2">
            Browse and bid on available event opportunities
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline">
            {filteredBids.length} opportunities
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by event, service type, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="bidding">Bidding</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="awarded">Awarded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bid Opportunities */}
      <div className="grid gap-6">
        {filteredBids.map(bid => (
          <Card key={bid.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-semibold">{bid.eventTitle}</h3>
                      <Badge className={getStatusColor(bid.status)}>
                        {bid.status}
                      </Badge>
                      {bid.myBid && (
                        <Badge className={getBidStatusColor(bid.myBid.status)}>
                          My Bid: {bid.myBid.status}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-1" />
                        {bid.serviceType}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(bid.eventDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {bid.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {bid.expectedGuests} guests
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{bid.budget}</div>
                    <div className="text-sm text-muted-foreground">
                      {bid.bidCount} bids • Deadline: {new Date(bid.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600">{bid.description}</p>

                {/* Requirements */}
                <div>
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {bid.requirements.map(req => (
                      <Badge key={req} variant="outline">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Organizer Info */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{bid.organizerName}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{bid.organizerRating}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/events/${bid.eventId}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    
                    {bid.status === 'open' && !bid.myBid && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedBid(bid);
                          setShowBidForm(true);
                        }}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Submit Bid
                      </Button>
                    )}
                    
                    {bid.myBid && (
                      <Button variant="outline" size="sm">
                        View My Bid
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bid Submission Form */}
      {showBidForm && selectedBid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Submit Bid - {selectedBid.eventTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bidAmount">Bid Amount ($)</Label>
                <Input
                  id="bidAmount"
                  type="number"
                  placeholder="Enter your bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Event Budget: {selectedBid.budget}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bidProposal">Proposal</Label>
                <Textarea
                  id="bidProposal"
                  placeholder="Describe your services, experience, and why you're the best choice for this event..."
                  value={bidProposal}
                  onChange={(e) => setBidProposal(e.target.value)}
                  rows={6}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowBidForm(false);
                    setSelectedBid(null);
                    setBidAmount('');
                    setBidProposal('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitBid}
                  disabled={!bidAmount || !bidProposal}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Bid
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {filteredBids.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find available bid opportunities.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}