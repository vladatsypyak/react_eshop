import React from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";

import s from "./filters.module.scss"
import {fetchFilters} from "../../redux/slices/filtersSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const FiltersItem = ({filter, filterName}) => {
    const [values, setValues] = React.useState([])
    console.log(filter)
    const dispatch = useDispatch()
    const currentCategory = useSelector(store => store.categories.currentCategory)
    React.useEffect( () => {
        const getFilterValues =  async  ()=>{
            const {data} = await axios.get(`http://localhost:8080/api/app/filters/${currentCategory.type}/${filter}`)
            console.log(data)
            return data
        }

            getFilterValues().then(res =>setValues(res))


    }, [])


    return <div className={s.filtersItem_wrap}>
        <p className={s.title}>{filterName}</p>
        {values.map(el=>{
            return <div className={s.filter_values}>
                <input type="checkbox"/>
                <p>{el}</p>
            </div>
        })}
    </div>
}