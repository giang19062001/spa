export const selectListProduct = (state) => state.productReducer.products

export const selectCartProduct = (state) => state.productReducer.cart

export const selectStatusProduct = (state) => state.productReducer.isLoading
