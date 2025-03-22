// import { configureStore } from "@reduxjs/toolkit";
// import appointmentReducer from "./slices/appointmentSlice";
// import regionReducer from "./slices/regionSlice";
// export const store = configureStore({
//     reducer: {
//         region: regionReducer.reducer,
//         appointment: appointmentReducer,
//     },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appointmentReducer from "./slices/appointmentSlice";
import regionReducer from "./slices/regionSlice";
const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    appointment: appointmentReducer,
    region: regionReducer.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;