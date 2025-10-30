import axios from "axios";
import type { AuthResponse } from "../types/auth";

export const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      "http://localhost:8000/api/auth/login",
      {
        username,
        password,
      }
    );

    if (response.data.success && response.data.data) {
      sessionStorage.setItem("access_token", response.data.data.access_token);
    }

    return response.data;
  } catch {
    return { success: false, error: "Login failed" };
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      "http://localhost:8000/api/auth/register",
      {
        username,
        email,
        password,
      }
    );

    if (response.data.success && response.data.data) {
      sessionStorage.setItem("access_token", response.data.data.access_token);
    }

    return response.data;
  } catch {
    return { success: false, error: "Registration failed" };
  }
};

export const getAccessToken = () => {
  return sessionStorage.getItem("access_token");
};

export const logout = () => {
  sessionStorage.removeItem("access_token");
};
