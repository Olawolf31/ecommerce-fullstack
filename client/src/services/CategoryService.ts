import axios, { AxiosError } from "axios";
import { errorResponseType } from "../@types/ErrorType";

export const categoryService = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/categories`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
  }
};

export const deleteCategoryService = async (slug: string | undefined) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/categories/${slug}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
  }
};

export const updateCategoryService = async (
  slug: string | undefined,
  category: string
) => {
  try {
    let response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/categories/${slug}`,
      { name: category }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
  }
};

export const createCategoryService = async (category: string) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/categories`,
      { name: category }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
  }
};
