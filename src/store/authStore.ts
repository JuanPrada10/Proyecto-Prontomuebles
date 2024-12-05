import { create } from "zustand";
import { User } from "../types";
import * as api from "../services/api";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage?.getItem("user")
    ? JSON.parse(localStorage?.getItem("user"))
    : "",
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  login: async (username: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const data = await api.login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      set({ user: data, token: data.token, loading: false });
      return true;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return false;
    }
  },
  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const data = await api.register(userData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      set({ user: data, token: data.token, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
  changeName: (newName: string) => {
    set({ nombre: newName });
  },
}));
