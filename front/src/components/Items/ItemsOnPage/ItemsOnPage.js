import React, {useState} from "react";
import filter from "../../../assets/filter.png"
import {BreadCrumbs} from "../../BreadCrumbs/BreadCrumbs";
import {Items} from "../Items";
import {Sort} from "../../Sort/Sort";
import {Pagination} from "../../Pagination/Pagination";
import s from "./itemsOnPage.module.scss"


export const ItemsOnPage = ({items, sidebar}) => {
    const [showSort, setShowSort] = useState(false)
    const [showFilters, setShowFilters] = useState(false)

    return <>
        <div className={`${s.category_page_wrap} wrapper`}>
            <div className={s.flex_wrap}>
                {sidebar}
                <div className={s.items_wrap}>
                    <BreadCrumbs/>
                    <Items items={items}/>
                </div>
                <Sort/>
            </div>
            <Pagination/>
        </div>

        <div className={s.mob_wrapper}>
            <BreadCrumbs/>
            <div className={s.header}>
                <div className={s.filters}>
                    <div onClick={() => setShowFilters(!showFilters)}
                         className={showFilters ? `${s.icon} ${s.active}` : s.icon}>
                        <img src={filter} alt="filter"/>
                    </div>
                </div>
                <Sort/>
            </div>
            {showFilters && sidebar}
            <Items items={items}/>
            <Pagination/>
        </div>
    </>


}