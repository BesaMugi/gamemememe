import { configureStore } from "@reduxjs/toolkit";
import resourceSlice from "../reducer/resourceSlice.jsx";

export const store = configureStore({
  reducer: {
    resources: resourceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
