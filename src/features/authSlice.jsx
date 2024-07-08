import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  isAuth: false,
  token: null,
  error: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers : {
    logingPending: (state) => {
      state.isLoading = true;
    },
    logingSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuth  = true;
      state.token = action.payload
    },
    logingError: (state, action) => {
      state.isLoading= false;
      state.error = action.payload
    },
    logingOut : (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.token = null;
    }
  }
})

export const { logingPending, logingSuccess, logingError, logingOut} = authSlice.actions;