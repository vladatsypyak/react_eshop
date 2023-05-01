import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import categories from "./slices/categoriesSlice";
import items from "./slices/itemsSlice";


export const store = configureStore({
    reducer: {
        categories,
        items
    }
})

export const useAppDispatch = () => useDispatch()