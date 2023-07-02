import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { errorResponseType } from "../@types/ErrorType";
import { UserType } from "../@types/UserType";
import {
  registerUserService,
  activateUserService,
  forgotPasswordService,
  resetPasswordService,
  getUserProfileService,
  updateUserProfileService,
  deleteUserService,
} from "services/UserService";
import { LoginType } from "../@types/UserType";

interface AuthState {
  singleUser: UserType;
  users: UserType[];
  isLoading: boolean;
  isError: errorResponseType | null;
}

//define initial state
const initialState: AuthState = {
  singleUser: {} as UserType,
  users: [],
  isLoading: false,
  isError: null,
};

//register user thunk
export const RegisterUser = createAsyncThunk(
  "users/register",
  async (user: FormData, { rejectWithValue }) => {
    try {
      let response = await registerUserService(user);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<errorResponseType>;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data as errorResponseType);
      }
      return rejectWithValue("Registration failed");
    }
  }
);

//activate user thunk
export const ActivateUser = createAsyncThunk(
  "users/activate",
  async (token: string, { rejectWithValue }) => {
    try {
      let response = await activateUserService(token);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<errorResponseType>;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data as errorResponseType);
      }
      return rejectWithValue("Activation failed");
    }
  }
);

//forgot password thunk
export const ForgotUserPassword = createAsyncThunk(
  "users/forgot-password",
  async (data: LoginType, { rejectWithValue }) => {
    try {
      let response = await forgotPasswordService(data);
      console.log(response);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<errorResponseType>;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data as errorResponseType);
      }
      return rejectWithValue("Password reset failed");
    }
  }
);

//reset password thunk
export const ResetUserPassword = createAsyncThunk(
  "users/reset-password",
  async (token: string, { rejectWithValue }) => {
    try {
      let response = await resetPasswordService(token);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<errorResponseType>;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data as errorResponseType);
      }
      return rejectWithValue("Password reset failed");
    }
  }
);

//get user profile thunk
export const GetUserProfile = createAsyncThunk(
  "users/profile",
  async (token: string | undefined, { rejectWithValue }) => {
    try {
      let response = await getUserProfileService(token);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<errorResponseType>;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data as errorResponseType);
      }
      return rejectWithValue("Unable to get user profile");
    }
  }
);

//edit user profile thunk
export const EditUserProfile = createAsyncThunk(
  "users/edit-profile",
  async (
    {
      id,
      token,
      user,
    }: { id: string | undefined; token: string | undefined; user: FormData },
    { rejectWithValue }
  ) => {
    try {
      let response = await updateUserProfileService(id, token, user);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<errorResponseType>;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data as errorResponseType);
      }
      return rejectWithValue("Unable to edit user profile");
    }
  }
);

//delete user thunk
export const DeleteUser = createAsyncThunk(
  "users/delete",
  async (
    { id, token }: { id: string | undefined; token: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      let response = await deleteUserService(id, token);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<errorResponseType>;
      if (axiosError.response && axiosError.response.data) {
        return rejectWithValue(axiosError.response.data as errorResponseType);
      }
      return rejectWithValue("Unable to edit user profile");
    }
  }
);

//user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(RegisterUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleUser = action.payload;
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload as errorResponseType;
    });

    //activate user
    builder.addCase(ActivateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(ActivateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleUser = action.payload;
    });
    builder.addCase(ActivateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload as errorResponseType;
    });

    //forgot password
    builder.addCase(ForgotUserPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(ForgotUserPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleUser = action.payload;
    });
    builder.addCase(ForgotUserPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload as errorResponseType;
    });

    //reset password
    builder.addCase(ResetUserPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(ResetUserPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleUser = action.payload;
    });
    builder.addCase(ResetUserPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload as errorResponseType;
    });

    //get user profile
    builder.addCase(GetUserProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(GetUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleUser = action.payload.payload;
    });
    builder.addCase(GetUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload as errorResponseType;
    });

    //edit user profile
    builder.addCase(EditUserProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(EditUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleUser = action.payload.payload;
    });
    builder.addCase(EditUserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload as errorResponseType;
    });

    //delete user
    builder.addCase(DeleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleUser = action.payload.payload;
    });
    builder.addCase(DeleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload as errorResponseType;
    });
  },
});

export default userSlice.reducer;
