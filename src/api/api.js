import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getCourts = () => API.get("/public/courts");
export const getEquipment = () => API.get("/public/equipment");
export const getCoaches = () => API.get("/public/coaches");

export const previewPrice = (payload) =>
  API.post("/bookings/preview", payload);

export const createBooking = (payload) =>
  API.post("/bookings", payload);

export const getBookings = () =>
  API.get("/bookings");

export const deleteBooking = (id) =>
  API.delete(`/bookings/${id}`);

export const getPricingRules = () =>
  API.get("/admin/pricing-rules");

export const createPricingRule = (payload) =>
  API.post("/admin/pricing-rules", payload);

export default API;
