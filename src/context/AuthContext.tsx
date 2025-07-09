import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "@/services/firebase";
import axiosClient from "@/api/axiosClient";
import { logout as logoutApi } from "@/api/authApi";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Refresh ID token and send to backend
          const idToken = await getIdToken(user, true);
          await axiosClient.post(
            "/api/auth/login",
            { idToken },
            { withCredentials: true }
          );
          setCurrentUser(user);
        } catch (err) {
          console.error("Failed to sync login with backend:", err);
        }
      } else {
        try {
          await axiosClient.post("/api/auth/logout");
          console.log("Logged out and backend session cleared");
        } catch (err) {
          console.error("Backend logout error:", err);
        }
        setCurrentUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await logoutApi(); // logout() từ authApi
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
