import React from "react"
import s from "./categories.module.scss"
import {CategoriesItem} from "./CategoriesItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, selectCategories} from "../../redux/slices/categoriesSlice";



export const Categories = () => {
    const categories = useSelector(state => state.categories.categories)
    return <div className={s.categories}>
        {categories.map((el) => {
            return <CategoriesItem imageUrl={el.imageUrl} name={el.value} category={el.type}/>
        })}
    </div>
}