import axios from "axios";
import type { AuthResponse } from "../types/sensor";

export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; data?: AuthResponse; error?: string }> {
  try {
    const response = await axios.post<AuthResponse>(
      "http://localhost:8000/api/auth/login",
      {
        username,
        password,
      }
    );

    if (response.data.success) {
      sessionStorage.setItem("access_token", response.data.access_token);
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data.message };
    }
  } catch {
    return { success: false, error: "Login failed" };
  }
}

export async function register(
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; data?: AuthResponse; error?: string }> {
  try {
    const response = await axios.post<AuthResponse>(
      "http://localhost:8000/api/auth/register",
      {
        username,
        email,
        password,
      }
    );

    sessionStorage.setItem("access_token", response.data.access_token);

    return { success: true, data: response.data };
  } catch {
    return { success: false, error: "Registration failed" };
  }
}

export function getAccessToken() {
  return sessionStorage.getItem("access_token");
}

export function logout() {
  sessionStorage.removeItem("access_token");
}
