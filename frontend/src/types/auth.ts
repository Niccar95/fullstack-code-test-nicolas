export interface AuthData {
  message: string;
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface AuthResponse {
  success: boolean;
  data?: AuthData;
  error?: string;
}
