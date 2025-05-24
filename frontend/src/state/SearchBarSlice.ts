import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = "";

const SearchBarSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (_, action: PayloadAction<string>) => action.payload
    }
})


export const { setSearchTerm } = SearchBarSlice.actions;
export default SearchBarSlice.reducer