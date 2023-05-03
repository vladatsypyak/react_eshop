import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchFilters = createAsyncThunk('items/fetchFilters', async (params) => {
    const {data} = await axios.get(`http://localhost:8080/api/app/filters/${params}`)
    console.log(data)
    return data
})


const initialState = {
    allFilters: [],

}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.allFilters = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            console.log(action)
            state.allFilters = action.payload
        });

    },

})

export const {setItems} = filtersSlice.actions

export default filtersSlice.reducer