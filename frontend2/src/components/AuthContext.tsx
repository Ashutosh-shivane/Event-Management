import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from "axios";

export type UserRole = 'STUDENT' | 'ORGANIZER' | 'MANAGER' | 'VENDOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  profileCompleted:string;
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

  const API_BASE = "http://localhost:8080/auth";

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock login - in real app, this would call an API
    try {
      const { data } = await axios.post(`${API_BASE}/login`, {
        username: email, // map email → username
        password: password,
        role: role
      });

      console.log(email,password);
      console.log(data);

       const loggedInUser: User = {
      id: data.userid,
      name: data.name,
      email:data.username,
      role:data.role,
      profileCompleted:data.profileCompleted,
    };

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("id", data.userid);
      setUser(loggedInUser);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    }



  };


  // Mock signup - in real app, this would call an API
  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      // First: signup
      console.log(email,password,name,role);
      await axios.post(`${API_BASE}/signup`, {
        username: email, // map email → username
        password: password,
        name: name,
        usertype: role
      });

        alert("Signup successful! Please login below.");

     
      
    } catch (err) {
      console.error("Signup/Login failed", err);
      throw err;
    }
  };




  const logout = () => {

    localStorage.removeItem("token");

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