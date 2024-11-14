import { User, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user: User | null) {
    if (user) {
      setCurrentUser({ ...user });
      setIsLoggedIn(true);
    } else {
      setCurrentUser(null);
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }

  const value = {
    currentUser,
    isLoggedIn,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
