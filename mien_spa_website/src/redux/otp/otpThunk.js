import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const generateOTP = createAsyncThunk(
    'otp/generateOTP',
    async (data,{rejectWithValue}) => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/javascript",
            },
          };
          
          const response = await api.post("/otp/generateOTP",data,config)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const validateOtp = createAsyncThunk(
    'otp/validateOtp',
    async (data,{rejectWithValue}) => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          
          const response = await api.post("/otp/validateOtp",data,config)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const forgot_password = createAsyncThunk(
    'otp/forgot_password',
    async (data,{rejectWithValue}) => {
      console.log("data",data)
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          
          const response = await api.post("/otp/forgot_password",data,config)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );