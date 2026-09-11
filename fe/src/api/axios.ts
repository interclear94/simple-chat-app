// src/api/http.ts
import axios from "axios";

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN;

export const api = axios.create({
  baseURL: API_ORIGIN,
  withCredentials: true,
  // refresh cookie 전송/갱신 허용
});

export const authHttp = axios.create({
  baseURL: API_ORIGIN,
  withCredentials: true,
});
