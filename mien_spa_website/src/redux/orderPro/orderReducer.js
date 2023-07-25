import { createSlice ,isAnyOf} from "@reduxjs/toolkit";
import { clearCart } from "../product/productReducer";
 import { postOrderPro,fetchOrderPro,fetchOrderProByUser,fetchOrderProDetail,putOrderPro, fetchOrderProByDate, fetchOrderByWeek } from "./orderThunk";



const initialState = {
    isLoading:false,
    error:"",
    success:false
}

export const orderProSlice = createSlice({
    name:'orderPro',
    initialState,
    reducers: {
        offSuccess: (state, action) => {
          state.success = false
        },
    
      },
    extraReducers:(builder) =>{
     builder.addCase(postOrderPro.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.success = true
     })

     builder.addMatcher(isAnyOf(fetchOrderPro.fulfilled,fetchOrderProByUser.fulfilled,fetchOrderProDetail.fulfilled,putOrderPro.fulfilled,fetchOrderProByDate.fulfilled,fetchOrderByWeek.fulfilled),(state,action)=>{
      state.isLoading = false;
   })
     builder.addMatcher(isAnyOf(postOrderPro.pending,fetchOrderPro.pending,fetchOrderProByUser.pending,fetchOrderProDetail.pending,putOrderPro.pending,fetchOrderProByDate.pending,fetchOrderByWeek.pending),(state,action)=>{
      state.isLoading = true;
   })
     builder.addMatcher(isAnyOf(postOrderPro.rejected,fetchOrderPro.rejected,fetchOrderProByUser.rejected,fetchOrderProDetail.rejected,putOrderPro.rejected,fetchOrderProByDate.rejected,fetchOrderByWeek.rejected),(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
        state.success = false

     })
    

    }
    
})
export const { offSuccess } = orderProSlice.actions;

export default orderProSlice.reducer;