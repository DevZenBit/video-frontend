import { IViewer } from '../viewer/interfaces';

export interface LoginResponse {
  user: IViewer;
  authToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RefreshTokenResponse extends LoginResponse {}

export interface RefreshTokenRequest {
  refreshToken: string;
}
