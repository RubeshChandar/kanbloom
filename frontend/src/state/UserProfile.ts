import { UserProfile } from "../types/UserProfile";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from "../api";

type currentUserState = {
    isLoading: boolean,
    error: string | null,
    currentUser: UserProfile | null,
}

const initialState: currentUserState = {
    isLoading: false,
    currentUser: null,
    error: null,
}

export const fetchCurrentUserProfile = createAsyncThunk(
    'currentUser/fetchProfile',
    async (userID: string) => {
        const response = await api.get(`user/user-profiles/${userID}/`)
        return response.data
    }
)

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        clearCurrentUser: (state) => {
            state.currentUser = null;
            state.error = null;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUserProfile.fulfilled,
                (state, action: PayloadAction<UserProfile>) => {
                    state.isLoading = false;
                    state.currentUser = action.payload;
                })
            .addCase(fetchCurrentUserProfile.pending,
                (state) => {
                    state.isLoading = true;
                    state.currentUser = null;
                }
            )
    },
})

export default currentUserSlice.reducer
export const { clearCurrentUser } = currentUserSlice.actions
