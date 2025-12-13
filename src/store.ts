import { configureStore } from "@reduxjs/toolkit";
import { bookAPI } from "./services/bookAPI";
import { writerApi } from "./services/writerAPI";

export const store = configureStore({
    reducer: {
        [bookAPI.reducerPath]: bookAPI.reducer,
        [writerApi.reducerPath]:writerApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookAPI.middleware).concat(writerApi.middleware),
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;