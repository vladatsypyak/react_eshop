import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";



export const registerUser = createAsyncThunk('items/registerUser', async (params) => {
    console.log(params)
    await axios.post(`http://localhost:8080/api/user/auth/register`, params)
})


const initialState = {
    user: {},


}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },




    },
    // extraReducers: (builder) => {
    //     builder.addCase(putToCart.fulfilled, (state, action) => {
    //         state.items = action.payload
    //     });
    //
    // },

})

export const {setItems, setTotal} = userSlice.actions

export default userSlice.reducer