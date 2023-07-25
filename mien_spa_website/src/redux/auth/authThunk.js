import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/api";
import { Buffer } from "buffer";
import { convertBase64 } from "../../util/custom";

//role
export const fetchAllRole = createAsyncThunk(
  "role/getAll",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/Role`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const postRole = createAsyncThunk(
  "post/role",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/UserRole", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const changePassword = createAsyncThunk(
  "change/password",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await api.put("/api/UserChangePassword", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {

      const responseAuth = await api.post("/login/signin", data.dataLogin);

      localStorage.setItem("token", responseAuth.data.accessToken);
      localStorage.setItem("refreshToken", responseAuth.data.refreshToken);

      const responseUser = await api.get(`/api/Users/${responseAuth.data.id}`);

      const objUser = { ...responseAuth.data, ...responseUser.data };

      return objUser;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const obj = {email:data.email,password:data.password,username:data.username}
      
      const response = await api.post("/login/signup", obj);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchAllUser = createAsyncThunk(
  "fetch/allUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/Users", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "update/user",
  async (data, { rejectWithValue }) => {
    try {
      let formData = new FormData();
      const obj = {
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        usId: data.usId,
        usUserName: data.usUserName,
        usPassword: null,
        usDob: data.usDob,
        usAddress: data.usAddress,
        usPhoneNo: data.usPhoneNo,
        usEmailNo: data.usEmailNo,
        usNote: data.usNote,
        isAdmin: false,
        isDelete: data.isDelete,
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      console.log("typeof data.usImage", typeof data.usImage);
      if (typeof data.usImage === "object") {
        formData.append("file", data.usImage);
        formData.append("data_json", JSON.stringify(obj));
      } else {
        const responseUser = await api.get(`/api/Users/${data.usId}`);
        formData.append(
          "data_json",
          JSON.stringify({ ...obj, usImage: responseUser.data.usImage })
        );
      }

      const response = await api.put(`/api/Users`, formData, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "update/password",
  async (data, { rejectWithValue }) => {
    console.log("data", data);

    try {
      let formData = new FormData();
      const obj = {
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        usId: data.usId,
        usUserName: data.usUserName,
        usPassword: data.usPassword,
        usDob: data.usDob,
        usAddress: data.usAddress,
        usPhoneNo: data.usPhoneNo,
        usEmailNo: data.usEmailNo,
        usNote: data.usNote,
        isAdmin: false,
        isDelete: data.isDelete,
      };
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      console.log("typeof data.usImage", typeof data.usImage);
      if (typeof data.usImage === "object") {
        formData.append("file", data.usImage);
        formData.append("data_json", JSON.stringify(obj));
      } else {
        const responseUser = await api.get(`/api/Users/${data.usId}`);
        formData.append(
          "data_json",
          JSON.stringify({ ...obj, usImage: responseUser.data.usImage })
        );
      }

      const response = await api.put(`/api/Users`, formData, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "fetch/userById",
  async (data, { rejectWithValue }) => {
    try {
      const responseUser = await api.get(`/api/Users/${data}`);
      if (responseUser.data.usImage === null) {
        return responseUser.data;
      } else {
        const response = await api.get(
          `/image/user/${responseUser.data.usImage}`
        );
        const base64Response = await fetch(
          `data:image/jpeg;base64,${response.data}`
        );
        const blob = await base64Response.blob();
        const base64 = await convertBase64(blob);
        const result = { ...responseUser.data, usImage: base64 };
        return result;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUserByIdAdmin = createAsyncThunk(
  "fetch/userByIdAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const responseUser = await api.get(`/api/Users/${data}`);
      if (responseUser.data.usImage === null) {
        return responseUser.data;
      } else {
        const response = await api.get(
          `/image/user/${responseUser.data.usImage}`
        );
        const base64Response = await fetch(
          `data:image/jpeg;base64,${response.data}`
        );
        const blob = await base64Response.blob();
        const base64 = await convertBase64(blob);
        const result = { ...responseUser.data, usImage: base64 };
        return result;
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
