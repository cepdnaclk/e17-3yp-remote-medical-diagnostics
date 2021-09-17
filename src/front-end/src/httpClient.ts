import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Token from "./model/Token";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_USE_MOCK_API}/api/`,
  timeout: 5000,
});

instance.interceptors.request.use((conf: AxiosRequestConfig) => {
  conf.headers = {
    Authorization: `Bearer ${Token.accessToken}`,
  };
  return conf;
});

// Logs 4xx responses
instance.interceptors.response.use(undefined, (e: unknown) => {
  const error = e as AxiosError;
  if (error?.isAxiosError) console.log(error.response?.data);
  else console.log(error.message);
  console.log("wait a min");
  return Promise.reject(e);
});

export function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export default instance;
