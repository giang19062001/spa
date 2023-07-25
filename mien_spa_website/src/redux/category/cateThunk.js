import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';


export const fetchCategories = createAsyncThunk(
    'fetch/category',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.get("/api/Category", data)

          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const postCategories = createAsyncThunk(
    'post/category',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.post("/api/Category", data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
  export const putCategories = createAsyncThunk(
    'put/category',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.put(`/api/Category/${data.cateId}`, data)
           
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

