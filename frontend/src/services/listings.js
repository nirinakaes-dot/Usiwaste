import { request } from "./api";

// Public: browse the live feed (buyer side)
export async function fetchListings({ status = "available", page = 1 } = {}) {
  return request(`/api/listings?status=${status}&page=${page}`);
}

export async function fetchListing(id) {
  return request(`/api/listings/${id}`);
}