import React from "react";
import {Filters} from "../../components/Filters/Filters";
import {Items} from "../../components/Items/Items";
import s from "./category.module.scss"



export const Category = () => {
    return <div className={s.category_page_wrap}>
<Filters/>
        <Items/>
    </div>

}