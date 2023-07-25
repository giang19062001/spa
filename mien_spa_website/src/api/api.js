import axios from "axios";
import { login } from "../redux/auth/authThunk";
import { logout } from "../redux/auth/userReducer";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

});

const accessTokenHoc = (previousAPI) => {
  const innerAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const token = localStorage.getItem("token");
      const res = await api.post(`/login/refreshtoken`, {
        token,
        refreshToken,
      });

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      previousAPI.headers.Authorization = `Bearer ${token}`;
      return api.request(previousAPI);
    } catch (error) {
      throw error;
    }
  };
  return innerAccessToken;
};

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(null, function (error) {
  console.log("error", error);
  if (
    error.config &&
    error.response?.status === 401
    && !error.config.__isRetry
  ) {
    return new Promise((resolve, reject) => {
      const callAccess = accessTokenHoc(error.config);
      callAccess(error.config)
        .then((result) => {
          resolve(console.log("result", result));
        })
        .catch((err) => {
          reject(console.log("err", err));
       
          store.dispatch(logout())
        });
    });
  }
  return Promise.reject(error);
});

export default api;
