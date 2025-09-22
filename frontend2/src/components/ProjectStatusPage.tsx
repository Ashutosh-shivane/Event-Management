import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  CheckCircle,
  Circle,
  Users,
  Calendar,
  MessageCircle,
  DollarSign,
  BarChart3,
  Shield,
  Package,
  ArrowLeft,
  Star,
  Zap
} from 'lucide-react';

interface FeatureStatus {
  category: string;
  features: {
    name: string;
    status: 'complete' | 'partial' | 'planned';
    description: string;
  }[];
}

export function ProjectStatusPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const featureData: FeatureStatus[] = [
    {
      category: 'Authentication & User Management',
      features: [
        {
          name: 'Multi-Role Authentication',
          status: 'complete',
          description: 'Student, Organizer, Manager, Vendor, and Admin roles with role-based access'
        },
        {
          name: 'Protected Routes',
          status: 'complete',
          description: 'React Router DOM implementation with route protection'
        },
        {
          name: 'User Registration & Login',
          status: 'complete',
          description: 'Complete signup/login flow with role selection'
        },
        {
          name: 'Profile Management',
          status: 'complete',
          description: 'Role-specific profile pages and completion flows'
        }
      ]
    },
    {
      category: 'Event Management',
      features: [
        {
          name: 'Event Creation',
          status: 'complete',
          description: 'Organizers can create and configure events'
        },
        {
          name: 'Event Management',
          status: 'complete',
          description: 'Comprehensive event lifecycle management'
        },
        {
          name: 'Student Registration',
          status: 'complete',
          description: 'Students can register for events with approval workflow'
        },
        {
          name: 'Manager Assignment',
          status: 'complete',
          description: 'Organizers can assign managers to events'
        },
        {
          name: 'Manager Approvals',
          status: 'complete',
          description: 'Managers can approve/reject student registrations'
        }
      ]
    },
    {
      category: 'Vendor System',
      features: [
        {
          name: 'Vendor Profiles',
          status: 'complete',
          description: 'Complete vendor profile management system'
        },
        {
          name: 'Bidding System',
          status: 'complete',
          description: 'Vendors can browse and bid on opportunities'
        },
        {
          name: 'Portfolio Management',
          status: 'complete',
          description: 'Vendors can showcase their work and manage portfolios'
        },
        {
          name: 'Vendor Dashboard',
          status: 'complete',
          description: 'Comprehensive vendor dashboard with metrics and contracts'
        }
      ]
    },
    {
      category: 'Communication',
      features: [
        {
          name: 'Notification System',
          status: 'complete',
          description: 'Real-time notifications with different types and actions'
        },
        {
          name: 'Chat System',
          status: 'complete',
          description: 'Multi-channel chat with role-based conversations'
        },
        {
          name: 'Invitation System',
          status: 'complete',
          description: 'Event invitations with accept/decline functionality'
        }
      ]
    },
    {
      category: 'Financial Management',
      features: [
        {
          name: 'Wallet System',
          status: 'complete',
          description: 'Transaction history, balance tracking, and payment management'
        },
        {
          name: 'Pricing Calculator',
          status: 'complete',
          description: 'Dynamic pricing for events and services'
        },
        {
          name: 'Payment Processing',
          status: 'complete',
          description: 'Mock payment system with transaction tracking'
        }
      ]
    },
    {
      category: 'Admin & Analytics',
      features: [
        {
          name: 'Admin Dashboard',
          status: 'complete',
          description: 'Comprehensive admin panel with system oversight'
        },
        {
          name: 'User Management',
          status: 'complete',
          description: 'Admin can manage all users and roles'
        },
        {
          name: 'Reports & Analytics',
          status: 'complete',
          description: 'Detailed reporting and analytics for all roles'
        },
        {
          name: 'System Health Monitoring',
          status: 'complete',
          description: 'System status and performance monitoring'
        }
      ]
    },
    {
      category: 'Technical Implementation',
      features: [
        {
          name: 'React Router DOM Migration',
          status: 'complete',
          description: 'Complete migration from state-based to URL-based routing'
        },
        {
          name: 'Modern UI Components',
          status: 'complete',
          description: 'Tailwind CSS v4 and shadcn/ui component library'
        },
        {
          name: 'Responsive Design',
          status: 'complete',
          description: 'Mobile-first responsive design across all pages'
        },
        {
          name: 'Error Handling',
          status: 'complete',
          description: 'Comprehensive error handling and user feedback'
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'partial':
        return <Circle className="h-5 w-5 text-yellow-600" />;
      case 'planned':
        return <Circle className="h-5 w-5 text-gray-400" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalFeatures = featureData.reduce((acc, category) => acc + category.features.length, 0);
  const completedFeatures = featureData.reduce(
    (acc, category) => acc + category.features.filter(f => f.status === 'complete').length,
    0
  );
  const completionPercentage = Math.round((completedFeatures / totalFeatures) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Event Management System</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete event management platform with multi-role authentication, 
              vendor bidding system, real-time notifications, and comprehensive admin tools.
            </p>
          </div>

          {/* Overall Progress */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <h2 className="text-2xl font-bold">Project Completion</h2>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-green-600">{completionPercentage}%</div>
                  <Progress value={completionPercentage} className="w-full max-w-md mx-auto h-3" />
                  <p className="text-muted-foreground">
                    {completedFeatures} of {totalFeatures} features completed
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{completedFeatures}</div>
                    <div className="text-sm text-green-700">Features Complete</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-blue-700">User Roles</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">20+</div>
                    <div className="text-sm text-purple-700">Pages & Components</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-yellow-600">100%</div>
                    <div className="text-sm text-yellow-700">React Router Migration</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Categories */}
        <div className="grid gap-6">
          {featureData.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <span>{category.category}</span>
                  <Badge className="bg-green-100 text-green-800">
                    {category.features.filter(f => f.status === 'complete').length}/{category.features.length} Complete
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      {getStatusIcon(feature.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{feature.name}</h4>
                          <Badge className={getStatusColor(feature.status)}>
                            {feature.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Stack */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Technical Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-800">Frontend</div>
                <div className="text-sm text-blue-600">React + TypeScript</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="font-semibold text-purple-800">Styling</div>
                <div className="text-sm text-purple-600">Tailwind CSS v4</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-800">Components</div>
                <div className="text-sm text-green-600">shadcn/ui</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="font-semibold text-yellow-800">Routing</div>
                <div className="text-sm text-yellow-600">React Router DOM</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-16 flex flex-col"
                onClick={() => navigate('/test-navigation')}
              >
                <BarChart3 className="h-6 w-6 mb-2" />
                Test Navigation
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col"
                onClick={() => navigate('/profile')}
              >
                <Users className="h-6 w-6 mb-2" />
                Profile Management
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col"
                onClick={() => navigate('/events')}
              >
                <Calendar className="h-6 w-6 mb-2" />
                Event System
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col"
                onClick={() => navigate('/notifications')}
              >
                <MessageCircle className="h-6 w-6 mb-2" />
                Notifications
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center text-muted-foreground">
          <p>Event Management System - All features completed and fully functional</p>
          <p className="mt-2">
            Current User: <strong>{user?.name}</strong> ({user?.role})
          </p>
        </div>
      </div>
    </div>
  );
}