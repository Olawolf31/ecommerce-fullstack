import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginType, UserType } from "../@types/UserType";
import axios, { AxiosError } from "axios";
import { errorResponseType } from "../@types/ErrorType";

// Define initial state with proper types
interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: errorResponseType | null;
  user: UserType;
  selectedMenu: string;
  accessToken: string | undefined;
}

// Define initial state
const initialState: AuthState = {
  isLoggedIn: localStorage.getItem("userDetails") !== null,
  isLoading: false,
  isError: null,
  user: {} as UserType,
  selectedMenu: "general",
  accessToken: localStorage.getItem("userDetails") || undefined,
};

// Login user thunk
export const loginUser = createAsyncThunk(
  "users/login",
  async (logins: LoginType, { rejectWithValue }) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        logins
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<errorResponseType>;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data as errorResponseType);
      }
      return rejectWithValue("Incorrect email or password");
    }
  }
);

export const logoutUser = createAsyncThunk("users/logout", async () => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/users/logout`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<errorResponseType>;
    if (axiosError.response && axiosError.response.data) {
      return axiosError.response.data as errorResponseType;
    }
  }
});

// Auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSelectedMenu: (state, action) => {
      state.selectedMenu = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Login user
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const accessToken = action.payload.payload.accessToken;
      state.isLoading = false;
      state.user = action.payload;
      //console.log(action.payload)
      state.isLoggedIn = true;
      state.accessToken = accessToken;
     // localStorage.setItem("userDetails", JSON.stringify(accessToken));
     localStorage.setItem("userDetails", accessToken)
      state.isError = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload as errorResponseType;
    });

    // Logout user
    builder.addCase(logoutUser.pending, (state, action) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isLoggedIn = false;
      localStorage.removeItem("userDetails");
      state.isError = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload as errorResponseType;
    });
  },
});

export const { setSelectedMenu } = authSlice.actions;

export default authSlice.reducer;
