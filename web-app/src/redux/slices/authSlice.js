import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    registerationStage: null,
    isLogin: false,
  },
  reducers: {},
  extraReducers: {},
});
