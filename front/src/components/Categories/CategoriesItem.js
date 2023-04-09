import React from "react"
import s from "./categories.module.scss"

export const CategoriesItem = ({imageUrl, category}) => {

    return <div className={s.category}>
        <div className={s.overlay}>
        </div>
        <img src={imageUrl} alt={category}/>
        <p>{category}</p>
    </div>


}