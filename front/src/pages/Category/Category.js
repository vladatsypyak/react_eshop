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

    React.useEffect(() => {
        dispatch(fetchCategoryByType(category))
    }, [])
    console.log(category)

    React.useEffect(() => {
        dispatch(fetchItems([...currentChosenFilters, {name: "category", value: category}, {name: "sortBy", value: sortBy.sortProperty}]))
    }, [currentChosenFilters, sortBy, category])

    return <div className={`${s.category_page_wrap} container`}>
        <Filters/>
        <Items items={items}/>
        <Sort/>
    </div>

}