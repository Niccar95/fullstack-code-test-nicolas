export interface Sensor {
  id: number;
  name: string;
  model: string;
  description?: string;
}

export interface SensorResponse {
  success: boolean;
  data?: Sensor[];
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
