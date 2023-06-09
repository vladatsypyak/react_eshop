import React from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";

import s from "./filters.module.scss"
import {fetchFilters} from "../../redux/slices/filtersSlice";
import {FiltersItem} from "./FiltersItem";

export const Filters = () => {
    const dispatch = useDispatch()
    const currentCategory = useSelector(store => store.categories.currentCategory)
    const filters = useSelector(store => store.filters.allFilters)

    React.useEffect(() => {
        if (currentCategory.type){
            dispatch(fetchFilters(currentCategory.type))

      }
    }, [currentCategory])


    return <div className={s.filters_wrap}>
        <div className={s.price_range}></div>
        <div className={s.filters}>
            {filters.map(obj=>{
                if (obj.value !== "price"){
                    return <FiltersItem filterName={obj.name} filter={obj.value}/>

                }
            })}
        </div>
    </div>
}