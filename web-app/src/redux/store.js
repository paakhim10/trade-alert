import { configureStore } from "@reduxjs/toolkit";
import { setUser } from "./slices/userSlice.js";

const store = configureStore({
  reducer: {
    user: setUser,
  },
});

export default store;
