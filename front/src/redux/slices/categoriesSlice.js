import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {useDispatch} from "react-redux";
import {setPage} from "./itemsSlice";
import {apiUrl} from "../../../config";

export const fetchCategories = createAsyncThunk('categories/fetchCategoriesStatus', async (params) => {
    const {data} = await axios.get(`${apiUrl}/api/categories`)
    return data.categories
})
export const fetchCategoryByType = createAsyncThunk("categories/getCategory", async (params)=>{
    const {data} = await axios.get(`${apiUrl}/api/categories/${params}`)
    return data.category
})
export const searchCategories = createAsyncThunk("categories/searchCategories", async (params)=>{
    const {data} = await axios.get(`${apiUrl}/api/categories/?text=${params}`)
    return data.categories
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
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload
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

export const {setCategories, setCurrentCategory} = categoriesSlice.actions

export default categoriesSlice.reducer