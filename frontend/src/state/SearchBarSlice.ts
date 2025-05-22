import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = "";

const SearchBarSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSearchTerm: () => "",
        setSearchTerm: (_, action: PayloadAction<string>) => action.payload
    }
})


export const { clearSearchTerm, setSearchTerm } = SearchBarSlice.actions;
export default SearchBarSlice.reducer