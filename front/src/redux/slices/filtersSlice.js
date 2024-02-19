import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {buildURL} from "./itemsSlice";


export const fetchFilters = createAsyncThunk('items/fetchFilters', async (params) => {
    const {data} = await axios.get(`http://localhost:8080/api/categories/${params}/filters`)
    return data
})

export const fetchMaxMinCall = async (params) => {
    const baseUrl = 'http://localhost:8080/api/filters/pricerange';
    let str = buildURL(params, baseUrl)
    const {data} = await axios.get(str)
    return data
};
export const fetchMaxMin = createAsyncThunk('items/getMaxAndMin', async (params) => {
    return await fetchMaxMinCall(params)
})

const initialState = {
    allFilters: [],
    chosenFilters: [],
    searchValue: "",
    sortBy: {
        name: "По даті",
        sortProperty: "date"
    },
    priceRange: [0, Infinity],
    maxAndMin: [0, Infinity]


}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.allFilters = action.payload
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },

        setFilters: (state, action) => {

            let filter = action.payload

            if (state.chosenFilters.some(obj => {
                return obj.name === filter.name && filter.value === obj.value
            })) {
                state.chosenFilters = state.chosenFilters.filter(el => el.name !== action.payload.name || el.value !== action.payload.value)
            } else {
                state.chosenFilters = [...state.chosenFilters, action.payload]
            }

        },
        clearChosenFilters: (state) => {
            state.chosenFilters = []

        },
        // setPriceFilters: (state, action) => {
        //     let filters = state.chosenFilters.filter(obj => obj.name !== action.payload.name)
        //     state.chosenFilters = [...filters, action.payload]
        // },
        deletePriceFilter: (state) => {
            state.chosenFilters = state.chosenFilters.filter(obj => obj.name !== "priceMin" && obj.name !== "priceMax")
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.allFilters = action.payload
        });
        builder.addCase(fetchMaxMin.fulfilled, (state, action) => {
            state.maxAndMin = action.payload
        });
    },


})

export const {
    setItems,
    deletePriceFilter,
    setSearchValue,
    setFilters,
    setSortBy,
    setPriceFilters,
    setPriceRange,
    clearChosenFilters

} = filtersSlice.actions

export default filtersSlice.reducer