import { configureStore } from "@reduxjs/toolkit";
import BoardMembersReducer from './BoardMembersSlice';
import SearchReducer from './SearchBarSlice';
import snackBarReducer from './SnackBarSlice';
import currentUserReducer from './UserProfile';

export const store = configureStore({
    reducer: {
        snackbar: snackBarReducer,
        currentUser: currentUserReducer,
        search: SearchReducer,
        boardMembers: BoardMembersReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch