import { configureStore } from "@reduxjs/toolkit";
import snackBarReducer from './SnackBarSlice'
import SearchReducer from './SearchBarSlice'
import currentUserReducer from './UserProfile'

export const store = configureStore({
    reducer: {
        snackbar: snackBarReducer,
        currentUser: currentUserReducer,
        search: SearchReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch