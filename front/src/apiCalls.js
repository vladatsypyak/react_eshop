import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFilters = createAsyncThunk('items/fetchFilters', async (params) => {
    const {data} = await axios.get(`http://localhost:8080/api/app/filters/${params}`)
    return data
})