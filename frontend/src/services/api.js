import axios from "axios";

// Single axios instance the whole app shares.
// baseURL points at the Flask backend. Override it in a .env file with
// VITE_API_URL when the backend is deployed.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// Attach the JWT to every request automatically, so individual calls don't
// have to remember to. Reads the token saved at login.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("usiwaste_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
