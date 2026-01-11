import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import topItemsReducer from "./slices/topItemsSlice";
import historyReducer from "./slices/historySlice";
import roastReducer from "./slices/roastSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    topItems: topItemsReducer,
    history: historyReducer,
    roast: roastReducer,
  },
});
