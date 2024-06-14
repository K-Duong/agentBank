import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  transactions: []
}

const userSlice = createSlice({
  name: "userInfos",
  
})