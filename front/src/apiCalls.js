import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFilters = createAsyncThunk('items/fetchFilters', async (params) => {
    const {data} = await axios.get(`https://react-eshop-9tge.onrender.com/api/app/filters/${params}`)
    return data
})