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

export const LOGOUT_GUARD_KEY = "hs.logout.guard";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    // If user explicitly signed out but cookie remained, skip auto-login
    if (localStorage.getItem(LOGOUT_GUARD_KEY)) {
      setLoading(false);
      return null;
    }
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
    localStorage.removeItem(LOGOUT_GUARD_KEY);
    setUser(loggedIn);
    return loggedIn;
  };

  const signUp: AuthContextValue["signUp"] = async (payload) => {
    const { user: created } = await apiRegister(payload);
    localStorage.removeItem(LOGOUT_GUARD_KEY);
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
      localStorage.setItem(LOGOUT_GUARD_KEY, Date.now().toString());
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
