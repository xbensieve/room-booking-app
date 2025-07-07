import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { auth } from "@/services/firebase";
import { getCookie } from "@/utils/cookie";
interface ApiClientConfig extends AxiosRequestConfig {
  headers?: Record<string, string>;
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

import type { InternalAxiosRequestConfig } from "axios";

axiosClient.interceptors.request.use((config) => {
  const csrf = getCookie("X-CSRF-TOKEN");
  if (csrf) {
    config.headers["X-CSRF-TOKEN"] = csrf;
  }
  return config;
});
let isRefreshing = false;
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("No Firebase user found (auth.currentUser is null)");
        }
        const newIdToken = await user.getIdToken(true);
        if (!newIdToken) {
          throw new Error("Failed to get refreshed idToken");
        }
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
          { idToken: newIdToken },
          { withCredentials: true }
        );

        isRefreshing = false;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        console.error("Token refresh failed", refreshError);

        return Promise.reject({
          status: 401,
          message: "Session expired. Please login again.",
        });
      }
    }

    return Promise.reject(error);
  }
);
const apiClient = {
  get: <T>(url: string, config?: ApiClientConfig): Promise<T> =>
    axiosClient.get(url, config),
  post: <T>(
    url: string,
    data?: unknown,
    config?: ApiClientConfig
  ): Promise<T> => axiosClient.post(url, data, config),
  put: <T>(url: string, data?: unknown, config?: ApiClientConfig): Promise<T> =>
    axiosClient.put(url, data, config),
  patch: <T>(
    url: string,
    data?: unknown,
    config?: ApiClientConfig
  ): Promise<T> => axiosClient.patch(url, data, config),
  delete: <T>(url: string, config?: ApiClientConfig): Promise<T> =>
    axiosClient.delete(url, config),
};

export default apiClient;
