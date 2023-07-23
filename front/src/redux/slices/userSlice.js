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
export const getUser = createAsyncThunk('items/getUser', async (params) => {
    return fetchUser(params)
})


export const loginUser = createAsyncThunk('items/loginUser', async (params) => {
    let {data} = await axios.post(`http://localhost:8080/api/user/auth/login`, params)
    sessionStorage.setItem('jwt_token', data.jwt_token)
    return fetchUser(data.jwt_token)

})

export const editProfile = createAsyncThunk('items/editProfile', async (params) => {
    console.log(params)
    const instance = axios.create({


        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("jwt_token")}
    });
    const headers =  {'Authorization': 'Bearer ' + sessionStorage.getItem("jwt_token")}
    let {data} = await axios.patch(`http://localhost:8080/api/user/users/me/edit`, params,{headers} )
    return fetchUser(sessionStorage.getItem("jwt_token"))

})

const initialState = {
    user: {},
    isError: false,

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state, action) => {
            state.user = {}
            sessionStorage.clear()
        }



    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.user = action.payload
            state.isError = false

        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.user = action.payload

        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isError = true

        });
        builder.addCase(editProfile.fulfilled, (state, action) => {
            state.user = action.payload

        });

    },

})

export const {setItems, setTotal, logout} = userSlice.actions

export default userSlice.reducer