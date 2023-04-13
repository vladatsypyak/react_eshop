import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import categories from "./slices/categoriesSlice";

export const store = configureStore({
    reducer: {
        categories
    }
})

export const useAppDispatch = () => useDispatch()