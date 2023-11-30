import React from "react"
import s from "./footer.module.scss"
import logo from "../../assets/logo.png"
import inst from "../../assets/instagram.png"
import telegramm from "../../assets/telegram.png"
import fb from "../../assets/facebook.png"
import viber from "../../assets/viber.png"


import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {Link} from "react-router-dom";

export const Footer = () => {
    return <footer className={s.footer}>
        <div className={`wrapper ${s.footer_container}`}>
            <div className={s.logo}>
                <img src={logo} alt=""/>
            </div>
            <div className={s.group}>
                <p className={s.group_title}>
                    Сервіс
                </p>
                <Link to={"/"} className={s.text}>
                    <p>Категорії</p>
                </Link>
                <Link to={"/"} className={s.text}>
                    <p>Акції</p>
                </Link>
                <Link to={"/cart"} className={s.text}>
                    <p>Корзина</p>
                </Link>
                <Link to={"/favourites"} className={s.text}>
                    <p>Збережені</p>
                </Link>
            </div>
            <div className={s.group}>
                <p className={s.group_title}>
                    Контакти
                </p>
                <p className={s.text}>
                    + (380) 99 55 6 77 43
                </p>
                <p className={s.text}>
                    + (380) 67 7 33 456 7
                </p>

            </div>
            <div className={s.group}>
                <p  className={s.group_title}>
                    Топ категорій
                </p>
                <Link to={"categories/tea"} className={s.text}>
                    <p>Чай</p>
                </Link>
                <Link to={"categories/coffee"} className={s.text}>
                    <p>Кава</p>
                </Link>
                <Link to={"categories/thermos"} className={s.text}>
                    <p>Термоси</p>
                </Link>
                <Link to={"categories/machines"} className={s.text}>
                    <p>Кавомашини</p>
                </Link>

            </div>
            <div className={s.group}>
                <p className={s.group_title}>
                    Соціальні мережі
                </p>
               <div className={s.icons}>
                   <div className={s.icon}>
                       <img src={inst} alt={"inst"}/>
                   </div>
                   <div className={s.icon}>
                       <img src={telegramm} alt={"inst"}/>
                   </div>
                   <div className={s.icon}>
                       <img src={fb} alt={"inst"}/>
                   </div>
                   <div className={s.icon}>
                       <img src={viber} alt={"inst"}/>
                   </div>
               </div>
            </div>


        </div>
    </footer>
}