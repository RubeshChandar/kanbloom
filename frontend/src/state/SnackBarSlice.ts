import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SnackbarState = {
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning',
    open?: boolean
}

const initialState: SnackbarState = {
    message: '',
    severity: 'info',
    open: false
}

const SnackBarSlice = createSlice({
    name: "snacks",
    initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<SnackbarState>) => {
            state.message = action.payload.message;
            state.severity = action.payload.severity;
            state.open = true
        },

        hideSnackbar: (state) => {
            state.open = false
        }
    }
})


export const { showSnackbar, hideSnackbar } = SnackBarSlice.actions
export default SnackBarSlice.reducer