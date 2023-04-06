import React from "react"
import s from "./search.module.scss"
import {GlobalSvgSelector} from "../../../assets/GlobalSvgSelector";


export const Search = () => {
    return <div className={s.search}>
        <input type="text" placeholder={"Пошук"}/>
        <div className={s.search_icon}>
            <GlobalSvgSelector id={"search_icon"}/>

        </div>
    </div>
}