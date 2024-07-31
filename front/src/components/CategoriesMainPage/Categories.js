import React from "react"
import s from "./categories.module.scss"
import {CategoriesItem} from "./CategoriesItem";
import { useSelector} from "react-redux";




export const Categories = () => {
    const categories = useSelector(state => state.categories.categories)
    return <div className={s.categories}>
        {categories.map((el) => {
            return <CategoriesItem imageUrl={el.imageUrl} name={el.value} category={el.type}/>
        })}
    </div>
}