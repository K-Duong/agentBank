import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  error: null,
  isSuccessful: false,
  user: {
    firstName:"",
    lastName:""
  }
 }

export const userSlice = createSlice({
  name: "userInfos",
  initialState,
  reducers : {
    // TODO: re-name action type = loadUser, userLoadedSuccessfully, userLoadingFailed, resetUserState
    loadingUser : (state) => {
      state.isLoading = true;
    },
    successUser : (state, action) => {
      state.isLoading = false;
      state.isSuccessful = true;
      state.user = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      }
    }, 
    errorUser: (state, action) => {
      state.error = action.payload.error
    }, 
    resetUser: (state) => {
      return initialState
    }
  }
});

export const {loadingUser, successUser, errorUser, resetUser} = userSlice.actions