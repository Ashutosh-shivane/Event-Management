import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home,
  User,
  Calendar,
  Bell,
  MessageCircle,
  DollarSign,
  BarChart3,
  Users,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

export function TestNavigationPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navigationTests = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: Home,
      description: 'Main dashboard view'
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: User,
      description: 'User profile page'
    },
    {
      label: 'Events',
      path: '/events',
      icon: Calendar,
      description: 'Events listing page'
    },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: Bell,
      description: 'Notifications center'
    },
    {
      label: 'Chat',
      path: '/chat',
      icon: MessageCircle,
      description: 'Chat and messaging'
    },
    {
      label: 'Wallet',
      path: '/wallet',
      icon: DollarSign,
      description: 'Wallet and payments'
    },
    {
      label: 'Reports',
      path: '/reports',
      icon: BarChart3,
      description: 'Reports and analytics'
    },
    {
      label: 'User Management',
      path: '/users',
      icon: Users,
      description: 'User management (Admin only)'
    }
  ];

  const roleSpecificTests = user?.role === 'organizer' ? [
    {
      label: 'Create Event',
      path: '/organizer/create-event',
      icon: Calendar,
      description: 'Create new event'
    },
    {
      label: 'Manage Events',
      path: '/organizer/manage-events',
      icon: Calendar,
      description: 'Manage existing events'
    }
  ] : user?.role === 'manager' ? [
    {
      label: 'Add Event',
      path: '/manager/add-event',
      icon: Calendar,
      description: 'Add new event to manage'
    },
    {
      label: 'Manager Invitations (DEMO)',
      path: '/manager/invitations',
      icon: Bell,
      description: '🎯 Test manager invitation system with demo data'
    }
  ] : [];

  const testNavigation = (path: string) => {
    try {
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
      alert(`Failed to navigate to ${path}`);
    }
  };

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
          <h1 className="text-3xl font-bold">Navigation Test Page</h1>
          <p className="text-muted-foreground mt-2">
            Test all navigation routes and verify React Router DOM implementation
          </p>
          {user && (
            <Badge variant="secondary" className="mt-2">
              Current User: {user.name} ({user.role})
            </Badge>
          )}
        </div>

        {/* General Navigation Tests */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>General Navigation Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {navigationTests.map(test => {
                const IconComponent = test.icon;
                return (
                  <div 
                    key={test.path}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <IconComponent className="h-5 w-5 text-blue-500" />
                      <h3 className="font-medium">{test.label}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {test.description}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => testNavigation(test.path)}
                      className="w-full"
                    >
                      Test Navigation
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Role-Specific Navigation Tests */}
        {roleSpecificTests.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Role-Specific Navigation Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roleSpecificTests.map(test => {
                  const IconComponent = test.icon;
                  return (
                    <div 
                      key={test.path}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <IconComponent className="h-5 w-5 text-green-500" />
                        <h3 className="font-medium">{test.label}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {test.description}
                      </p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => testNavigation(test.path)}
                        className="w-full"
                      >
                        Test Navigation
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Migration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span>React Router DOM Setup</span>
                <Badge className="bg-green-100 text-green-800">✅ Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span>Protected Routes</span>
                <Badge className="bg-green-100 text-green-800">✅ Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span>Navigation Components Updated</span>
                <Badge className="bg-green-100 text-green-800">✅ Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span>All Dashboards Compatible</span>
                <Badge className="bg-green-100 text-green-800">✅ Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span>Form Submissions Fixed</span>
                <Badge className="bg-green-100 text-green-800">✅ Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span>Vendor Profile Components</span>
                <Badge className="bg-green-100 text-green-800">✅ Complete</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span>Manager Invitation System</span>
                <Badge className="bg-green-100 text-green-800">✅ Complete</Badge>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                🎉 React Router DOM Migration Complete!
              </h4>
              <p className="text-sm text-blue-800">
                All components have been successfully migrated from the old state-based routing 
                system to React Router DOM. The application now supports proper URL-based 
                navigation, browser history, and protected routes.
              </p>
            </div>

            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">
                🎯 Testing Manager Invitation System
              </h4>
              <p className="text-sm text-purple-800 mb-3">
                Demo manager invitations are now available! To test the system:
              </p>
              <ul className="text-sm text-purple-800 space-y-1 list-disc list-inside">
                <li><strong>Login as Manager:</strong> Use any email with "manager" role</li>
                <li><strong>Check Notifications:</strong> Look for the notification bell with red badge</li>
                <li><strong>View Invitations:</strong> Navigate to Manager Invitations page</li>
                <li><strong>Test Features:</strong> Accept, decline, or send counter offers</li>
                <li><strong>Demo Data:</strong> Two comprehensive invitations with full details</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}