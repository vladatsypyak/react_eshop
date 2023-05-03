import React from "react";

import {GlobalSvgSelector} from "../../../assets/GlobalSvgSelector";
import s from "../items.module.scss"
import like from "../../../assets/card_like_icon.png"
import star from "../../../assets/star .png"

export const Card = ({item}) => {

    return <div className={s.card}>
     <div className={s.flex_wrap}>
         <p className={s.code}>Код товару: 980128</p>
         <img className={s.like} src={like} alt=""/>
     </div>
        <img src={item.imgUrl} alt=""/>
        <div className={s.rate}>
            <span>{item.rating}</span><img className={s.star} src={star}/>
        </div>
        <p className={s.title}>{item.title}</p>

        <div className={s.flex_wrap}>
            <p className={s.price}>{item.price} <span>₴</span></p>
            <button className={s.card_btn}><GlobalSvgSelector id={"cart_icon"}/></button>

        </div>

    </div>
}