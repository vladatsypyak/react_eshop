import React from "react";
import {fetchCategories, fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AllCategoriesSidebar} from "../../components/AllCategoriesSidebar/AllCategoriesSidebar";
import {searchItems} from "../../redux/slices/itemsSlice";
import {ItemsOnPage} from "../../components/Items/ItemsOnPage/ItemsOnPage";

export const SearchResultsPage = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.items)
    const currentCategory = useSelector(store => store.categories.currentCategory)
    const currentChosenFilters = useSelector(state => state.filters.chosenFilters)
    const sortBy = useSelector(state => state.filters.sortBy)
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


    return <>
        <ItemsOnPage items={items} sidebar={<AllCategoriesSidebar/>}/>
    </>

}