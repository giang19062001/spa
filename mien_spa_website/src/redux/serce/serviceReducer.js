import { createSlice,isAnyOf } from "@reduxjs/toolkit";
import { blockServices, fetchServices,postService,deleteServices, putServices } from "./serviceThunk";

const initialState = {
    services: [],
    isLoading:false,
    error:"",
    cartServices:[],

}

export const serviceSlice = createSlice({
    name:'services',
    initialState,
    reducers:{
      addService:(state,action) =>{   
           state.cartServices?.push(action.payload)       
      },
      removeService:(state,action) =>{
          state.cartServices = [...state.cartServices.filter((item) => item.seId  !== action.payload.seId )]
      },
      clearCartServices: (state, action) => {
         state.cartServices = []
       },
  },
    extraReducers:(builder) =>{

     builder.addCase(fetchServices.fulfilled,(state,action)=>{
        state.isLoading = false;
      //   state.services = [...action.payload.filter((item) => item.isDelete  === false )]
        state.services = action.payload

     })
     builder.addMatcher(isAnyOf(fetchServices.fulfilled,postService.fulfilled,blockServices.fulfilled,deleteServices.fulfilled,putServices.fulfilled),(state,action)=>{
        state.isLoading = false;
     })
     builder.addMatcher(isAnyOf(fetchServices.pending,postService.pending,blockServices.pending,deleteServices.pending,putServices.pending),(state,action)=>{
        state.isLoading = true;
     })
     builder.addMatcher(isAnyOf(fetchServices.rejected,postService.rejected,blockServices.rejected,deleteServices.rejected,putServices.rejected),(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
     })

    }
    
})
export const {addService,removeService,clearCartServices} = serviceSlice.actions

export default serviceSlice.reducer;