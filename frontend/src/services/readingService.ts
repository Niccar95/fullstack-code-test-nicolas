import axios from "axios";
import type { Reading, ReadingResponse } from "../types/reading";
import { getAccessToken } from "./auth";

export const getReadings = async (
  sensorId: number,
  timestampFrom?: string,
  timestampTo?: string
): Promise<ReadingResponse> => {
  try {
    const token = getAccessToken();
    const response = await axios.get<{ success: boolean; data: Reading[] }>(
      `http://localhost:8000/api/sensors/${sensorId}/readings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          timestamp_from: timestampFrom || undefined,
          timestamp_to: timestampTo || undefined
        },
      }
    );
    return response.data;
  } catch {
    return { success: false, error: "Failed to fetch readings" };
  }
};

export const addReading = async (
  sensorId: number,
  temperature: number,
  humidity: number
): Promise<{ success: boolean; data?: Reading; error?: string }> => {
  try {
    const token = getAccessToken();
    const timestamp = new Date().toISOString();
    const response = await axios.post<{ success: boolean; data: Reading }>(
      `http://localhost:8000/api/sensors/${sensorId}/readings`,
      {
        temperature,
        humidity,
        timestamp,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch {
    return { success: false, error: "Failed to add reading" };
  }
};
