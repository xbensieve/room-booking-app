import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { User, onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "@/services/firebase";
import axiosClient from "@/api/axiosClient";
import { logout as logoutApi } from "@/api/authApi";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  role: string | null;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  logout: async () => {},
  role: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const idToken = await getIdToken(user, true);
          const res = await axiosClient.post(
            "/api/auth/login",
            { idToken },
            { withCredentials: true }
          );
          const backendClaims = res.data.claims;
          setRole(backendClaims?.role || null);
        } catch (err) {
          console.error("Failed to sync login with backend:", err);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          await axiosClient.post("/api/auth/logout");
          console.log("Logged out and backend session cleared");
        } catch (err) {
          console.error("Backend logout error:", err);
        } finally {
          setRole(null);
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutApi();
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, []);

  const contextValue = useMemo(
    () => ({ currentUser, loading, logout, role }),
    [currentUser, loading, logout, role]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
