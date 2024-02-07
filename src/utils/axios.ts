import axios, { AxiosError } from 'axios';
import * as process from 'process';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL
});

interface ErrorData {
  message: string;
  path?: string;
  statusCode?: number;
  timestamp?: string;
}

export interface CustomAxiosError {
  status?: number;
  data?: ErrorData;
}

export const axiosError = (err: AxiosError): { error: CustomAxiosError } => ({
  error: { status: err.response?.status, data: err.response?.data as ErrorData }
});

export default instance;
