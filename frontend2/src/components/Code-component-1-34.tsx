import React from 'react';
import { useAuth } from './AuthContext';
import { StudentDashboard } from './dashboards/StudentDashboard';
import { OrganizerDashboard } from './dashboards/OrganizerDashboard';
import { ManagerDashboard } from './dashboards/ManagerDashboard';
import { VendorDashboard } from './dashboards/VendorDashboard';
import { AdminDashboard } from './dashboards/AdminDashboard';

export function Dashboard() {
  const { user } = useAuth();

  switch (user?.role) {
    case 'student':
      return <StudentDashboard />;
    case 'organizer':
      return <OrganizerDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    case 'vendor':
      return <VendorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <div>Unknown role</div>;
  }
}