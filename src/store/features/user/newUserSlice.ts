import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userStateObj {
    fullName: string,
    email: string
    accountType: string | null
    companyName: string | null
    companyType: string | null
}

const initialState:  userStateObj= {
    fullName: '',
    email: '',
    accountType: '',
    companyName: '',
    companyType: '',



}

export const newUserSlice = createSlice({
    name: 'newUser',
    initialState,
    reducers: {


        setFullName: (state, action: PayloadAction<string>) => {
            state.fullName = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },

        setCompanyName: (state, action: PayloadAction<string>) => {
            state.companyName = action.payload;
        },

        setAccountType: (state, action: PayloadAction<string>) => {
            state.accountType = action.payload;
        },
        setCompanyType: (state, action: PayloadAction<string>) => {
            state.companyType = action.payload;
        },


    }
})

// Action creators are generated for each case reducer function
export const { setFullName,setEmail,setAccountType,setCompanyName,setCompanyType } = newUserSlice.actions

export default newUserSlice.reducer