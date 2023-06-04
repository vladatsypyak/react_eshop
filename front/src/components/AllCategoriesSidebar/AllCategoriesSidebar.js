import React from "react"
import s from "./AllCategoriesSidebar.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {useNavigate} from "react-router-dom";



export const AllCategoriesSidebar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categories = useSelector(state => state.categories.categories)
    console.log(categories)
    function onCategoryClick(category){
        dispatch(fetchCategoryByType(category)).then(
            ()=> navigate(`/categories/${category}`)
        )

    }

    return <div className={s.categories}>

       <div className={s.categories_wrap}>
           <p className={s.title}>Всі категорії</p>
           {categories.map((el) => {
               return <div onClick={()=>onCategoryClick(el.type)} className={s.category}>
                   <p>{el.value}</p>
                   <GlobalSvgSelector id={"rarrow"}/>
               </div>
           })}
       </div>
    </div>
}