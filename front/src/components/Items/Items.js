import React from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {fetchItems} from "../../redux/slices/itemsSlice";
import {Card} from "./Card/Card";
import s from "./items.module.scss"

export const Items = () => {
    const dispatch = useDispatch()
    const {category} = useParams()
    const items = useSelector(state => state.items.items)
    const currentCategory = useSelector(store => store.categories.currentCategory)
    const currentChosenFilters = useSelector(state => state.filters.chosenFilters)

    React.useEffect(() => {
        dispatch(fetchCategoryByType(category))
        dispatch(fetchItems([...currentChosenFilters, {name: "category", value: currentCategory.type}]))
    }, [currentChosenFilters, currentCategory])

    return <div className={s.items_wrap}>
        {items.map(item => {
            return <Card item={item}/>
        })}


    </div>
}