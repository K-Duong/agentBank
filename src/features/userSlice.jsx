import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  error: null,
  user: {
    firstName:"",
    lastName:""
  }
 }

export const userSlice = createSlice({
  name: "userInfos",
  initialState,
  reducers : {
    loadUser : (state) => {
      state.isLoading = true;
    },
    userLoadedSuccessfully : (state, action) => {
      state.isLoading = false;
      state.user = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      }
    }, 
    userLoadingFailed: (state, action) => {
      state.error = action.payload.error
    }, 
    resetUserState: () => initialState
  }
});

export const {loadUser, userLoadedSuccessfully, userLoadingFailed, resetUserState} = userSlice.actions