import { configureStore } from "@reduxjs/toolkit";
import regionReducer from "./slices/regionSlice";

export const store = configureStore({
    reducer: {
        region: regionReducer.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;