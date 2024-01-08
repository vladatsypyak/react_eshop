import React from "react"
import s from "./header.module.scss"
import logo from "../../assets/logo.png"
import heart from "../../assets/heart.png"


import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {Search} from "../Search/Search";
import {Catalogue} from "../CatalogueSmall/Catalogue";
import {Link} from "react-router-dom";
import {UserMenuPopup} from "../UserMenuPopup/UserMenuPopup";
import {useSelector} from "react-redux";
import {QuantityInCart} from "../shared/QuantityInCart/QuantityInCart";

export const Header = () => {
    const btnRef = React.useRef()
    const userMenuBtn = React.useRef()

    const [isCatalogue, setCatalogue] = React.useState(false)
    const [showUserMenu, setShowUserMenu] = React.useState(false)

    const quantityInCart = useSelector(state => state.cart.items)


    function onCatalogueBtnClick() {
        setCatalogue(!isCatalogue)
    }

    function hideCatalogue() {
        setCatalogue(false)
    }

    return <header className={s.header}>
        <nav className={`navbar navbar-expand-lg navbar-light wrapper `}>
            <div className={`${s.header_container} container-fluid `}>
             <div className={s.left_wrap}>
                 <div className={`navbar-brand ${s.logo_wrap}`}>
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
             </div>

                <button style={{ border: "1px solid black" }
                } className={`navbar-toggler ${s.custom_toggler}`} id={"button"} type="button"

                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo0" aria-controls="navbarTogglerDemo0" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={` ${s.collapse} collapse navbar-collapse`} id="navbarTogglerDemo0">
                  <div className={s.search_wrap}>
                      <Search/>
                  </div>

                 <div className={s.icons_wrap}>
                     <ul className={`${s.icons} navbar-nav `}>
                         <li className={`${s.icon} ${s.heart_icon} nav-item`}>
                             <Link to={"/favourites"}> <GlobalSvgSelector id="heart_green"/></Link>
                         </li>
                         <li className={`${s.icon} ${s.cart_icon} nav-item`}>
                             <Link to={"cart"}><GlobalSvgSelector id="cart_icon"/></Link>
                             {/*<GlobalSvgSelector id="cart_icon"/>*/}
                             {quantityInCart?.length > 0 && <QuantityInCart number={quantityInCart?.length}/>}

                         </li>
                         <li ref={userMenuBtn} onClick={() => setShowUserMenu(!showUserMenu)}
                             className={`${s.icon} ${s.user_icon} nav-item`}>
                             <GlobalSvgSelector id="user_icon"/>
                         </li>
                     </ul>
                 </div>
                </div>
            </div>
        </nav>
        {isCatalogue && <Catalogue btnRef={btnRef} hideCatalogue={hideCatalogue}/>}
        {showUserMenu && <UserMenuPopup usermenuRef={userMenuBtn} setIsShown={setShowUserMenu}/>}

    </header>
}