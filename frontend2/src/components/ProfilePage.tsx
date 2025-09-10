import React from 'react';
import { useAuth } from './AuthContext';
import { StudentProfilePage } from './student/StudentProfilePage';
import { ManagerProfilePage } from './manager/ManagerProfilePage';
import { OrganizerProfilePage } from './organizer/OrganizerProfilePage';

// Generic profile page for other roles (Admin, Vendor)
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, Settings, Edit } from 'lucide-react';

function DefaultProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'User Profile'}</h1>
                  <p className="text-gray-600">{user?.email}</p>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {user?.role || 'User'}
                  </Badge>
                </div>
              </div>
              
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Basic Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{user?.name || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{user?.email || 'Not provided'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <p className="text-gray-900 capitalize">{user?.role || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Complete Your Profile</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Role-specific profile features are available for Students, Managers, and Organizers. 
                  Contact support if you need to update your role or add more profile details.
                </p>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ProfilePage() {
  const { user } = useAuth();

  // Route to appropriate profile page based on user role
  switch (user?.role) {
    case 'STUDENT':
      return <StudentProfilePage />;
    case 'MANAGER':
      return <ManagerProfilePage />;
    case 'ORGANIZER':
      return <OrganizerProfilePage />;
    case 'ADMIN':
    case 'VENDOR':
    default:
      return <DefaultProfilePage />;
  }
}