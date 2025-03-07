import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  loginWithGithub: () => void;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const { toast } = useToast();

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setShowAuthModal(false);
    
    // Clear any existing timeouts
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    
    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur CockpitLab !",
    });
  };

  const loginWithGithub = () => {
    // Simulating GitHub authentication
    console.log('Connexion avec GitHub en cours...');
    
    // In a real app, you would redirect to GitHub OAuth flow here
    // window.location.href = 'https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI';
    
    // For demo purposes, we'll just authenticate the user directly
    setTimeout(() => {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setShowAuthModal(false);
      
      // Clear any existing timeouts
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      
      toast({
        title: "Connexion GitHub réussie",
        description: "Bienvenue sur CockpitLab !",
      });
    }, 1000); // Simulate network delay
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt sur CockpitLab !",
    });

    // Set timeout to show modal after logout
    startAuthTimeout();
  };

  const startAuthTimeout = () => {
    if (!isAuthenticated) {
      console.log('Starting auth timeout - modal will show in 10 seconds');
      
      // Clear any existing timeout first to avoid multiple timers
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      
      const id = window.setTimeout(() => {
        console.log('Timeout complete - showing auth modal');
        setShowAuthModal(true);
      }, 10000); // 10 seconds (10000ms)
      
      setTimeoutId(id);
    }
  };

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      console.log('User not authenticated - preparing to show modal');
      // Start timeout to show modal for non-authenticated users
      startAuthTimeout();
    }

    // Cleanup
    return () => {
      if (timeoutId) {
        console.log('Cleaning up timeout');
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const value = {
    isAuthenticated,
    login,
    loginWithGithub,
    logout,
    showAuthModal,
    setShowAuthModal
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
