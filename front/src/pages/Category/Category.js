import React from "react";
import {Filters} from "../../components/Filters/Filters";
import {Items} from "../../components/Items/Items";
import s from "./category.module.scss"
import {Sort} from "../../components/Sort/Sort";
import {fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchItems, setPage} from "../../redux/slices/itemsSlice";
import {Pagination} from "../../components/Pagination/Pagination";


export const Category = () => {
    const {category} = useParams()
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.items)
    const currentChosenFilters = useSelector(state => state.filters.chosenFilters)
    const sortBy = useSelector(state => state.filters.sortBy)
    const priceRange = useSelector(state => state.filters.priceRange)
    const page = useSelector(state => state.items.page)


    React.useEffect(() => {
        dispatch(fetchCategoryByType(category))
        dispatch(setPage(1))
    }, [])

    React.useEffect(() => {
        let priceMin = {name: "priceMin", value: priceRange[0]}
        let priceMax = {name: "priceMax", value: priceRange[1]}
        let pageQuery = {name: "page", value: page}

        dispatch(fetchItems([...currentChosenFilters, {name: "category", value: category}, {
            name: "sortBy",
            value: sortBy.sortProperty
        }, priceMin, priceMax, pageQuery]))
    }, [currentChosenFilters, sortBy, priceRange, category, page])

    return <div className={`${s.category_page_wrap} container`}>
       <div className={s.flex_wrap}>
           <Filters/>
           <Items items={items}/>
           <Sort/>
       </div>
        <Pagination/>
    </div>

}