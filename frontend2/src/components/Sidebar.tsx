import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
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
  collapsed: boolean;
  onToggle: () => void;
}

interface NavigationItem {
  key: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: number;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getNavigationItems = (): NavigationItem[] => {
    const baseItems: NavigationItem[] = [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { key: 'events', label: 'Events', icon: Calendar, path: '/events' },
      { key: 'wallet', label: 'Wallet', icon: Wallet, path: '/wallet' },
      { key: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications', badge: 3 },
    ];

    // Add role-specific items
    if (user?.role === 'admin') {
      baseItems.push(
        { key: 'reports', label: 'Reports', icon: BarChart3, path: '/reports' },
        { key: 'users', label: 'User Management', icon: Users, path: '/users' }
      );
    }

    if (user?.role === 'manager') {
      baseItems.push(
        { key: 'add-event', label: 'Add Event', icon: Calendar, path: '/manager/add-event' },
        { key: 'approvals', label: 'Student Approvals', icon: Users, path: '/manager/approvals' }
      );
    }

    if (user?.role === 'organizer') {
      baseItems.push(
        { key: 'create-event', label: 'Create Event', icon: Calendar, path: '/organizer/create-event' },
        { key: 'manage-events', label: 'Manage Events', icon: BarChart3, path: '/organizer/manage-events' }
      );
    }

    if (user?.role === 'vendor') {
      baseItems.push(
        { key: 'bids', label: 'Bid Opportunities', icon: BarChart3, path: '/vendor/bids' },
        { key: 'portfolio', label: 'Portfolio', icon: User, path: '/vendor/portfolio' }
      );
    }

    baseItems.push(
      { key: 'chat', label: 'Chat', icon: MessageCircle, path: '/chat' },
      { key: 'profile', label: 'Profile', icon: User, path: '/profile' }
    );

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-gray-900">EventHub</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-gray-500 hover:text-gray-700"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.key}
            variant={isActive(item.path) ? "default" : "ghost"}
            className={`w-full justify-start ${collapsed ? 'px-2' : 'px-3'}`}
            onClick={() => handleNavigation(item.path)}
          >
            <item.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && (
              <>
                <span>{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant="destructive" 
                    className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </Button>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-200">
        {!collapsed && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-xs text-gray-500 capitalize">{user.role}</div>
          </div>
        )}
        <Button
          variant="ghost"
          className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 ${
            collapsed ? 'px-2' : 'px-3'
          }`}
          onClick={handleLogout}
        >
          <LogOut className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}