import React from "react";
import {Filters} from "../../components/Filters/Filters";
import {Items} from "../../components/Items/Items";
import {Sort} from "../../components/Sort/Sort";
import {fetchCategories, fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {AllCategoriesSidebar} from "../../components/AllCategoriesSidebar/AllCategoriesSidebar";

import s from "./search_results_page.module.scss"
export const SearchResultsPage = () => {

    const dispatch = useDispatch()
    const getCategories = async () => {
        dispatch(fetchCategories())


    }
    React.useEffect(() => {
        getCategories()
    }, [])

    return <div className={` container ${s.search_results_page_wrap}`}>
        <AllCategoriesSidebar/>
        <Items/>
        <Sort/>
    </div>

}