import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import topItemsReducer from "./slices/topItemsSlice";
import historyReducer from "./slices/historySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topItems: topItemsReducer,
    history: historyReducer,
  },
});
