export interface ReadingResponse {
  success: boolean;
  data?: Reading[];
  error?: string;
}

export interface Reading {
  id: number;
  temperature: number;
  humidity: number;
  timestamp: Date;
}
