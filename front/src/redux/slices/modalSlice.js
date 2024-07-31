import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    showLogin: false,
    showSignup: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.showLogin = action.payload
        },
        setSignup: (state, action) => {
            state.showSignup = action.payload
        },
    },


})

export const {setLogin, setSignup} = modalSlice.actions

export default modalSlice.reducer