
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
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
      const id = window.setTimeout(() => {
        setShowAuthModal(true);
      }, 10000); // 10 seconds
      setTimeoutId(id);
    }
  };

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      // Start timeout to show modal for non-authenticated users
      startAuthTimeout();
    }

    // Cleanup
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const value = {
    isAuthenticated,
    login,
    logout,
    showAuthModal,
    setShowAuthModal
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
