import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  DollarSign, 
  Package, 
  Clock, 
  Star,
  TrendingUp,
  Eye,
  MessageCircle,
  CheckCircle
} from 'lucide-react';

interface VendorDashboardProps {
  onNavigate: (page: string) => void;
  onEventSelect: (eventId: string) => void;
}

export function VendorDashboard({ onNavigate, onEventSelect }: VendorDashboardProps) {
  const activeContracts = [
    {
      id: 1,
      event: 'Tech Conference 2024',
      service: 'Catering Services',
      amount: 2500,
      status: 'confirmed',
      date: '2024-03-15',
      organizer: 'John Doe',
      rating: 4.8
    },
    {
      id: 2,
      event: 'Music Festival',
      service: 'Sound Equipment',
      amount: 1800,
      status: 'pending',
      date: '2024-03-20',
      organizer: 'Jane Smith',
      rating: null
    },
    {
      id: 3,
      event: 'Career Fair',
      service: 'Photography',
      amount: 800,
      status: 'in-progress',
      date: '2024-03-25',
      organizer: 'Mike Johnson',
      rating: 4.9
    }
  ];

  const availableBids = [
    {
      id: 1,
      event: 'Spring Workshop',
      service: 'Audio/Visual Setup',
      budget: 1500,
      deadline: '2024-03-10',
      organizer: 'Sarah Wilson',
      requirements: 'Professional AV equipment for 100+ attendees'
    },
    {
      id: 2,
      event: 'Company Retreat',
      service: 'Catering',
      budget: 3000,
      deadline: '2024-03-12',
      organizer: 'David Brown',
      requirements: 'Full day catering for 150 people'
    },
    {
      id: 3,
      event: 'Art Exhibition',
      service: 'Security Services',
      budget: 1200,
      deadline: '2024-03-14',
      organizer: 'Emma Davis',
      requirements: '2-day security coverage'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
        <Button>Browse Opportunities</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-semibold">$18,400</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Contracts</p>
                <p className="text-2xl font-semibold">8</p>
                <p className="text-xs text-blue-600">3 pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Bids</p>
                <p className="text-2xl font-semibold">5</p>
                <p className="text-xs text-yellow-600">2 expiring soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-semibold">4.9</p>
                <p className="text-xs text-purple-600">Excellent service</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Contracts */}
        <Card>
          <CardHeader>
            <CardTitle>Active Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeContracts.map((contract) => (
                <div key={contract.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{contract.event}</h3>
                      <p className="text-sm text-gray-600">{contract.service}</p>
                      <p className="text-xs text-gray-500">Organizer: {contract.organizer}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(contract.status)}>
                        {contract.status}
                      </Badge>
                      <p className="text-lg font-semibold text-green-600 mt-1">
                        ${contract.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Date: {contract.date}</span>
                    {contract.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">{contract.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye size={14} className="mr-1" />
                      Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle size={14} className="mr-1" />
                      Chat
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Bids */}
        <Card>
          <CardHeader>
            <CardTitle>Available Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableBids.map((bid) => (
                <div key={bid.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{bid.event}</h3>
                    <span className="text-lg font-semibold text-blue-600">
                      ${bid.budget.toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{bid.service}</p>
                  <p className="text-xs text-gray-500 mb-3">{bid.requirements}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Deadline: {bid.deadline}</span>
                    <span className="text-sm text-gray-600">by {bid.organizer}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm">Submit Bid</Button>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Success Rate</h3>
              <p className="text-2xl font-bold text-green-600">95%</p>
              <p className="text-sm text-gray-600">Bid success</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Growth</h3>
              <p className="text-2xl font-bold text-blue-600">+24%</p>
              <p className="text-sm text-gray-600">This quarter</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Reviews</h3>
              <p className="text-2xl font-bold text-purple-600">47</p>
              <p className="text-sm text-gray-600">Total ratings</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Package className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Completed</h3>
              <p className="text-2xl font-bold text-yellow-600">32</p>
              <p className="text-sm text-gray-600">Total projects</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Payment received for Tech Conference 2024</p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-600">New bid opportunity: Spring Workshop</p>
              <span className="text-xs text-gray-400">5 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Submitted bid for Company Retreat catering</p>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-sm text-gray-600">Received 5-star rating from Art Exhibition</p>
              <span className="text-xs text-gray-400">2 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}