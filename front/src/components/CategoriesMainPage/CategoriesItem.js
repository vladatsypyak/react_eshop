import React from "react"
import s from "./categories.module.scss"
import {Link} from "react-router-dom";

export const CategoriesItem = ({imageUrl, category, name}) => {

    return <div className={s.category}>
        <Link to={`/categories/${category}`}>

        <div className={s.overlay}>
        </div>
           <img src={imageUrl} alt={category}/>
           <p>{name}</p>
       </Link>
    </div>


}