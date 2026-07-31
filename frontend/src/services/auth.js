import api from "./api";

// All the auth calls in one place, matching the Flask backend routes.
// Each returns response.data so callers get the JSON directly.

export const registerUser = (data) =>
  api.post("/auth/register/user", data).then((r) => r.data);

export const registerBusiness = (data) =>
  api.post("/auth/register/business", data).then((r) => r.data);

export const login = (data) =>
  api.post("/auth/login", data).then((r) => r.data);

export const getMe = () => api.get("/auth/me").then((r) => r.data);

export const forgotPassword = (data) =>
  api.post("/auth/forgot-password", data).then((r) => r.data);

export const resetPassword = (data) =>
  api.post("/auth/reset-password", data).then((r) => r.data);

// Token helpers - login stores the JWT here, the api interceptor reads it.
export const saveToken = (token) =>
  token
    ? localStorage.setItem("usiwaste_token", token)
    : localStorage.removeItem("usiwaste_token");

export const getToken = () => localStorage.getItem("usiwaste_token");
