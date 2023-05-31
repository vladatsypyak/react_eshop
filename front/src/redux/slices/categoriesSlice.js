import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchCategories = createAsyncThunk('categories/fetchCategoriesStatus', async (params) => {
    const {data} = await axios.get(`http://localhost:8080/api/app/categories`)
    return data.categories
})
export const fetchCategoryByType = createAsyncThunk("categories/getCategory", async (params)=>{
    const {data} = await axios.get(`http://localhost:8080/api/app/categories/${params}`)
    return data.category
})
export const searchCategories = createAsyncThunk("categories/searchCategories", async (params)=>{
    const {data} = await axios.get(`http://localhost:8080/api/app/categories/search?text=${params}`)
    return data
})

const initialState = {
    categories: [],
    currentCategory: {},
    foundCategories: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        });
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.categories = []
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.categories = []
        });

        builder.addCase(fetchCategoryByType.fulfilled, (state, action) => {
            state.currentCategory = action.payload
        });
        builder.addCase(searchCategories.fulfilled, (state, action) => {
            state.foundCategories = action.payload
        });

    },

})
export const selectCategories = (state) => state.categories

export const {setCategories} = categoriesSlice.actions

export default categoriesSlice.reducer