import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  login,
  register,
  fetchUserById,
  fetchAllUser,
  updateUser,
  updatePassword,
  fetchUserByIdAdmin,
  fetchAllRole,
  postRole,
  changePassword,
} from "./authThunk";
const initialState = {
  user: null,
  listUser: [],
  listRole: [],
  isLoading: false,
  error: false,
  alertSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    turnOffRegisterSuccess: (state, action) => {
      state.alertSuccess = false;
    },
    turnOffError: (state, action) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.alertSuccess = true;
      state.error = false;
    });
    builder.addCase(fetchAllRole.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listRole = action.payload;
      state.error = false;
    });
    builder.addCase(fetchAllUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listUser = action.payload;
      state.error = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addMatcher(
      isAnyOf(
        register.rejected,
        fetchUserById.rejected,
        fetchAllUser.rejected,
        updateUser.rejected,
        updatePassword,
        fetchUserByIdAdmin.rejected,
        fetchAllRole.rejected,
        postRole.rejected,
        changePassword.rejected
      ),
      (state, action) => {
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      isAnyOf(login.fulfilled, fetchUserById.fulfilled),
      (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = false;
      }
    );
    builder.addMatcher(
      isAnyOf(
        updateUser.fulfilled,
        updatePassword.fulfilled,
        fetchUserByIdAdmin.fulfilled,
        postRole.fulfilled,
        changePassword.fulfilled
      ),
      (state, action) => {
        state.isLoading = false;
        state.error = false;
      }
    );
    builder.addMatcher(
      isAnyOf(
        login.pending,
        register.pending,
        fetchUserById.pending,
        fetchAllUser.pending,
        updateUser.pending,
        updatePassword.pending,
        fetchUserByIdAdmin.pending,
        fetchAllRole.pending,
        postRole.pending,
        changePassword.pending
      ),
      (state, action) => {
        state.isLoading = true;
      }
    );

  },
});

export const { logout, turnOffRegisterSuccess, turnOffError } =
  userSlice.actions;

export default userSlice.reducer;
