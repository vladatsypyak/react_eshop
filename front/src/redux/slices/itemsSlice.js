import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export function buildURL(arr, baseUrl) {
    const queryParams = arr
        .map(obj => `${encodeURIComponent(obj.name)}=${encodeURIComponent(obj.value)}`)
        .join('&');
    return `${baseUrl}?${queryParams}`;
}

const fetchItemsCall = async (params) => {
    const baseUrl = 'http://localhost:8080/api/items';
    let str = buildURL(params, baseUrl)

    const {data} = await axios.get(str)
    console.log(data)
    return data
};
export const fetchItems = createAsyncThunk('items/fetchItems', async (params) => {
    console.log(params)
    return await fetchItemsCall(params)
})
const fetchFavourites = async () => {
    const instance = axios.create({
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("jwt_token")}
    });
    const {data} = await instance.get(`http://localhost:8080/api/favourite/`);
    return data;
};
export const fetchCatalogueItems = createAsyncThunk('items/fetchCatalogueItems', async (params) => {
    return fetchItemsCall(params)
})
export const searchItems = createAsyncThunk('items/searchItems', async (params) => {
    const {data} = await axios.get(`http://localhost:8080/api/items?title=${params.title}&sortBy=${params.sortBy}`)
    return data
})
export const getAllFavourites = createAsyncThunk('items/getAllFavourites', async (params) => {
    return await fetchFavourites()
})
export const putFavourite = createAsyncThunk('items/putFavourite', async (params) => {
    const instance = axios.create({
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("jwt_token")}
    });
    await instance.post(`http://localhost:8080/api/favourite`, params)
    return await fetchFavourites()
})
export const deleteFavourite = createAsyncThunk('items/deleteFavourite', async (params) => {
    const instance = axios.create({
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("jwt_token")}
    });
    await instance.delete(`http://localhost:8080/api/favourite`, {data: params})

    return await fetchFavourites()

})


const initialState = {
    items: [],
    favouriteItems: null,
    foundItems: [],
    catalogueItems: [],
    pageCount: 0,
    page: 1,
    fetched: false
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            if (action.payload) {
                if (action.payload.items?.length > 0) {
                    state.items = action.payload.items
                } else {
                    state.items = []
                }
            }
            state.fetched = true
            state.pageCount = action.payload.pagination?.pageCount
        });
        builder.addCase(searchItems.fulfilled, (state, action) => {
            console.log(action)
            if (action.payload) {
                if (action.payload.items?.length > 0) {
                    state.foundItems = action.payload.items
                } else {
                    state.foundItems = []
                }
            }
            state.fetched = true
            state.pageCount = action.payload.pagination?.pageCount

        });
        builder.addCase(fetchItems.pending, (state, action) => {
            state.fetched = false

        });
        builder.addCase(fetchCatalogueItems.fulfilled, (state, action) => {
            console.log(action.payload)
            if (action.payload) {
                state.catalogueItems = action.payload.items
            } else {
                state.catalogueItems = []
            }
        });
        builder.addCase(fetchCatalogueItems.rejected, (state, action) => {
            state.catalogueItems = []
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

export const {setItems, setPage} = itemsSlice.actions

export default itemsSlice.reducer