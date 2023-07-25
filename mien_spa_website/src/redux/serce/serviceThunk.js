import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchServices = createAsyncThunk(
  "fetch/services",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/Serce", data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const blockServices = createAsyncThunk(
  "block/services",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      const dataEdit = {
        ...data.data,
        seTurnOn: data.data.seTurnOn === true ? false : true,
        updatedAt: data.date,
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      formData.append("json", JSON.stringify(dataEdit));
      const response = await api.put(
        `/api/Serce/${dataEdit.seId}`,
        formData,
        config
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const deleteServices = createAsyncThunk(
  "delete/services",
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
        `/api/Serce/${dataEdit.seId}`,
        formData,
        config
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const putServices = createAsyncThunk(
  "put/services",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      const dataEdit = {
        seId: data.data.seId,
        seName: data.data.seName,
        sePrice: data.data.sePrice,
        seDescription: data.data.seDescription,
        seNote: data.data.seNote,
        seTurnOn: data.data.seTurnOn,
        isDelete: data.data.isDelete,
        createdAt: data.data.createdAt,
        updatedAt: data.date,
      };

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if (typeof data.data.seImage === "string") {
        const dataEditNoImage = { ...dataEdit, seImage: data.data.seImage };
        formData.append("json", JSON.stringify(dataEditNoImage));
      } else {
        formData.append("file", data.data.seImage);

        formData.append("json", JSON.stringify(dataEdit));
      }
      const response = await api.put(
        `/api/Serce/${dataEdit.seId}`,
        formData,
        config
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const postService = createAsyncThunk(
  "post/service",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      const obj = {
        createdAt: data.createdAt,
        // seId: data.seId,
        seName: data.seName,
        sePrice: data.sePrice,
        seDescription: data.seDescription,
        seNote: data.seNote,
        seTurnOn: data.seTurnOn,
        isDelete: data.isDelete,
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      formData.append("file", data.seImage);
      formData.append("json", JSON.stringify(obj));

      const response = await api.post("/api/Serce", formData, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
