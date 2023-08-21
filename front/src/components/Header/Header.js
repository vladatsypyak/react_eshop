import React from "react"
import s from "./header.module.scss"
import logo from "../../assets/logo.png"
import heart from "../../assets/heart_red.png"

import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {Search} from "./Search/Search";
import {Catalogue} from "../CatalogueSmall/Catalogue";
import {Link} from "react-router-dom";
import {UserMenuPopup} from "../UserMenuPopup/UserMenuPopup";

export const Header = () => {
    const btnRef = React.useRef()
    const [isCatalogue, setCatalogue] = React.useState(false)
    const [showUserMenu, setShowUserMenu] = React.useState(false)

    function onCatalogueBtnClick(){
        setCatalogue(!isCatalogue)
    }
    function hideCatalogue(){
        setCatalogue(false)
    }
    return <header className={s.header}>
        <div className={`container ${s.header_container}`}>
            <Link to={""}>
                <div className={s.logo}>
                    <img src={logo} alt=""/>
                </div>
            </Link>
            <button ref={btnRef} onClick={onCatalogueBtnClick} className={s.catalogueBtn}>
                <GlobalSvgSelector id="catalogue_icon"/>
                <p className={s.catalogue_text}>Каталог</p>
            </button>
            <Search/>
            <div className={s.icons}>
                <Link to={"/favourites"}><img className={s.icon} src={heart} alt=""/></Link>
                <div className={s.icon}>
                   <Link to={"cart"}><GlobalSvgSelector id="cart_icon"/></Link>
                </div>
                <div onClick={()=> setShowUserMenu(!showUserMenu)} className={s.icon}>
                    <GlobalSvgSelector id="user_icon"/>

                </div>
            </div>
            {isCatalogue && <Catalogue btnRef={btnRef} hideCatalogue={hideCatalogue}/>}
            <UserMenuPopup setIsShown={setShowUserMenu} isShown={showUserMenu}/>
        </div>
    </header>
}