import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {UserType} from "../../../types/UserTypes.tsx";

export interface userState {
    user: userStateObj
}

export interface userStateObj {
    userId: number | string | null,
    username: string | null
}

const initialState: userState = {
    user:{
        userId: null,
        username: null
    }



}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<UserType>) => {
            state.user.userId = action.payload.userId
            state.user.username = action.payload.username
        },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions

export default userSlice.reducer