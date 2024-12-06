import { Provider, Furniture, Customer, Sale } from "../types";

const API_URL = "http://localhost:5000/api";

// Auth Service
export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};

export const register = async (userData: any) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

// Protected API calls
const authFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
};

// Providers
export const getProviders = () => authFetch("/providers");
export const createProvider = (data: Omit<Provider, "id_proveedor">) =>
  authFetch("/providers", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateProvider = (id: number, data: Partial<Provider>) =>
  authFetch(`/providers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteProvider = (id: number) =>
  authFetch(`/providers/${id}`, { method: "DELETE" });

// Furniture
export const getFurniture = () => authFetch("/furniture");
export const createFurniture = (
  data: Omit<Furniture, "id_mueble" | "id_proveedor">
) =>
  authFetch("/furniture", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateFurniture = (id: number, data: Partial<Furniture>) =>
  authFetch(`/furniture/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteFurniture = (id: number) =>
  authFetch(`/furniture/${id}`, { method: "DELETE" });

// Customers
export const getCustomers = () => authFetch("/customers");
export const createCustomer = (data: Omit<Customer, "id_cliente">) =>
  authFetch("/customers", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateCustomer = (id: number, data: Partial<Customer>) =>
  authFetch(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteCustomer = (id: number) =>
  authFetch(`/customers/${id}`, { method: "DELETE" });

// Sales
export const getSales = () => authFetch("/sales");
export const createSale = (data: Omit<Sale, "id_venta" | "fecha" | "total">) =>
  authFetch("/sales", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const getSaleById = (id: number) => authFetch(`/sales/${id}`);
// Sellers
export const getSellers = () => authFetch("/sellers");
// Reports
export const getMonthlySales = () => authFetch("/reports/monthly-sales");
export const getTopProducts = () => authFetch("/reports/top-products");
export const getTopCustomers = () => authFetch("/reports/top-customers");
export const getSellerPerformance = () =>
  authFetch("/reports/seller-performance");
