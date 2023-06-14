import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import categories from "./slices/categoriesSlice";
import items from "./slices/itemsSlice";
import filters from "./slices/filtersSlice";
import cart from "./slices/cartSlice";
import user from "./slices/userSlice";



export const store = configureStore({
    reducer: {
        categories,
        items,
        filters,
        cart,
        user
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const useAppDispatch = () => useDispatch()