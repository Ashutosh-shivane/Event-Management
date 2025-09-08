import React from 'react';
import { useAuth } from './AuthContext';
import { PageType } from '../App';
import { StudentDashboard } from './dashboards/StudentDashboard';
import { OrganizerDashboard } from './dashboards/OrganizerDashboard';
import { ManagerDashboard } from './dashboards/ManagerDashboard';
import { VendorDashboard } from './dashboards/VendorDashboard';
import { AdminDashboard } from './dashboards/AdminDashboard';

interface DashboardProps {
  onNavigate: (page: PageType) => void;
  onEventSelect: (eventId: string) => void;
}

export function Dashboard({ onNavigate, onEventSelect }: DashboardProps) {
  const { user } = useAuth();

  switch (user?.role) {
    case 'STUDENT':
      return <StudentDashboard onNavigate={onNavigate} onEventSelect={onEventSelect} />;
    case 'ORGANIZER':
      return <OrganizerDashboard onNavigate={onNavigate} onEventSelect={onEventSelect} />;
    case 'MANAGER':
      return <ManagerDashboard onNavigate={onNavigate} onEventSelect={onEventSelect} />;
    case 'VENDOR':
      return <VendorDashboard onNavigate={onNavigate} onEventSelect={onEventSelect} />;
    case 'ADMIN':
      return <AdminDashboard onNavigate={onNavigate} onEventSelect={onEventSelect} />;
    default:
      return <div>Unknown role</div>;
  }
}