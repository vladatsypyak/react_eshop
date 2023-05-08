import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
function buildURL(arr) {
    const baseUrl = 'http://localhost:8080/api/app/items/filter';

    const queryParams = arr
        .map(obj => `${encodeURIComponent(obj.name)}=${encodeURIComponent(obj.value)}`)
        .join('&');

    return `${baseUrl}?${queryParams}`;
}



export const fetchItems = createAsyncThunk('items/fetchItems', async (params) => {
    // const {data} = await axios.get(`http://localhost:8080/api/app/items/${params}`)

    let str = buildURL(params)
    console.log(str)
    const {data } = await axios.get(str)

    return data
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

            if(action.payload){
                state.items = action.payload
            }

        });

    },

})

export const {setItems} = itemsSlice.actions

export default itemsSlice.reducer