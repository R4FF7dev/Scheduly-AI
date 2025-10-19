import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  register: (userData: { email: string; password: string; name: string }) => Promise<any>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (authService.isAuthenticated()) {
      try {
        const userData = await userService.getProfile();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  };

  const login = async (credentials: { email: string; password: string }) => {
    console.log('AuthContext: Attempting login');
    try {
      const response = await authService.login(credentials);
      console.log('AuthContext: Login response received:', response);
      
      // Only set user if login was successful
      if (response.success && response.user) {
        console.log('AuthContext: Setting user state');
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        console.log('AuthContext: Response missing success or user data');
      }
      return response;
    } catch (error) {
      console.log('AuthContext: Login error caught:', error);
      throw error;
    }
  };

  const register = async (userData: { email: string; password: string; name: string }) => {
    const response = await authService.register(userData);
    // Only set user if registration was successful
    if (response.success && response.user) {
      setUser(response.user);
      setIsAuthenticated(true);
    }
    return response;
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      refreshUser: checkAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
