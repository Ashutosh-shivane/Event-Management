import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  MapPin, 
  Calendar, 
  Users,
  BookOpen,
  AlertTriangle
} from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const quickLinks = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/dashboard',
      description: 'Go to your main dashboard',
      requireAuth: true
    },
    {
      icon: Calendar,
      label: 'Events',
      path: '/events',
      description: 'Browse available events',
      requireAuth: true
    },
    {
      icon: Users,
      label: 'About',
      path: '/about',
      description: 'Learn more about our platform',
      requireAuth: false
    },
    {
      icon: BookOpen,
      label: 'Project Status',
      path: '/project-status',
      description: 'View development progress',
      requireAuth: true
    }
  ];

  const availableLinks = quickLinks.filter(link => 
    !link.requireAuth || isAuthenticated
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <AlertTriangle className="h-16 w-16 text-orange-500" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The link might be broken, 
            or the page may have been moved or deleted.
          </p>
        </div>

        {/* Navigation Options */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-lg">Where would you like to go?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableLinks.map((link) => (
                <Button
                  key={link.path}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  onClick={() => navigate(link.path)}
                >
                  <link.icon className="h-6 w-6 text-blue-600" />
                  <div className="text-center">
                    <div className="font-medium">{link.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{link.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </Button>
          
          {isAuthenticated ? (
            <Button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <Home className="h-4 w-4" />
              <span>Go to Dashboard</span>
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <Home className="h-4 w-4" />
              <span>Go to Home</span>
            </Button>
          )}
        </div>

        {/* Search Suggestion */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Search className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Looking for something specific?</h3>
                <p className="text-sm text-gray-600">
                  {isAuthenticated 
                    ? `Hi ${user?.name || 'there'}! You can search for events and content from your dashboard.`
                    : 'Sign up to access our event management platform and discover upcoming events.'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Need help? Contact our support team or check our{' '}
            <button 
              onClick={() => navigate('/about')}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              about page
            </button>
            {' '}for more information.
          </p>
        </div>
      </div>
    </div>
  );
}