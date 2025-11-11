import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { Dashboard } from './Dashboard';
import { EventsPage } from './EventsPage';
import { NotificationsPage } from './NotificationsPage';
import { ChatPage } from './ChatPage';
import { WalletPage } from './WalletPage';
import { ReportsPage } from './ReportsPage';
import { ProfilePage } from './ProfilePage';
import { UserManagementPage } from './UserManagementPage';
import { VendorBidsPage } from './vendor/VendorBidsPage';
import { VendorPortfolioPage } from './vendor/VendorPortfolioPage';
import { ManagerApprovalsPage } from './manager/ManagerApprovalsPage';
import {StudentAssignedEventPage} from './student/StudentAssignedEventPage';

export function MainLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (location.pathname) {
      case '/events':
        return <EventsPage />;
      case '/notifications':
        return <NotificationsPage />;
      case '/chat':
        return <ChatPage />;
      case '/wallet':
        return <WalletPage />;
      case '/reports':
        return <ReportsPage />;
      case '/users':
        return <UserManagementPage />;
      case '/vendor/bids':
        return <VendorBidsPage />;
      case '/vendor/portfolio':
        return <VendorPortfolioPage />;
      case '/manager/approvals':
        return <ManagerApprovalsPage />;
      case '/student/Assigned_Events':
        <StudentAssignedEventPage />;
      
      case '/dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}