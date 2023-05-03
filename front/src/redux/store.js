import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import categories from "./slices/categoriesSlice";
import items from "./slices/itemsSlice";
import filters from "./slices/filtersSlice";


export const store = configureStore({
    reducer: {
        categories,
        items,
        filters
    }
})

export const useAppDispatch = () => useDispatch()