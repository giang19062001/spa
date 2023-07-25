import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const month = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export const fetchOrderByWeek = createAsyncThunk(
  "fetchOrderByWeek/order",
  async (data, { rejectWithValue }) => {
    try {
      const arrOrder = [];
      for (let index = 0; index < 7; index++) {
        const resPro = await api.get(
          `/api/OrdersPro/UpdateDate/${
            new Date(data[index]).getFullYear() +
            "-" +
            String(month[new Date(data[index]).getUTCMonth()]).padStart(
              2,
              "0"
            ) +
            "-" +
            String(
              new Date(data[index]).getDate(
                new Date(data[index]).setDate(
                  new Date(data[index]).getDate() + 1
                )
              )
            ).padStart(2, "0")
          }`
        );

        const resSer = await api.get(
          `/api/OrdersSer/UpdateDate/${
            new Date(data[index]).getFullYear() +
            "-" +
            String(month[new Date(data[index]).getUTCMonth()]).padStart(
              2,
              "0"
            ) +
            "-" +
            String(
              new Date(data[index]).getDate(
                new Date(data[index]).setDate(
                  new Date(data[index]).getDate() + 1
                )
              )
            ).padStart(2, "0")
          }`
        );
        arrOrder.push({
          date:
          new Date(data[index]).getFullYear() +
            "-" +
            String(month[new Date(data[index]).getUTCMonth()]).padStart(
              2,
              "0"
            ) +
            "-" +
            String(
              new Date(data[index]).getDate(
                new Date(data[index]).setDate(
                  new Date(data[index]).getDate() + 1
                )
              )
            ).padStart(2, "0"),
          total:
            resPro.data?.reduce(
              (preValue, currentValue) => preValue + currentValue.orProTotal,
              0
            ) +
            resSer.data?.reduce(
              (preValue, currentValue) => preValue + currentValue.orSer_Total,
              0
            ),
        });
      }
      return arrOrder
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchOrderProByDate = createAsyncThunk(
  "fetchByDate/orderPro",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/OrdersPro/UpdateDate/${data}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const postOrderPro = createAsyncThunk(
  "post/orderPro",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/OrdersPro", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const putOrderPro = createAsyncThunk(
  "put/orderPro",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await api.put(`/api/OrdersPro/${data.orProId}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchOrderPro = createAsyncThunk(
  "fetch/orderProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/OrdersPro");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchOrderProByUser = createAsyncThunk(
  "fetch/orderProduct/userId",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/OrdersPro/User/${data}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchOrderProDetail = createAsyncThunk(
  "fetch/orderProduct/detail",
  async (data, { rejectWithValue }) => {
    try {
      const arr = [];

      await api.get(`/api/OrderProDetail/${data.id}`).then((res) => {
        res.data.forEach((element) => {
          arr.push({
            product: data.listProduct.find(
              (item) => item.proId === element.ordProProductId
            ),
            quantity: element.ordProQuantity,
          });
        });
      });

      return arr;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
