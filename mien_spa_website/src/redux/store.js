import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from "redux";
import { persistStore } from "redux-persist";
import cateReducer from './category/cateReducer';
import productReducer from './product/productReducer';
import serviceReducer from './serce/serviceReducer';
import userReducer from './auth/userReducer';
import orderProReducer from './orderPro/orderReducer';
import orderSerReducer from './orderSer/orderReducer';
import otpReducer from './otp/otpReducer';

const rootReducer = combineReducers({
    serviceReducer,
    cateReducer,
    productReducer,
    userReducer,
    orderProReducer,
    orderSerReducer,
    otpReducer
    
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["userReducer","productReducer","serviceReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),

})

export const persistor = persistStore(store);
