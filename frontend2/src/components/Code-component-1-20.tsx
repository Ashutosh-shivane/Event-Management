import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { Dashboard } from './Dashboard';
import { EventsPage } from './EventsPage';
import { WalletPage } from './WalletPage';
import { ReportsPage } from './ReportsPage';
import { NotificationsPage } from './NotificationsPage';
import { ChatPage } from './ChatPage';
import { ProfilePage } from './ProfilePage';
import { UserManagementPage } from './UserManagementPage';

export type Page = 'dashboard' | 'events' | 'wallet' | 'reports' | 'notifications' | 'chat' | 'profile' | 'users';

export function MainLayout() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'events':
        return <EventsPage />;
      case 'wallet':
        return <WalletPage />;
      case 'reports':
        return <ReportsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'chat':
        return <ChatPage />;
      case 'profile':
        return <ProfilePage />;
      case 'users':
        return <UserManagementPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <TopNavbar 
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 overflow-auto p-6">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}