import { request } from "./api";

export async function createOrder(listingId) {
  return request("/api/orders", { method: "POST", body: { listing_id: listingId } });
}

export async function fetchMyOrders() {
  return request("/api/orders");
}

export async function updateOrder(orderId, status) {
  return request(`/api/orders/${orderId}`, { method: "PUT", body: { status } });
}