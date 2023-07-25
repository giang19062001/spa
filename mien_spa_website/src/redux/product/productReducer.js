import { createSlice,isAnyOf } from "@reduxjs/toolkit";
import { fetchProducts,postProduct,fetchProductDetail,blockProducts,deleteProducts, putProducts } from "./productThunk";

const initialState = {
    products: [],
    isLoading:false,
    error:"",
    cart: []
}

export const productSlice = createSlice({
    name:'products',
    initialState,
    reducers: {
      addCart: (state, action) => {
        const checkExists  = state.cart?.find((item)=>item.proId===action.payload.proId); 
        if(checkExists === undefined){
            state.cart.push(action.payload);
        } else{
          const cart = state.cart.map(item =>
              item.proId === action.payload.proId
              ? {...item, quantity: parseInt(item.quantity) + parseInt(action.payload.quantity)}
              : {...item}
          );
          
          state.cart = cart
          
        } 
      },
      removeCart: (state, action) => {
        state.cart = [...state.cart.filter((item) => item.proId!==action.payload)]
      },
      clearCart: (state, action) => {
        state.cart = []
      },
  
    },
    extraReducers:(builder) =>{

     builder.addCase(fetchProducts.fulfilled,(state,action)=>{
        state.isLoading = false;
        // state.products = [...action.payload.filter((item) => item.isDelete  === false )]
        state.products = action.payload
     })
     builder.addMatcher(isAnyOf(postProduct.fulfilled,fetchProductDetail.fulfilled,blockProducts.fulfilled,deleteProducts.fulfilled,putProducts.fulfilled),(state,action)=>{
      state.isLoading = false;
    })
     builder.addMatcher(isAnyOf(fetchProducts.pending,postProduct.pending,fetchProductDetail.pending,blockProducts.pending,deleteProducts.pending,putProducts.pending),(state,action)=>{
      state.isLoading = true;
    })
     builder.addMatcher(isAnyOf(fetchProducts.rejected,postProduct.rejected,fetchProductDetail.rejected,blockProducts.rejected,deleteProducts.rejected,putProducts.rejected),(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
     })
     

    }
    
})

export const { addCart, removeCart ,clearCart} = productSlice.actions;
export default productSlice.reducer;