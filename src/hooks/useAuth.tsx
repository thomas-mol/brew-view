import { User, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState, useCallback } from "react";
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
  const [authState, setAuthState] = useState<AuthContextType>({
    currentUser: null,
    isLoading: true,
    isLoggedIn: false,
  });

  const initializeUser = useCallback(async (user: User | null) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      if (user?.emailVerified) {
        setAuthState({
          currentUser: user,
          isLoggedIn: true,
          isLoading: false,
        });
      } else {
        setAuthState({
          currentUser: null,
          isLoggedIn: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error retrieving user:", error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, [initializeUser]);

  return (
    <AuthContext.Provider value={authState}>
      {!authState.isLoading && children}
    </AuthContext.Provider>
  );
}
