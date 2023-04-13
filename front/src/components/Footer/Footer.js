import React from "react"
import s from "./footer.module.scss"
import logo from "../../assets/logo.png"
import inst from "../../assets/instagram.png"
import telegramm from "../../assets/telegram.png"
import fb from "../../assets/facebook.png"
import viber from "../../assets/viber.png"


import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";

export const Footer = () => {
    return <footer className={s.footer}>
        <div className={`container ${s.footer_container}`}>
            <div className={s.logo}>
                <img src={logo} alt=""/>
            </div>
            <div className={s.group}>
                <p className={s.group_title}>
                    Сервіс
                </p>
                <p className={s.text}>
                    Каталог
                </p>
                <p className={s.text}>
                    Акції
                </p>
                <p className={s.text}>
                    Корзина
                </p>
                <p className={s.text}>
                    Доставка
                </p>
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
                <p className={s.group_title}>
                    Топ категорій
                </p>
                <p className={s.text}>
                    Смартфони
                </p>
                <p className={s.text}>
                    Ноутбуки
                </p>
                <p className={s.text}>
                    Побутова техніка
                </p>
                <p className={s.text}>
                    Побутова техніка
                </p>

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