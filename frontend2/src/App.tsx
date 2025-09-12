import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import { NotificationProvider } from './components/NotificationContext';
import { LoginForm } from './components/LoginForm';
import { MainLayout } from './components/MainLayout';
import { LandingPage } from './components/LandingPage';
import { AboutPage } from './components/AboutPage';
import { EventDetailsPage } from './components/EventDetailsPage';
import { ManagerEventAddPage } from './components/manager/ManagerEventAddPage';
import { StudentRegisterPage } from './components/student/StudentRegisterPage';
import {EventAddPage} from './components/EventAddPage';
import { OrganizerEventCreatePage } from './components/organizer/OrganizerEventCreatePage';
import { OrganizerEventManagePage } from './components/organizer/OrganizerEventManagePage';
import { OrganizerAddManagerPage } from './components/organizer/OrganizerAddManagerPage';
import { ManagerStudentApprovalsPage } from './components/manager/ManagerStudentApprovalsPage';
import { ProfilePage } from './components/ProfilePage';
import { TestNavigationPage } from './components/TestNavigationPage';
import { ProjectStatusPage } from './components/ProjectStatusPage';
import { NotFoundPage } from './components/NotFoundPage';
import { Button } from './components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

// Public Route Component (redirects to dashboard if authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

// Profile Page Wrapper with Layout
function ProfilePageWrapper() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <ProfilePage />
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/about" 
        element={
          <PublicRoute>
            <AboutPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginForm initialMode="login" />
          </PublicRoute>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <LoginForm initialMode="signup" />
          </PublicRoute>
        } 
      />

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <ProfilePageWrapper />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/events/:eventId" 
        element={
          <ProtectedRoute>
            <EventDetailsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/events/:eventId/register" 
        element={
          <ProtectedRoute>
            <StudentRegisterPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/manager/add-event" 
        element={
          <ProtectedRoute>
            <ManagerEventAddPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/manager/events/:eventId/approvals" 
        element={
          <ProtectedRoute>
            <ManagerStudentApprovalsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/organizer/create-event" 
        element={
          <ProtectedRoute>
            <OrganizerEventCreatePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/organizer/manage-events" 
        element={
          <ProtectedRoute>
            <OrganizerEventManagePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/organizer/events/:eventId/edit" 
        element={
          <ProtectedRoute>
            <OrganizerEventCreatePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/organizer/events/:eventId/add-manager" 
        element={
          <ProtectedRoute>
            <OrganizerAddManagerPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/vendor/bids" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/vendor/portfolio" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } 
      />

      {/* Additional pages accessible from MainLayout */}
      <Route 
        path="/events" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/chat" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/wallet" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/manager/approvals" 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/test-navigation" 
        element={
          <ProtectedRoute>
            <TestNavigationPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/project-status" 
        element={
          <ProtectedRoute>
            <ProjectStatusPage />
          </ProtectedRoute>
        } 
      />

       {/* Catch all route - 404 page */}
      <Route path="*" element={<NotFoundPage />} />

      {/* Catch all route - redirect to home */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <AppRoutes />
          <Toaster />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}