/**
 * One thin wrapper around fetch that every page uses.
 *
 * Why centralise it? So the JWT header, JSON parsing, and error shape are
 * written once instead of in every component. If the backend's error format
 * ever changes, this is the only file that changes.
 */

// In dev this is empty and the Vite proxy sends /api to localhost:5000.
// In production set VITE_API_URL to the deployed backend's /api base.
const BASE = import.meta.env.VITE_API_URL || "/api";

const TOKEN_KEY = "usiwaste_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

/**
 * Make a request. Returns parsed JSON on success.
 * Throws an Error whose .message is the backend's {"error": ...} string,
 * so a component can just catch(e) and show e.message.
 */
async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkError) {
    // fetch only rejects on network failure, never on 4xx/5xx.
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  // 204 No Content or an empty body
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return data;
}

// --- auth endpoints, matching the Flask backend exactly ---
export const api = {
  registerUser: (payload) =>
    request("/auth/register/user", { method: "POST", body: payload }),

  registerBusiness: (payload) =>
    request("/auth/register/business", { method: "POST", body: payload }),

  login: (payload) => request("/auth/login", { method: "POST", body: payload }),

  me: () => request("/auth/me", { auth: true }),

  forgotPassword: (payload) =>
    request("/auth/forgot-password", { method: "POST", body: payload }),

  resetPassword: (payload) =>
    request("/auth/reset-password", { method: "POST", body: payload }),
};

export default request;
