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
function createAxiosResponseInterceptor() {
  const interceptor = instance.interceptors.response.use(
    undefined,
    async (e: unknown) => {
      if (isAxiosError(e)) {
        if (e.response?.status !== 401) {
          // reject promise for usual errors
          console.log(e.response?.data || "Connection error");
          e.message = e.response?.data;
          return Promise.reject(e);
        } // for 401, try to refresh our access token
        // disable interceptor to stop looping
        axios.interceptors.response.eject(interceptor);
        try {
          console.log("Trying to renew the access token");
          await Token.getAccessToken();
          console.log("Access token renewed successfully");
          return instance(e.response.config);
        } catch (error) {
          console.log("Access token renew failed");
          return Promise.reject(error);
          // enable response interceptor again
        } finally {
          createAxiosResponseInterceptor();
        }
      } else {
        console.log((e as Error).message);
        return Promise.reject(e);
      }
    }
  );
}
export function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}
createAxiosResponseInterceptor();
export default instance;
