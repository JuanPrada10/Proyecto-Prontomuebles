import { Provider, Furniture, Customer, Sale, Employee, User } from "../types";

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
    const errorText = await response.text();
    throw new Error(`API request failed: ${errorText}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
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
// Employee
export const getEmployees = () => authFetch("/employee");
export const createEmployee = (data: Omit<Employee, "id_vendedor">) =>
  authFetch("/employee", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateEmployee = (id: number, data: Partial<Employee>) =>
  authFetch(`/employee/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteEmployee = (id: number) =>
  authFetch(`/employee/${id}`, { method: "DELETE" });

//User
export const getUser = () => authFetch("/user");
export const createUser = (data: Omit<User, "id_usuario">) =>
  authFetch("/user", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateUser = (id: number, data: Partial<User>) =>
  authFetch(`/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteUser = (id: number) =>
  authFetch(`/user/${id}`, { method: "DELETE" });

export const getUserbyId = (id: number) => authFetch(`/user/${id}`);

// Reports
export const getMonthlySales = () => authFetch("/reports/monthly-sales");
export const getTotalSalesCount = () => authFetch("/reports/total-sales-count");
export const getTotalFurnitureCount = () =>
  authFetch("/reports/total-furniture-count");
export const getTotalRevenue = () => authFetch("/reports/total-revenue");
//Obtener el total de ventas
// export const getTotalSalesCount = async () => {
//   const response = await fetch("`${API_URL}/reports/total-sales-count");
//   const data = await response.json();
//   return data.totalSalesCount;
// };
// Obtener el total de muebles
// export const getTotalFurnitureCount = async () => {
//   const response = await fetch("`${API_URL}/reports/total-furniture-count");
//   const data = await response.json();
//   return data.totalFurniture;
// };

// Obtener el total de ingresos totales

// export const getTotalRevenue = async () => {
//   const response = await fetch("`${API_URL}/reports/total-revenue");
//   const data = await response.json();
//   return data.totalRevenue;
// };

/*
// Obtener el total de ventas
export async function getTotalSalesCount() {
  const response = await fetch("/api/sales/total-count");
  if (!response.ok) throw new Error("Error fetching total sales count");
  return (await response.json()).total_sales; // Cambia a total_sales según lo que devuelve el backend
}

// Obtener el total de muebles
export async function getTotalFurnitureCount() {
  const response = await fetch("/api/furniture/total-count");
  if (!response.ok) throw new Error("Error fetching total furniture count");
  return (await response.json()).total_furniture; // Cambia a total_furniture según lo que devuelve el backend
}

// Obtener los ingresos totales
export const getTotalRevenue = async () => {
  const response = await fetch("/reports/total-revenue");
  const data = await response.json();
  return data.totalRevenue;
};*/
