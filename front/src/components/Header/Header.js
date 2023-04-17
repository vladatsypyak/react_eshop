import React from "react"
import s from "./header.module.scss"
import logo from "../../assets/logo.png"
import heart from "../../assets/heart_red.png"

import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {Search} from "./Search/Search";
import {Catalogue} from "./Catalogue";

export const Header = () => {
    const btnRef = React.useRef()
    const [isCatalogue, setCatalogue] = React.useState(false)
    function onCatalogueBtnClick(){
        setCatalogue(!isCatalogue)
    }
    function hideCatalogue(){
        setCatalogue(false)
    }
    return <header className={s.header}>
        <div className={`container ${s.header_container}`}>
            <div className={s.logo}>
                <img src={logo} alt=""/>
            </div>
            <button ref={btnRef} onClick={onCatalogueBtnClick} className={s.catalogueBtn}>
                <GlobalSvgSelector id="catalogue_icon"/>
                <p className={s.catalogue_text}>Каталог</p>
            </button>
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
            {isCatalogue && <Catalogue btnRef={btnRef} hideCatalogue={hideCatalogue}/>}
        </div>
    </header>
}