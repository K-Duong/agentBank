import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  isAuth: false,
  // TODO: à voir mais pas besoin de le projet (à préparer dans la soutenance)
  isRemember: false,
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
    logingRemember : (state, action) => {
      state.isRemember = action.payload;
    },
    logingOut : (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.token = null;
    }
  }
})

export const { logingPending, logingSuccess, logingError, logingRemember, logingOut} = authSlice.actions;