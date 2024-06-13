import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../utils/apiSlice";
import { authSlice } from "../features/authSlice";

export const store = configureStore({
  reducer: {
    auth : authSlice.reducer,
    [apiSlice.reducerPath] : apiSlice.reducer
  }, 
  middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})