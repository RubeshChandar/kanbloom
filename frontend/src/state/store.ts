import { configureStore } from "@reduxjs/toolkit";
import snackBarReducer from './SnackBarSlice'

export const store = configureStore({
    reducer: {
        snackbar: snackBarReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch