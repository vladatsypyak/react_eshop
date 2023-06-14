import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

const fetchUser = async (params) => {
    const instance = axios.create({
        headers: {'Authorization': 'Bearer ' + params}
    });

    const {data} = await instance.get('http://localhost:8080/api/user/users/me')
    return data.user
}

export const registerUser = createAsyncThunk('items/registerUser', async (params) => {
    console.log(params)
    await axios.post(`http://localhost:8080/api/user/auth/register`, params)
})


export const loginUser = createAsyncThunk('items/loginUser', async (params) => {
    let {data} = await axios.post(`http://localhost:8080/api/user/auth/login`, params)
    sessionStorage.setItem('jwt_token', data.jwt_token)
    return fetchUser(data.jwt_token)

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
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.user = action.payload


        });

    },

})

export const {setItems, setTotal} = userSlice.actions

export default userSlice.reducer