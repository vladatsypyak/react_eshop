import React from "react";
import {useNavigate} from "react-router-dom";

import {GlobalSvgSelector} from "../../../../assets/GlobalSvgSelector";
import s from "./search_section.module.scss"

import star from "../../../../assets/star .png"
import {useDispatch, useSelector} from "react-redux";


export const SearchSection = () => {
    const items = useSelector(state => state.items.foundItems)

    return <div className={s.search_section_wrap}>
        <div className={s.overlay}></div>
        <div className={s.items_wrap}>
            <h3 className={s.title}>Товари</h3>
            <div className={s.items}>
                {items.map(el => {
                    return <div className={s.item}>
                        <img src={el.imgUrl} alt=""/>
                        <div className={s.info}>
                            <p>{el.title}</p>
                            <p>{el.price}</p>
                        </div>
                    </div>
                })}
            </div>
            <button className={s.search_btn}>
                Всі результати
            </button>
        </div>

    </div>
}