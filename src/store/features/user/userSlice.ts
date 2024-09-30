import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {UserTypeQL} from "../../../types/UserTypes.tsx";

export interface userState {
    user: userStateObj
}

export interface userStateObj {
    name: string | null,
    email: string | null
    token: string | null
    account: string | null
    offers: number | null,
    device_name:string | null
}

const initialState: userState = {
    user:{
        name: null,
        email: null,
        token: null,
        account: null,
        offers:  0,
        device_name:null
    }



}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<UserTypeQL>) => {
            state.user.name = action.payload.name
            state.user.email = action.payload.email
            state.user.token = action.payload.token
            state.user.account = action.payload.account
            state.user.offers = action.payload.offers
            state.user.device_name = action.payload.device_name
        },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
        setLogout: (state: userState) => {
            state.user = {
                name: null,
                email: null,
                token: null,
                account: null,
                offers: 0,
                device_name:null
            }
        },
    }
})

// Action creators are generated for each case reducer function
export const { setUserDetails, setLogout } = userSlice.actions

export default userSlice.reducer
