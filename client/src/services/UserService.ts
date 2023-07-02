import axios, { AxiosError } from "axios";
import { LoginType } from "../@types/UserType";
import { errorResponseType } from "../@types/ErrorType";

export const registerUserService = async (user: FormData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/register`,
      user,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
    return "Registration failed";
  }
};

export const activateUserService = async (token: string) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/activate`,
      { token }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
    return "Activation failed";
  }
};

export const forgotPasswordService = async (data: LoginType) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/forgot-password`,
      data
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
    return "Password reset failed";
  }
};

export const resetPasswordService = async (token: string) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/reset-password/${token}`,
      { token }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
    return "Password reset failed";
  }
};

export const getUserProfileService = async (token: string | undefined) => {
  try {
    let response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
  }
};

export const updateUserProfileService = async (
  id: string | undefined,
  token: string | undefined,
  user: FormData
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/users/edit-profile/`,
      user,
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

export const deleteUserService = async (
  id: string | undefined,
  token: string | undefined
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/users/delete-profile/`,
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
