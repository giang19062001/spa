import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";





export const fetchOrderSerByDate = createAsyncThunk(
  "fetchByDate/orderSer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/OrdersSer/UpdateDate/${data}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const postOrderSer = createAsyncThunk(
  "post/orderSer",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await api.post("/api/OrdersSer", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const putOrderSer = createAsyncThunk(
  "put/orderSer",
  async (data, { rejectWithValue }) => {
    try {
      const dataFinal = {
        createdAt:data.createdAt,
        updatedAt:data.updatedAt,
        orSerEndTime:data.orSerEndTime,
        orSerStartTime:data.orSerStartTime,
        orSerId:data.orSerId,
        orSerPhoneNo:data.orSerPhoneNo, 
        orSerUserId:data.orSerUserId,
        orSerStatus:data.orSerStatus,
        orSer_Total:data.orSer_Total
      }
    

      const response = await api.put(`/api/OrdersSer/${data.orSerId}`,dataFinal);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchOrderSer = createAsyncThunk(
  "fetch/orderSer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/OrdersSer");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchOrderSerByUser = createAsyncThunk(
  "fetch/orderSer/userId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/OrdersSer/User/${data}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchOrderSerById = createAsyncThunk(
  "fetch/orderSer/id",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/OrdersSer/${data}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchOrderSerDetail = createAsyncThunk(
  "fetch/orderSer/detail",
  async (data, { rejectWithValue }) => {
    try {
      const ser = [];

      data?.data?.listSerId.forEach((element) => {
        ser.push(data.listServices.find((item) => item.seId === element));
      });

      const result = { services: ser, order: data.data };

      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
