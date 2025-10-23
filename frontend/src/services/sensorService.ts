import axios from "axios";
import { getAccessToken } from "./auth";
import type { SensorResponse, Sensor } from "../types/sensor";

export async function getSensors(
  q = "",
  page = 1,
  page_size = 10
): Promise<SensorResponse> {
  try {
    const token = getAccessToken();
    const response = await axios.get<{ success: boolean; data: Sensor[] }>(
      "http://localhost:8000/api/sensors",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { q, page, page_size },
      }
    );

    return response.data;
  } catch {
    return { success: false, error: "Failed to fetch sensors" };
  }
}

export async function getSensor(
  id: number
): Promise<{ success: boolean; data?: Sensor; error?: string }> {
  try {
    const token = getAccessToken();
    const response = await axios.get<{ success: boolean; data: Sensor }>(
      `http://localhost:8000/api/sensors/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch {
    return { success: false, error: "Failed to fetch sensor" };
  }
}

export async function addSensor(
  name: string,
  description: string,
  model: string
): Promise<{
  success: boolean;
  data?: { success: boolean; id: number; name: string };
  error?: string;
}> {
  try {
    const token = getAccessToken();
    const response = await axios.post<{
      success: boolean;
      id: number;
      name: string;
    }>(
      "http://localhost:8000/api/sensors",
      { name, description, model },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch {
    return { success: false, error: "Failed to create new sensor" };
  }
}
