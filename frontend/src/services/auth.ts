import axios from "axios";

export async function loginService(username: string, password: string) {
  try {
    const response = await axios.post("http://localhost:8000/api/auth/login", {
      username,
      password,
    });

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

export async function registerService(
  username: string,
  email: string,
  password: string
) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      {
        username,
        email,
        password,
      }
    );

    sessionStorage.setItem("access_token", response.data.access_token);

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
}

export function getAccessToken() {
  return sessionStorage.getItem("access_token");
}

export function logoutService() {
  sessionStorage.removeItem("access_token");
}
