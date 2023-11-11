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
    const userMenuBtn = React.useRef()

    const [isCatalogue, setCatalogue] = React.useState(false)
    const [showUserMenu, setShowUserMenu] = React.useState(false)

    function onCatalogueBtnClick(){
        setCatalogue(!isCatalogue)
    }
    function hideCatalogue(){
        setCatalogue(false)
    }

    return <header className={s.header}>
        <nav className={`navbar navbar-expand-lg navbar-dark wrapper `} >
         <div className={`${s.header_container} container-fluid `}>
            <div className={"navbar-brand"}>
                <Link to={""}>
                    <div className={s.logo}>
                        <img src={logo} alt=""/>
                    </div>
                </Link>
            </div>
             <button ref={btnRef} onClick={onCatalogueBtnClick} className={s.catalogueBtn}>
                 <GlobalSvgSelector id="catalogue_icon"/>
                 <p className={s.catalogue_text}>Каталог</p>
             </button>

             <button style={{border: "1px solid white"}} className="navbar-toggler" type="button" data-bs-toggle="collapse"
                     data-bs-target="#navbarTogglerDemo0" aria-controls="navbarTogglerDemo0" aria-expanded="false"
                     aria-label="Toggle navigation">
                 <span  className="navbar-toggler-icon"></span>
             </button>
             <div className={` ${s.collapse} collapse navbar-collapse`} id="navbarTogglerDemo0">
                 <Search/>

                 <ul className={`${s.icons} navbar-nav `}>
                     <li className={`${s.icon} nav-item`}>
                         <Link to={"/favourites"}><img  src={heart} alt=""/></Link>
                     </li>
                     <li className={`${s.icon} nav-item`}>
                         <Link to={"cart"}><GlobalSvgSelector id="cart_icon"/></Link>
                         {/*<GlobalSvgSelector id="cart_icon"/>*/}
                     </li>
                     <li ref={userMenuBtn}  onClick={()=> setShowUserMenu(!showUserMenu)} className={`${s.icon} nav-item`}>
                         <GlobalSvgSelector id="user_icon"/>
                     </li>
                 </ul>
             </div>
         </div>
        </nav>
        {isCatalogue && <Catalogue btnRef={btnRef} hideCatalogue={hideCatalogue}/>}
        <UserMenuPopup usermenuRef={userMenuBtn} setIsShown={setShowUserMenu} isShown={showUserMenu}/>

    </header>
}