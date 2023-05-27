import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

const fetchCartItems = async (userId) => {
    const {data} = await axios.get(`http://localhost:8080/api/app/cart/${userId}`);
    console.log(data)
    return data;
};

export const putToCart = createAsyncThunk('items/putToCart', async (params) => {
    await axios.post(`http://localhost:8080/api/app/cart`, params)
    return await fetchCartItems(params.userId)
})

export const getAllCartItems = createAsyncThunk('items/getAllCartItems', async (params) => {
    return await fetchCartItems(params.userId)
})

// export const deleteFavourite = createAsyncThunk('items/deleteFavourite', async (params) => {
//     await axios.delete(`http://localhost:8080/api/app/favourite`, {data: params})
//     return await fetchFavourites(params.userId)
//
// })

const initialState = {
    items: [],
    total: 0,


}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },



    },
    extraReducers: (builder) => {
        builder.addCase(putToCart.fulfilled, (state, action) => {
            state.items = action.payload
        });
        builder.addCase(getAllCartItems.fulfilled, (state, action) => {
            state.items = action.payload
        });
    },

})

export const {setItems} = cartSlice.actions

export default cartSlice.reducer