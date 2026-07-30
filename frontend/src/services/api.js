// Base API endpoint: pulls from environment variables in Vite, falling back to local server if undefined
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

// Keys used to store authentication data in browser LocalStorage
const TOKEN_KEY = "usiwaste_token";
const ROLE_KEY = "usiwaste_role";

