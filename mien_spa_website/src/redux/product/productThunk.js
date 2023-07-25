import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchProducts = createAsyncThunk(
    'fetch/product',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.get("/api/Product", data)

          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
  export const fetchProductDetail = createAsyncThunk(
    'fetch/productDetail',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.get(`/api/Product/${data}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
  
export const postProduct = createAsyncThunk(
  "post/service",
  async (data, { rejectWithValue }) => {
    console.log(data);

    try {
      let formData = new FormData();
      const obj = {
        createdAt:data.createdAt,
        category_id: data.category_id,
        // proId: data.proId,
        proBrand: data.proBrand,
        proContent: data.proContent,
        proName: data.proName,
        proPrice: data.proPrice,
        proTurnOn:data.proTurnOn,
        isDelete:data.isDelete
        
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      formData.append("file", data.featureImgPath);
      formData.append("json", JSON.stringify(obj));

      const response = await api.post("/api/Product", formData,config)
      return response.data
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const blockProducts = createAsyncThunk(
  "block/products",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      const dataEdit = {
        ...data.data,
        proTurnOn: data.data.proTurnOn === true ? false : true,
        updatedAt: data.date,
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      formData.append("json", JSON.stringify(dataEdit));
      const response = await api.put(
        `/api/Product/${dataEdit.proId}`,
        formData,
        config
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const deleteProducts = createAsyncThunk(
  "delete/products",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      const dataEdit = { ...data.data, isDelete: true, updatedAt: data.date };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      formData.append("json", JSON.stringify(dataEdit));
      const response = await api.put(
        `/api/Product/${dataEdit.proId}`,
        formData,
        config
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const putProducts = createAsyncThunk(
  "put/products",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data",data);

      let formData = new FormData();
      const dataEdit = {
        proId: data.data.proId,
        category_id: data.data.category_id,
        proBrand: data.data.proBrand,
        proContent: data.data.proContent,
        proName: data.data.proName,
        proPrice: data.data.proPrice,
        proTurnOn: data.data.proTurnOn,
        createdAt: data.data.createdAt,
        isDelete:data.data.isDelete,
        updatedAt: data.date,
      };

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if (typeof data.data.featureImgPath === "string") {
        const dataEditNoImage = { ...dataEdit, featureImgPath: data.data.featureImgPath };
        formData.append("json", JSON.stringify(dataEditNoImage));
      } else {
        formData.append("file", data.data.featureImgPath);

        formData.append("json", JSON.stringify(dataEdit));
      }
      const response = await api.put(
        `/api/Product/${dataEdit.proId}`,
        formData,
        config
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);