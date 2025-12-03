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
  updateProfile: (updates: Partial<User>) => void;
  updateUser: (updates: Partial<User>) => void;
   handleGoogleLogin:any;
   handleGoogleOAuthCallback: () => void;
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
      localStorage.setItem("userrole", data.role);
      localStorage.setItem("useremail", data.role);
      setUser(loggedInUser);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Login failed", err);
      alert("Incorrect username and password");
      throw err;
    }



  };

const handleGoogleOAuthCallback = () => {
  const params = new URLSearchParams(window.location.search);

  const token = params.get("token");
  const username = params.get("username");
  const name = params.get("name");
  const userid = params.get("userid");
  const role = params.get("role") as UserRole;
  const profileCompleted = params.get("profileCompleted");

  if (token) {
    // Save in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("username", username || "");
    localStorage.setItem("id", userid || "");
    localStorage.setItem("userrole", role || "STUDENT");
     localStorage.setItem("useremail", role);
    // localStorage.setItem("profileCompleted", profileCompleted || "false");

    // Update AuthContext state
    const googleUser: User = {
      id: userid || "",
      name: name || "",
      email: username || "",
      role: (role as UserRole) || "STUDENT",
      profileCompleted: profileCompleted || "false",
    };

    setUser(googleUser);
    setIsAuthenticated(true);
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
      alert("Username already Exists");
      throw err;
    }
  };


  const handleGoogleLogin = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};





  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);
    setIsAuthenticated(false);
  };
  
  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };
  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateProfile, updateUser , handleGoogleLogin,handleGoogleOAuthCallback}}>
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