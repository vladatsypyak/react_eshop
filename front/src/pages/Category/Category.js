import React, {useState} from "react";
import {Filters} from "../../components/Filters/Filters";
import {Items} from "../../components/Items/Items";
import s from "./category.module.scss"
import {Sort} from "../../components/Sort/Sort";
import {fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchItems, setPage} from "../../redux/slices/itemsSlice";
import {Pagination} from "../../components/Pagination/Pagination";
import filter from "../../assets/filter.png"
import {BreadCrumbs} from "../../components/BreadCrumbs/BreadCrumbs";


export const Category = () => {
    const {category} = useParams()
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.items)
    const currentChosenFilters = useSelector(state => state.filters.chosenFilters)
    const sortBy = useSelector(state => state.filters.sortBy)
    const priceRange = useSelector(state => state.filters.priceRange)
    const page = useSelector(state => state.items.page)
    const [showSort, setShowSort] = useState(false)
    const [showFilters, setShowFilters] = useState(false)


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

    return <>
        <div className={`${s.category_page_wrap} wrapper`}>
            <div className={s.flex_wrap}>
                <Filters/>
               <div className={s.items_wrap}>
                   <BreadCrumbs/>
                   <Items items={items}/>
               </div>
                <Sort/>
            </div>
            <Pagination/>
        </div>

        <div className={s.mob_wrapper}>
            <BreadCrumbs/>

            <div className={s.header}>
                <div className={s.filters}>
                    <div onClick={() => setShowFilters(!showFilters)}
                         className={showFilters ? `${s.icon} ${s.active}` : s.icon}>
                        <img src={filter} alt="filter"/>
                    </div>
                </div>
                <Sort/>
            </div>
            {showFilters && <Filters/>}
            <Items items={items}/>
            <Pagination/>

        </div>
    </>


}