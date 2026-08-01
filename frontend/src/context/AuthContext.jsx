import { createContext, useContext, useState, useCallback } from "react";
import { authApi } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const raw = sessionStorage.getItem("usiwaste-session");
    return raw ? JSON.parse(raw) : null;
  });

  const persist = (next) => {
    setSession(next);
    if (next) sessionStorage.setItem("usiwaste-session", JSON.stringify(next));
    else sessionStorage.removeItem("usiwaste-session");
  };

  const login = useCallback(async (email, password, role) => {
    const data = await authApi.login({ email, password, role });
    const identity = role === "user" ? data.user : data.business;
    persist({ token: data.token, role, identity });
    return identity;
  }, []);

  const signup = useCallback(async (role, payload) => {
    const data = role === "user" ? await authApi.signupUser(payload) : await authApi.signupBusiness(payload);
    const identity = role === "user" ? data.user : data.business;
    persist({ token: data.token, role, identity });
    return identity;
  }, []);

  const logout = useCallback(() => persist(null), []);

  return (
    <AuthContext.Provider value={{ session, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
