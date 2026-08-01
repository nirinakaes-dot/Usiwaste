import { request } from "./api";

export const authApi = {
  signupUser: (payload) => request("/auth/signup/user", { method: "POST", body: payload }),
  signupBusiness: (payload) => request("/auth/signup/business", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  forgotPassword: (payload) => request("/auth/forgot-password", { method: "POST", body: payload }),
  resetPassword: (payload) => request("/auth/reset-password", { method: "POST", body: payload }),
  me: (token) => request("/auth/me", { token }),
};
