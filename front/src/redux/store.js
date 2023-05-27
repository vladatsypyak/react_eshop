import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import categories from "./slices/categoriesSlice";
import items from "./slices/itemsSlice";
import filters from "./slices/filtersSlice";
import cart from "./slices/cartSlice";


export const store = configureStore({
    reducer: {
        categories,
        items,
        filters,
        cart
    }
})

export const useAppDispatch = () => useDispatch()