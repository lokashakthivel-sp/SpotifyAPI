import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import topItemsReducer from "./slices/topItemsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topItems: topItemsReducer,
  },
});
