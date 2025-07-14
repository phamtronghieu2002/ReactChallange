const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

import routes from "@/configs/routes";
import storage from "@/untils/_storage";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";

const getTokenAuthHeader = (token: string) => `Bearer ${token}`;

function createInstance(API: string) {
  axios.defaults.withCredentials = true;
  const serverInstance = axios.create({
    baseURL: `${API}/api/v1`,
    headers: { "Content-Type": "application/json" },
  });

  const interceptorsRq = async (config: InternalAxiosRequestConfig<any>) => {
    let accessToken = storage.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = getTokenAuthHeader(accessToken);
    }

    return config;
  };

  const interceptorsRqError = (error: any) => {
    return Promise.reject(error);
  };

  const interceptorsRs = (response: AxiosResponse<any, any>) => {
    return response;
  };
  const interceptorsRsError = async (error: any) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      try {
        window.location.href = routes.loginPassword;
      } catch (error: any) {}
    }

    return Promise.reject(error?.response?.data);
  };

  serverInstance.interceptors.request.use(interceptorsRq, interceptorsRqError);
  serverInstance.interceptors.response.use(interceptorsRs, interceptorsRsError);

  return serverInstance;
}

const axiosInstance = createInstance(SERVER_DOMAIN);

axiosRetry(axiosInstance, { retries: 3 });

export default axiosInstance;
