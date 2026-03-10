import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const attachTokenInterceptor = (getToken: () => Promise<string | null>) => {
  api.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
};