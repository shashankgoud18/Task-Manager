import { configureStore } from "@reduxjs/toolkit";
import { authSlice, messageSlice } from "./reducer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    message: messageSlice.reducer,
  },
});

export default store;