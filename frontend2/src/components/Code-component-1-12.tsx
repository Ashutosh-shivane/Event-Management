import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'organizer' | 'manager' | 'vendor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      role,
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    // Mock signup - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      name,
      email,
      role,
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}