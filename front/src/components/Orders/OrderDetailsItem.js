import React from "react";
import {Link} from "react-router-dom";
import s from "./orders.module.scss"


export const OrderDetailsItem = ({item}) => {

    return <div className={s.order_details_item_wrap}>
        <div className={`${s.flex_wrap} ${s.details_item_wrap}`}>
            <div className={s.image}>
                <img src={item.item.imgUrl} alt=""/>
            </div>
            <Link to={`/items/${item.item._id}`} className={s.name}> {item.item.title}</Link>
            <div className={`${s.flex_wrap} ${s.flex_end}`}>
                <p className={s.quantity}>Кількість: {item.quantity}</p>
                <p className={s.price}>Ціна: {Number(item.item.price).toFixed(2)} грн</p>
                <p className={s.total}>Сума: {(Number(item.item.price) * item.quantity).toFixed(2)} грн</p>
            </div>
        </div>
    </div>
}