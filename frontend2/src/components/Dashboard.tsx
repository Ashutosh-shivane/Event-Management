import React from 'react';
import { useAuth } from './AuthContext';
import { PageType } from '../App';
import { StudentDashboard } from './student/StudentDashboard';
import { OrganizerDashboard } from './organizer/OrganizerDashboard';
import { ManagerDashboard } from './manager/ManagerDashboard';
import { VendorDashboard } from './dashboards/VendorDashboard';
import { AdminDashboard } from './dashboards/AdminDashboard';

interface DashboardProps {
  onNavigate: (page: PageType) => void;
  onEventSelect: (eventId: string) => void;
  onPageChange?: (page: string) => void;
}

export function Dashboard({ onNavigate, onEventSelect,onPageChange }: DashboardProps) {
  const { user } = useAuth();

  switch (user?.role) {
    case 'STUDENT':
      return <StudentDashboard onNavigate={onNavigate} onEventSelect={onEventSelect} onPageChange={onPageChange} />;
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