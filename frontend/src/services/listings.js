import { request } from "./api";

// Public: browse the live feed (buyer side)
export async function fetchListings({ status = "available", page = 1 } = {}) {
  return request(`/api/listings?status=${status}&page=${page}`);
}

export async function fetchListing(id) {
  return request(`/api/listings/${id}`);
}

// Business: create a product
export async function createListing(payload) {
  return request("/api/listings", { method: "POST", body: payload });
}

// Business: my listings (dashboard)
export async function fetchMyListings() {
  return request("/api/listings/mine");
}

export async function updateListing(id, payload) {
  return request(`/api/listings/${id}`, { method: "PUT", body: payload });
}

export async function deleteListing(id) {
  return request(`/api/listings/${id}`, { method: "DELETE" });
}