import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "localhost",
  headers: { Authorization: "bearer aaa" },
  timeout: 5000,
});

// Logs 4xx responses
instance.interceptors.response.use((e: unknown) => {
  const error = <AxiosError>e;
  if (error?.isAxiosError) console.log(error.response?.data);
  else console.log(error.message);
  return Promise.reject(e);
});

export default instance;
