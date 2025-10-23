export interface Sensor {
  id: number;
  name: string;
  model: string;
  description?: string;
}

export interface SensorResponse {
  success: boolean;
  data?: Sensor[];
  has_more?: boolean;
  error?: string;
}
