import axios, { AxiosError } from "axios";
import { errorResponseType } from "../@types/ErrorType";

export const fetchAllUsersService = async (token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/admin/all-users`,
      config
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
  }
};

export const deleteUserByIdService = async (
  token: string | undefined,
  id: string | undefined
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/admin/delete-user/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
  }
};

export const updateUserByIdService = async (
  id: string | undefined,
  token: string | undefined,
  updatedUser: FormData
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/admin/update-profile/${id}`,
      updatedUser,
      config
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
  }
};
