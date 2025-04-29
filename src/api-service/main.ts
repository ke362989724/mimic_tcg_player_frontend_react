import { AxiosErrorProps } from "@/interface/axios";
import axios from "axios";

interface CreateUserProps {
  email: string;
  password: string;
  country: string;
  nickname: string;
  username: string;
  confirmPassword: string;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 1000,
  withCredentials: true,
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data as AxiosErrorProps);
  },
);

export const postGoogleOauthCallback = (tokenId: string) => {
  return instance.post("auth/google/callback", {
    tokenId: tokenId,
  });
};

export const postLogin = (email: string, password: string) => {
  return instance.post("auth/login", {
    email: email,
    password: password,
  });
};

export const getCategoryList = () => {
  return instance.get("card-category");
};

export const getCountryList = () => {
  return instance.get("country/all");
};

export const createUser = (data: CreateUserProps) => {
  return instance.post("user/create-user", {
    email: data.email,
    password: data.password,
    countryId: data.country,
    nickname: data.nickname,
    username: data.username,
    confirmPassword: data.confirmPassword,
  });
};
