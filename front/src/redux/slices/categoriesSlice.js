import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchCategories = createAsyncThunk('categories/fetchCategoriesStatus', async (params) => {
    console.log(221)

    const {data} = await axios.get(`http://localhost:8080/api/app/categories`)
    console.log(data)
    console.log(5)
    return data.categories
})

const initialState = {
   categories: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
    },
    extraReducers: (builder)=> {

        builder.addCase(fetchCategories.fulfilled, (state, action)=>{
            console.log(5)
            state.categories = action.payload


        });
        builder.addCase(fetchCategories.pending, (state, action)=>{
            state.categories = []


        });
        builder.addCase(fetchCategories.rejected, (state, action)=>{
            state.categories = []
        });
    },

})
export const selectCategories = (state)=> state.categories

export const {setCategories} = categoriesSlice.actions

export default categoriesSlice.reducer