import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  currentUser,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  type AuthUser,
} from "../api/auth";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (payload: { email: string; password: string }) => Promise<AuthUser>;
  signUp: (payload: {
    email: string;
    password: string;
    displayName: string;
  }) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  refresh: () => Promise<AuthUser | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    try {
      const { user: me } = await currentUser();
      setUser(me);
      return me;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signIn: AuthContextValue["signIn"] = async (payload) => {
    const { user: loggedIn } = await apiLogin(payload);
    setUser(loggedIn);
    return loggedIn;
  };

  const signUp: AuthContextValue["signUp"] = async (payload) => {
    const { user: created } = await apiRegister(payload);
    setUser(created);
    return created;
  };

  const signOut = async () => {
    try {
      await apiLogout();
    } catch (err) {
      // log but still clear local session so user can re-auth
      console.error("logout failed", err);
    } finally {
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({ user, loading, signIn, signUp, signOut, refresh }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
