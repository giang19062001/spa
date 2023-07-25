export const selectEmail = (state) =>state.otpReducer.email
export const selectLoading = (state) =>state.otpReducer.isLoading
export const selectValidate = (state) =>state.otpReducer.validateSuccess
export const selectReset = (state) =>state.otpReducer.resetSuccess

export const selectOtp = (state) =>state.otpReducer.otp
export const selectError = (state) =>state.otpReducer.error
