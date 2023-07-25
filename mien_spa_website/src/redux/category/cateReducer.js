import { createSlice ,isAnyOf} from "@reduxjs/toolkit";
 import { fetchCategories,postCategories,putCategories } from "./cateThunk";

const initialState = {
    categories: [],
    isLoading:false,
    error:""
}

export const categorySlice = createSlice({
    name:'categories',
    initialState,
    reducers:{
    },
    extraReducers:(builder) =>{
     builder.addCase(fetchCategories.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.categories = action.payload
     })
     builder.addMatcher(isAnyOf(postCategories.fulfilled,putCategories.fulfilled),(state,action)=>{
      state.isLoading = false;
   })
     builder.addMatcher(isAnyOf(fetchCategories.pending,postCategories.pending,putCategories.pending),(state,action)=>{
      state.isLoading = true;
   })
     builder.addMatcher(isAnyOf(fetchCategories.rejected,postCategories.rejected,putCategories.rejected),(state,action)=>{
        state.isLoading = false;
        state.error = action.payload
     })

    }
    
})

// export const {} = categorySlice.actions
export default categorySlice.reducer;