// frontend/src/api/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getCourts = () => API.get('/public/courts');
export const getEquipment = () => API.get('/public/equipment');
export const getCoaches = () => API.get('/public/coaches');

export const previewPrice = async (payload) => {
  try {
    return await API.post('/bookings/preview', payload);
  } catch (err) {
    console.error('previewPrice API error', err);
    throw err;
  }
};

export const createBooking = async (payload) => {
  try {
    return await API.post('/bookings', payload);
  } catch (err) {
    console.error('createBooking API error', err);
    throw err;
  }
};

export const getPricingRules = () => API.get('/admin/pricing-rules');
export const createPricingRule = (payload) => API.post('/admin/pricing-rules', payload);

export default API;
