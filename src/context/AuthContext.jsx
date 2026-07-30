/**
 * Auth state for the whole app.
 *
 * Holds the logged-in account and account_type in React state, keeps the JWT
 * in localStorage so a page refresh doesn't log you out, and exposes
 * login / register / logout helpers.
 *
 * Any component calls:  const { account, login, logout } = useAuth();
 */

import { createContext, useContext, useEffect, useState } from "react";
import { api, setToken, getToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [accountType, setAccountType] = useState(null);
  // loading is true only during the initial "do we have a valid token?" check,
  // so protected routes can wait instead of flashing the login page.
  const [loading, setLoading] = useState(true);

  // On first load, if a token is sitting in localStorage, ask the backend who
  // it belongs to. If the token is stale/invalid, /me 401s and we clear it.
  useEffect(() => {
    async function restore() {
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        const data = await api.me();
        setAccount(data.account);
        setAccountType(data.account_type);
      } catch {
        setToken(null); // bad or expired token
      } finally {
        setLoading(false);
      }
    }
    restore();
  }, []);

  function persist(data) {
    setToken(data.access_token);
    setAccount(data.account);
    setAccountType(data.account.account_type);
    return data;
  }

  async function login({ email, password, accountType }) {
    const data = await api.login({
      email,
      password,
      account_type: accountType,
    });
    return persist(data);
  }

  async function register({ accountType, ...fields }) {
    const data =
      accountType === "business"
        ? await api.registerBusiness(fields)
        : await api.registerUser(fields);
    return persist(data);
  }

  function logout() {
    setToken(null);
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
