import React from "react";
import {Filters} from "../../components/Filters/Filters";
import {Items} from "../../components/Items/Items";
import s from "./category.module.scss"
import {Sort} from "../../components/Sort/Sort";
import {fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchItems} from "../../redux/slices/itemsSlice";


export const Category = () => {
    const {category} = useParams()
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.items)
    const currentChosenFilters = useSelector(state => state.filters.chosenFilters)
    const sortBy = useSelector(state => state.filters.sortBy)
    const priceRange = useSelector(state => state.filters.priceRange)


    React.useEffect(() => {
        dispatch(fetchCategoryByType(category))
    }, [])

    React.useEffect(() => {
        let priceMin = {name: "priceMin", value: priceRange[0]}
        let priceMax = {name: "priceMax", value: priceRange[1]}
        dispatch(fetchItems([...currentChosenFilters, {name: "category", value: category}, {name: "sortBy", value: sortBy.sortProperty}, priceMin, priceMax]))
    }, [currentChosenFilters, sortBy, category, priceRange])

    return <div className={`${s.category_page_wrap} container`}>
        {/*<Filters/>*/}
        <Items items={items}/>
        <Sort/>
    </div>

}