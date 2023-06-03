import React from "react"
import s from "./AllCategoriesSidebar.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";



export const AllCategoriesSidebar = () => {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.categories)
    console.log(categories)

    return <div className={s.categories}>

       <div className={s.categories_wrap}>
           <p className={s.title}>Всі категорії</p>
           {categories.map((el) => {
               return <div className={s.category}>
                   <p>{el.value}</p>
                   <GlobalSvgSelector id={"rarrow"}/>
               </div>
           })}
       </div>
    </div>
}