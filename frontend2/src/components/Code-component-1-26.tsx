import React from 'react';
import { useAuth } from './AuthContext';
import { Page } from './MainLayout';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  Calendar, 
  Wallet, 
  BarChart3, 
  Bell, 
  MessageCircle, 
  User, 
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ currentPage, onPageChange, collapsed, onToggleCollapse }: SidebarProps) {
  const { user, logout } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      { key: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
      { key: 'events' as Page, label: 'Events', icon: Calendar },
      { key: 'wallet' as Page, label: 'Wallet', icon: Wallet },
      { key: 'notifications' as Page, label: 'Notifications', icon: Bell },
      { key: 'chat' as Page, label: 'Chat', icon: MessageCircle },
      { key: 'profile' as Page, label: 'Profile', icon: User },
    ];

    // Add role-specific items
    if (user?.role === 'admin') {
      baseItems.splice(-1, 0, { key: 'users' as Page, label: 'User Management', icon: Users });
      baseItems.splice(-1, 0, { key: 'reports' as Page, label: 'Reports', icon: BarChart3 });
    } else if (user?.role === 'manager' || user?.role === 'organizer') {
      baseItems.splice(-1, 0, { key: 'reports' as Page, label: 'Reports', icon: BarChart3 });
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">EventHub</h1>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="p-2"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.key}>
                  <Button
                    variant={currentPage === item.key ? "secondary" : "ghost"}
                    className={`w-full justify-start ${collapsed ? 'px-2' : 'px-4'}`}
                    onClick={() => onPageChange(item.key)}
                  >
                    <Icon size={20} className={collapsed ? '' : 'mr-3'} />
                    {!collapsed && item.label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-gray-200">
          {!collapsed && (
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            className={`w-full ${collapsed ? 'px-2' : 'justify-start px-4'} text-red-600 hover:text-red-700 hover:bg-red-50`}
            onClick={logout}
          >
            <LogOut size={20} className={collapsed ? '' : 'mr-3'} />
            {!collapsed && 'Sign Out'}
          </Button>
        </div>
      </div>
    </div>
  );
}