import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { forgot_password, generateOTP, validateOtp } from "./otpThunk";
const initialState = {
  email: "",
  otp: "",
  isLoading: false,
  error: false,
  validateSuccess: false,
  resetSuccess:false
};

export const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    turnOffValidateSuccess: (state, action) => {
      state.validateSuccess = false
    },
    turnOffAlertResetPasswordSuccess:(state,action) =>{
      state.resetSuccess = false

    }
  },
  extraReducers: (builder) => {
    builder.addCase(generateOTP.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.validateSuccess = false;
      state.email = action.meta.arg;
      state.resetSuccess = false

    });

    builder.addCase(validateOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.validateSuccess = true;
      state.otp = action.meta.arg.otp;
      state.resetSuccess = false

    });
    builder.addCase(forgot_password.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.validateSuccess = false;
      state.otp = "";
      state.email = ""
      state.resetSuccess = true

    });
    builder.addMatcher(
      isAnyOf(generateOTP.pending, validateOtp.pending,forgot_password.pending),
      (state, action) => {
        state.isLoading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(generateOTP.rejected, validateOtp.rejected,forgot_password.rejected),
      (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.validateSuccess = false;
        state.resetSuccess = false

      }
    );
  },
});
export const { turnOffValidateSuccess,turnOffAlertResetPasswordSuccess} = otpSlice.actions;

export default otpSlice.reducer;
