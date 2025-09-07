import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { PageType } from '../App';
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

interface MainLayoutProps {
  onNavigate: (page: PageType) => void;
  onEventSelect: (eventId: string) => void;
}

export function MainLayout({ onNavigate, onEventSelect }: MainLayoutProps) {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={onNavigate} onEventSelect={onEventSelect} />;
      case 'events':
        return <EventsPage onNavigate={onNavigate} onEventSelect={onEventSelect} />;
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
        return <Dashboard onNavigate={onNavigate} onEventSelect={onEventSelect} />;
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