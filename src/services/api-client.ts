import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export default class APIClient<T> {
  constructor(public endpoint: string) {}

  getAll(config?: AxiosRequestConfig) {
    return useQuery<T[], Error>({
      queryKey: ["countries"],
      queryFn: () =>
        axiosInstance.get<T[]>(this.endpoint, config).then((res) => res.data),
    });
  }
  get = (name: string, config?: AxiosRequestConfig) => {
    return useQuery<T, Error>({
      queryKey: ["country", name],
      queryFn: () =>
        axiosInstance
          .get<T>(this.endpoint + "/" + name, config)
          .then((res) => res.data),
    });
  };
}
