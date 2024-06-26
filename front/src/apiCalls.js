import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {apiUrl} from "./config";

export const fetchFilters = createAsyncThunk('items/fetchFilters', async (params) => {
    const {data} = await axios.get(`${apiUrl}/api/app/filters/${params}`)
    return data
})