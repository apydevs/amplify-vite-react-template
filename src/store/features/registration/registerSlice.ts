import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface accountState {
    name: string
    email:string
    accountType: number
    phone:string
    password:string
    confirm:string,
    company:string | null
    companyType:string | null
}

const initialState: accountState = {
    name: '',
    email:'',
    accountType: 1,
    phone:'',
    password:'',
    confirm:'',
// sellers
    company:'',
    companyType:''

}



export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        name: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        email: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        accountType: (state, action: PayloadAction<number>) => {
            state.accountType = action.payload
        },
        phone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload
        },
        password: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        confirm: (state, action: PayloadAction<string>) => {
            state.confirm = action.payload
        },

        company: (state, action: PayloadAction<string>) => {
            state.company = action.payload
        },

        companyType: (state, action: PayloadAction<string>) => {
            state.companyType = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { name,email,accountType,phone,password,confirm ,company,companyType} = registerSlice.actions

export default registerSlice.reducer
