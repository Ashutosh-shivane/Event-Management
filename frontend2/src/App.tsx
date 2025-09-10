import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LoginForm } from './components/LoginForm';
import { MainLayout } from './components/MainLayout';
import { LandingPage } from './components/LandingPage';
import { AboutPage } from './components/AboutPage';
import { EventDetailsPage } from './components/EventDetailsPage';
import { ManagerEventAddPage } from './components/ManagerEventAddPage';
import {EventAddPage} from './components/EventAddPage';
import { OrganizerEventCreatePage } from './components/organizer/OrganizerEventCreatePage';
import { OrganizerEventManagePage } from './components/organizer/OrganizerEventManagePage';
import { OrganizerAddManagerPage } from './components/organizer/OrganizerAddManagerPage';
import { ManagerStudentApprovalsPage } from './components/manager/ManagerStudentApprovalsPage';

export type PageType = 'landing' | 'about' | 'login' | 'signup' | 'dashboard' | 'event-details' | 'add-event';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  return (
    <AuthProvider>
      <AppContent 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        selectedEventId={selectedEventId}
        setSelectedEventId={setSelectedEventId}
      />
    </AuthProvider>
  );
}

function AppContent({ 
  currentPage, 
  setCurrentPage,
  selectedEventId,
  setSelectedEventId 
}: { 
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
}) {
  const { user, isAuthenticated } = useAuth();

  // If user is authenticated and on landing/about/login pages, go to dashboard
  if (isAuthenticated && ['landing', 'about', 'login', 'signup'].includes(currentPage)) {
    setCurrentPage('dashboard');
  }

  switch (currentPage) {
    case 'landing':
      return <EventDetailsPage onNavigate={setCurrentPage} />;
    case 'about':
      return <AboutPage onNavigate={setCurrentPage} />;
    case 'login':
    case 'signup':
      return <LoginForm initialMode={currentPage} onNavigate={setCurrentPage} />;
    case 'dashboard':
      return isAuthenticated ? (
        <MainLayout 
          onNavigate={setCurrentPage} 
          onEventSelect={setSelectedEventId}
        />
      ) : (
        <LandingPage onNavigate={setCurrentPage} />
      );
    case 'event-details':
      return isAuthenticated ? (
        <EventDetailsPage 
          eventId={selectedEventId} 
          onNavigate={setCurrentPage}
        />
      ) : (
        <LandingPage onNavigate={setCurrentPage} />
      );
    case 'add-event':
      return isAuthenticated ? (
        <EventAddPage onNavigate={setCurrentPage} />
      ) : (
        <LandingPage onNavigate={setCurrentPage} />
      );


      case 'organizer-create-event':
      return isAuthenticated ? (
        <OrganizerEventCreatePage onNavigate={setCurrentPage} />
      ) : (
        <LandingPage onNavigate={setCurrentPage} />
      );
    case 'organizer-manage-events':
      return isAuthenticated ? (
        <OrganizerEventManagePage 
          onNavigate={setCurrentPage} 
          onEventSelect={setSelectedEventId}
        />
      ) : (
        <LandingPage onNavigate={setCurrentPage} />
      );
    case 'organizer-add-manager':
      return isAuthenticated ? (
        <OrganizerAddManagerPage 
          onNavigate={setCurrentPage}
          eventId={selectedEventId}
        />
      ) : (
        <LandingPage onNavigate={setCurrentPage} />
      );


      case 'manager-student-approvals':
      return isAuthenticated ? (
        <ManagerStudentApprovalsPage 
          onNavigate={setCurrentPage}
          eventId={selectedEventId}
        />
      ) : (
        <LandingPage onNavigate={setCurrentPage} />
      );


    default:
      return <LandingPage onNavigate={setCurrentPage} />;
  }
}