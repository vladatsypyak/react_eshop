import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchItems = createAsyncThunk('items/fetchItems', async (params) => {
    const {data} = await axios.get(`http://localhost:8080/api/app/items/${params}`)
    console.log(data)
    return data.items
})


const initialState = {
    items: [],
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            console.log(action)
            state.items = action.payload
        });

    },

})

export const {setItems} = itemsSlice.actions

export default itemsSlice.reducer