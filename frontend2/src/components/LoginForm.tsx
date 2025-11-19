import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from './AuthContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Calendar } from 'lucide-react';

interface LoginFormProps {
  initialMode?: 'login' | 'signup';
}

export function LoginForm({ initialMode = 'login' }: LoginFormProps) {
  const navigate = useNavigate();
  const { login, signup,handleGoogleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<UserRole>('student');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('student');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword, loginRole);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
     console.log("Signup button clicked");
    try {
      await signup(signupName, signupEmail, signupPassword, signupRole);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  

  const roleOptions = [
    { value: 'STUDENT', label: 'Student' },
    { value: 'ORGANIZER', label: 'Event Organizer' },
    { value: 'MANAGER', label: 'Event Manager' },
    { value: 'vendor', label: 'Vendor' },
    { value: 'ADMIN', label: 'Administrator' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">EventHub</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {initialMode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {initialMode === 'signup' ? 'Join the EventHub community' : 'Manage events seamlessly'}
          </p>
        </div>

        <Tabs defaultValue={initialMode} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="login-role">Role</Label>
                <Select value={loginRole} onValueChange={(value) => setLoginRole(value as UserRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-role">Role</Label>
                <Select value={signupRole} onValueChange={(value) => setSignupRole(value as UserRole)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

     <Button 
  type="button"
  variant="outline"
  className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100"
  onClick={handleGoogleLogin}
>
  <svg 
    className="h-5 w-5" 
    viewBox="0 0 48 48"
  >
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.61l6.85-6.85C35.9 2.38 30.47 0 24 0 14.74 0 6.76 5.19 2.71 12.72l7.98 6.19C12.43 13.03 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.5 24.5c0-1.63-.15-3.2-.43-4.72H24v9.02h12.7c-.55 2.97-2.26 5.49-4.84 7.18l7.48 5.82C43.84 37.5 46.5 31.4 46.5 24.5z"/>
    <path fill="#FBBC05" d="M10.69 28.91c-.54-1.6-.84-3.3-.84-5.01s.3-3.41.84-5.01l-7.98-6.19C.94 16 0 19.86 0 24s.94 8 2.71 11.28l7.98-6.37z"/>
    <path fill="#34A853" d="M24 48c6.47 0 11.9-2.13 15.87-5.79l-7.48-5.82c-2.07 1.39-4.71 2.19-8.39 2.19-6.26 0-11.57-3.53-13.31-9.41l-7.98 6.37C6.76 42.81 14.74 48 24 48z"/>
  </svg>
  <span>Continue with Google</span>
</Button>

      </Card>
    </div>
  );
}