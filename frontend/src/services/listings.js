import { request } from "./api";

export const listingsApi = {
  browse: (params = "") => request(`/listings${params}`),
  get: (id) => request(`/listings/${id}`),
  create: (payload, token) => request("/listings", { method: "POST", body: payload, token }),
  update: (id, payload, token) => request(`/listings/${id}`, { method: "PUT", body: payload, token }),
  remove: (id, token) => request(`/listings/${id}`, { method: "DELETE", token }),
  mine: (token) => request("/listings/mine", { token }),
};

export const ordersApi = {
  reserve: (listing_id, token) => request("/orders", { method: "POST", body: { listing_id }, token }),
  mine: (token) => request("/orders", { token }),
  update: (id, payload, token) => request(`/orders/${id}`, { method: "PUT", body: payload, token }),
};

export const favoritesApi = {
  mine: (token) => request("/favorites", { token }),
  add: (listing_id, token) => request("/favorites", { method: "POST", body: { listing_id }, token }),
  remove: (id, token) => request(`/favorites/${id}`, { method: "DELETE", token }),
};

export const reviewsApi = {
  create: (payload, token) => request("/reviews", { method: "POST", body: payload, token }),
  forListing: (id) => request(`/reviews/listing/${id}`),
};
