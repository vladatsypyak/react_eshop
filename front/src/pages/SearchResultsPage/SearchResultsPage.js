import React from "react";
import {Filters} from "../../components/Filters/Filters";
import {Items} from "../../components/Items/Items";
import {Sort} from "../../components/Sort/Sort";
import {fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";


export const SearchResultsPage = () => {

    const dispatch = useDispatch()


    return <div className={` container`}>
        <Items/>
        <Sort/>
    </div>

}