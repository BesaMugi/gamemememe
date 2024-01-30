import { configureStore } from "@reduxjs/toolkit";
import resourceSlice from "../reducer/resourceSlice.jsx";
import application from "../reducer/applicationSlice.jsx";
import userSlice from "../reducer/userSlice.jsx";

export const store = configureStore({
  reducer: {
    resources: resourceSlice,
    application,
    users: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
