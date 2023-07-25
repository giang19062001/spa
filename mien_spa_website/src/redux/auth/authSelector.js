export const selectUser = (state) =>state.userReducer.user
export const selectUserId = (state) =>state.userReducer.user.usId

export const selectListUser = (state) =>state.userReducer.listUser
export const selectListRole = (state) =>state.userReducer.listRole

export const selectError = (state) =>state.userReducer.error

export const selectCheckSuccess= (state) =>state.userReducer.alertSuccess
export const selectLoading= (state) =>state.userReducer.isLoading
