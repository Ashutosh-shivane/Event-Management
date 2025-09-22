import React from 'react';
import { useAuth } from './AuthContext';
import { StudentDashboard } from './student/StudentDashboard';
import { OrganizerDashboard } from './organizer/OrganizerDashboard';
import { ManagerDashboard } from './manager/ManagerDashboard';
import { VendorDashboard } from './dashboards/VendorDashboard';
import { AdminDashboard } from './dashboards/AdminDashboard';

export function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  switch (user?.role) {
    case 'STUDENT':
      return <StudentDashboard />;
    case 'ORGANIZER':
      return <OrganizerDashboard />;
    case 'MANAGER':
      return <ManagerDashboard />;
    case 'VENDOR':
      return <VendorDashboard />;
    case 'ADMIN':
      return <AdminDashboard />;
    default:
      return <div>Unknown role</div>;
  }
}