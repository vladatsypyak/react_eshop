import React from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


import s from "./filters.module.scss"
import {setFilters} from "../../redux/slices/filtersSlice";

import axios from "axios";
import {fetchItems} from "../../redux/slices/itemsSlice";
import {logDOM} from "@testing-library/react";
import {store} from "../../redux/store";

export const FiltersItem = ({filter, filterName}) => {
    const currentChosenFilters = useSelector(state => state.filters.chosenFilters)

    const [values, setValues] = React.useState([])

    const dispatch = useDispatch()
    const currentCategory = useSelector(store => store.categories.currentCategory)
    React.useEffect(() => {
        const getFilterValues = async () => {

            const {data} = await axios.get(`http://localhost:8080/api/app/filters/${currentCategory.type}/${filter}`)
            return data
        }
        getFilterValues().then(res => setValues(res))
    }, [filter])
    React.useEffect(() => {
        console.log(currentChosenFilters)
        dispatch(fetchItems([...currentChosenFilters, {name: "category", value: currentCategory.type}]))

    }, [currentChosenFilters])

    const handleFilterChange = (e) => {
        dispatch(setFilters({name: filter, value: e.target.value}))
    }


    return <div className={s.filtersItem_wrap}>
        <p className={s.title}>{filterName}</p>
        {values.map(el => {
            return <div className={s.filter_values}>
                <input onChange={handleFilterChange} type="checkbox" value={el}/>
                <p>{el}</p>
            </div>
        })}
    </div>
}