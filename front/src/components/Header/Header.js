import React from "react"
import s from "./header.module.scss"
import logo from "../../assets/logo.png"
import heart from "../../assets/heart_red.png"

import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {Search} from "./Search/Search";

export const Header = () => {
    return <header className={s.header}>
        <div className={`container ${s.header_container}`}>
            <div className={s.logo}>
                <img src={logo} alt=""/>
            </div>
            <div className={s.catalogue}>
                <GlobalSvgSelector id="catalogue_icon"/>
                <p className={s.catalogue_text}>Каталог</p>
            </div>
            <Search/>
            <div className={s.icons}>
                <img className={s.icon} src={heart} alt=""/>
                <div className={s.icon}>
                    <GlobalSvgSelector id="cart_icon"/>
                </div>
                <div className={s.icon}>
                    <GlobalSvgSelector id="user_icon"/>

                </div>
            </div>
        </div>
    </header>
}