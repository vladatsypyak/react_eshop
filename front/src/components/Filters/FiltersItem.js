import React from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";

import s from "./filters.module.scss"
import {fetchFilters} from "../../redux/slices/filtersSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const FiltersItem = ({filter}) => {
    console.log(filter)
    const dispatch = useDispatch()
    const currentCategory = useSelector(store => store.categories.currentCategory)
    React.useEffect( () => {
        const getFilterValues =  async  ()=>{
            console.log(currentCategory)
            const {data} = await axios.get(`http://localhost:8080/api/app/filters/${currentCategory.type}/${filter}`)
            console.log(data)
            return data
        }
        if(filter === "country"){
            console.log(1)
            getFilterValues()
        }

    }, [])


    return <div className={s.filtersItem_wrap}>

    </div>
}