import React from "react";
import {Filters} from "../../components/Filters/Filters";
import {Items} from "../../components/Items/Items";
import {Sort} from "../../components/Sort/Sort";
import {fetchCategories, fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AllCategoriesSidebar} from "../../components/AllCategoriesSidebar/AllCategoriesSidebar";

import s from "./search_results_page.module.scss"
import {fetchItems, searchItems, setItems} from "../../redux/slices/itemsSlice";
import {logDOM} from "@testing-library/react";
import {Pagination} from "../../components/Pagination/Pagination";

export const SearchResultsPage = () => {

    const {category} = useParams()
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.items)
    const currentCategory = useSelector(store => store.categories.currentCategory)
    const currentChosenFilters = useSelector(state => state.filters.chosenFilters)
    const sortBy = useSelector(state => state.filters.sortBy)
    const foundItems = useSelector(state => state.items.foundItems)

    const searchValue = useSelector(state => state.filters.searchValue)

    const getCategories = async () => {
        dispatch(fetchCategories())


    }
    React.useEffect(() => {
        getCategories()
    }, [])

    React.useEffect(() => {
        dispatch(searchItems({
            title: searchValue,
            sortBy: sortBy.sortProperty
        }))

    }, [currentChosenFilters, currentCategory, sortBy])


    return <div className={` container ${s.search_results_page_wrap}`}>
        <AllCategoriesSidebar/>
        <Items items={foundItems}/>
        <Sort/>
        <Pagination/>
    </div>

}