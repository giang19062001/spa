import { createSlice ,isAnyOf} from "@reduxjs/toolkit";
 import { postOrderSer,fetchOrderSer,fetchOrderSerByUser,fetchOrderSerDetail, putOrderSer, deleteOrderSer, fetchOrderSerByDate, fetchOrderSerById } from "./orderThunk";

const initialState = {
    isLoading:false,
    error:"",
    success:false
}

export const orderSerSlice = createSlice({
    name:'orderSer',
    initialState,
    reducers: {
        offSuccess: (state, action) => {
          state.success = false
        },
    
      },
    extraReducers:(builder) =>{
     builder.addCase(postOrderSer.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.success = true
     })
     builder.addMatcher(isAnyOf(fetchOrderSer.fulfilled,fetchOrderSerByUser.fulfilled,fetchOrderSerDetail.fulfilled,putOrderSer.fulfilled,fetchOrderSerByDate.fulfilled,fetchOrderSerById.fulfilled),(state,action)=>{
      state.isLoading = false;
   })
     builder.addMatcher(isAnyOf(postOrderSer.pending,putOrderSer.pending,fetchOrderSer.pending,fetchOrderSerByUser.pending,fetchOrderSerDetail.pending,fetchOrderSerByDate.pending,fetchOrderSerById.pending),(state,action)=>{
      state.isLoading = true;
   })
     builder.addMatcher(isAnyOf(postOrderSer.rejected,putOrderSer.rejected,fetchOrderSer.rejected,fetchOrderSerByUser.rejected,fetchOrderSerDetail.rejected,fetchOrderSerByDate.rejected,fetchOrderSerById.rejected),(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
        state.success = false

     })
    

    }
    
})
export const { offSuccess } = orderSerSlice.actions;

export default orderSerSlice.reducer;