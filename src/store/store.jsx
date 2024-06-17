import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../utils/apiSlice";
import { authSlice } from "../features/authSlice";
import { userSlice } from "../features/userSlice";

export const store = configureStore({
  reducer: {
    auth : authSlice.reducer,
    user : userSlice.reducer,
    [apiSlice.reducerPath] : apiSlice.reducer
  }, 
  middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})