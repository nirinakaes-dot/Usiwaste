// Base API endpoint: pulls from environment variables in Vite, falling back to local server if undefined
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

// Keys used to store authentication data in browser LocalStorage
const TOKEN_KEY = "usiwaste_token";
const ROLE_KEY = "usiwaste_role";

// Retrieves the stored JWT authentication token from LocalStorage.
// The token string if found, otherwise null.
export const getToken = () => localStorage.getItem(TOKEN_KEY);

/**
 * Retrieves the current user's role (e.g., 'admin', 'user') from LocalStorage.
 * @returns {string|null} The user role if found, otherwise null.
 */
export const getRole = () => localStorage.getItem(ROLE_KEY);

/**
 * Persists the user's authentication token and role upon successful login.
 * @param {string} token - The auth token received from the backend.
 * @param {string} role - The user's assigned permission role.
 */
export const saveSession = (token, role) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
};

/**
 * Removes auth credentials from LocalStorage to log the user out.
 */
export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
};