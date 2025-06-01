import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShortendUser } from "@src/types/UserProfile";

const initialState: ShortendUser[] = []

const BoardMembersSlice = createSlice({
    name: 'BoardMembers',
    initialState,
    reducers: {
        setBoardMembers: (_, action: PayloadAction<ShortendUser[]>) => {
            return action.payload
        }
    }
})

export default BoardMembersSlice.reducer
export const { setBoardMembers } = BoardMembersSlice.actions