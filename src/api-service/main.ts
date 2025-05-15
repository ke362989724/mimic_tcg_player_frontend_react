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

export type CardConditionProps = {
  id: string;
  name: string;
};

export type CardCategoryProps = {
  id: string;
  name: string;
};

export type CardCountryProps = {
  id: string;
  name: string;
};

export interface CreateProductProps {
  name: string;
  description: string;
  price: number;
  qty: number;
  cardCategoryId: string;
  cardConditionId: string;
  images: string[];
  currencyId: string;
}

export type CreateProduct = {};

let isRefreshing = false;

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data.data;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const originalRequest = error.config;

    // Check if error is due to unauthorized (e.g., 401) and not already retrying
    if (error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      try {
        // Attempt to refresh token
        await refreshAccessToken();
        isRefreshing = false;

        // Retry the original request with updated token
        return instance(originalRequest);
      } catch (error: AxiosErrorProps | unknown) {
        isRefreshing = false;
        return Promise.reject(error);
      }
    }

    // For non-401 errors or if already refreshing, reject with original error
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

export const getCategoryList = (): Promise<CardCategoryProps[]> => {
  return instance.get("card-category");
};

export const getCountryList = (): Promise<CardCountryProps[]> => {
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

export const getCardConditionList = (): Promise<CardConditionProps[]> => {
  return instance.get("card-condition");
};

export const getPreSignedUrlMultiple = ({
  fileNumber,
}: {
  fileNumber: number;
}) => {
  return instance.get("r2/presigned-url-multiple-image-files", {
    params: {
      fileNumber: fileNumber,
    },
  });
};

export const getPreSignedUrlSingle = () => {
  return instance.get("r2/presigned-url-single-image-file");
};

export const createProduct = (createProduct: CreateProductProps) => {
  return instance.post("product/create", createProduct);
};

export const refreshAccessToken = () => {
  return instance.post("auth/access-token");
};
