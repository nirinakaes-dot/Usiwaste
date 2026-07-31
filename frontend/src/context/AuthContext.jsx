import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../services/auth";

// Holds the logged-in account for the whole app. Any component reads it with
// useAuth(). The token lives in localStorage so a refresh doesn't log you out.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [loading, setLoading] = useState(true);

  // On load, if a token is stored, ask the backend who it belongs to.
  // If it's expired/invalid the call fails and we clear it.
  useEffect(() => {
    async function restore() {
      if (!authApi.getToken()) {
        setLoading(false);
        return;
      }
      try {
        const data = await authApi.getMe();
        setAccount(data.account);
        setAccountType(data.account_type);
      } catch {
        authApi.saveToken(null);
      } finally {
        setLoading(false);
      }
    }
    restore();
  }, []);

  function persist(data) {
    authApi.saveToken(data.access_token);
    setAccount(data.account);
    setAccountType(data.account.account_type);
    return data;
  }

  async function login({ email, password, accountType }) {
    return persist(
      await authApi.login({ email, password, account_type: accountType })
    );
  }

  async function register({ accountType, ...fields }) {
    const data =
      accountType === "business"
        ? await authApi.registerBusiness(fields)
        : await authApi.registerUser(fields);
    return persist(data);
  }

  function logout() {
    authApi.saveToken(null);
    setAccount(null);
    setAccountType(null);
  }

  const value = {
    account,
    accountType,
    loading,
    isAuthenticated: !!account,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
