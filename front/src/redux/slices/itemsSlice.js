import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

function buildURL(arr) {
    const baseUrl = 'http://localhost:8080/api/app/items/filter';

    const queryParams = arr
        .map(obj => `${encodeURIComponent(obj.name)}=${encodeURIComponent(obj.value)}`)
        .join('&');


    return `${baseUrl}?${queryParams}`;
}

const fetchFavourites = async (userId) => {
    const {data} = await axios.get(`http://localhost:8080/api/app/favourite/${userId}`);
    return data;
};


export const fetchItems = createAsyncThunk('items/fetchItems', async (params) => {
    let str = buildURL(params)
    const {data} = await axios.get(str)
    return data
})
export const searchItems = createAsyncThunk('items/searchItems', async (params) => {
    const {data} = await axios.get(`http://localhost:8080/api/app/items/search?title=${params.title}&sortBy=${params.sortBy}`)
    console.log(data)
    return data
})
export const getAllFavourites = createAsyncThunk('items/getAllFavourites', async (params) => {
    return await fetchFavourites(params.userId)
})
export const putFavourite = createAsyncThunk('items/putFavourite', async (params) => {
    await axios.post(`http://localhost:8080/api/app/favourite`, params)
    return await fetchFavourites(params.userId)
})
export const deleteFavourite = createAsyncThunk('items/deleteFavourite', async (params) => {
    await axios.delete(`http://localhost:8080/api/app/favourite`, {data: params})
    return await fetchFavourites(params.userId)

})


const initialState = {
    items: [],
    favouriteItems: [],
    foundItems: []
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

            if (action.payload) {
                state.items = action.payload
            }

        });
        builder.addCase(searchItems.fulfilled, (state, action) => {
            console.log(action)
            if (action.payload) {
                state.foundItems = action.payload
            }

        });
        builder.addCase(putFavourite.fulfilled, (state, action) => {
            state.favouriteItems = action.payload

        });
        builder.addCase(deleteFavourite.fulfilled, (state, action) => {
            state.favouriteItems = action.payload

        });
        builder.addCase(getAllFavourites.fulfilled, (state, action) => {
            state.favouriteItems = action.payload

        });

    },

})

export const {setItems} = itemsSlice.actions

export default itemsSlice.reducer