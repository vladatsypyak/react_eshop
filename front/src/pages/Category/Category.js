import React from "react";
import {Filters} from "../../components/Filters/Filters";
import {Items} from "../../components/Items/Items";
import s from "./category.module.scss"
import {Sort} from "../../components/Sort/Sort";
import {fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";


export const Category = () => {
    const {category} = useParams()

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(fetchCategoryByType(category))
    }, [])

    return <div className={`${s.category_page_wrap} container`}>
        <Filters/>
        <Items/>
        <Sort/>
    </div>

}