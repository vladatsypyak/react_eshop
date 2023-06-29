import React from "react";
import {Slider} from "../Slider/Slider";
import {Categories} from "../CategoriesMainPage/Categories";
import {Cart} from "../Cart/Cart";
import {Favourites} from "../Favourites/Favourites";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import cart from "../../assets/empty_cart.png"
import heart from "../../assets/heart.png"

import s from "./NoItems.module.scss"

export const NoItems = ({page}) => {
    let text = page === "cart" ? "Ваша корзина наразу пуста" : "У вашому списку бажань немає товарів"
let imageSrc = page === "cart" ? cart : heart
    return <div className={s.no_items}>
        <div className={"container"}>
            <img src={imageSrc} alt={"empty cart"}/>
            <p>{text}</p>
            <button><Link to={"/"}>До головної сторінки</Link></button>
        </div>


    </div>
}