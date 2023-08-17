import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import s from "./orders.module.scss"
import moment from"moment";


export const OrderDetailsItem = ({item}) => {


    return <div className={s.order_details_item_wrap}>
        <div className={`${s.flex_wrap} ${s.details_item_wrap}`}>
            <img src={item.item.imgUrl} alt=""/>
            <Link to={`/items/${item.item._id}`} className={s.title}> {item.item.title}</Link>
            <p>Кількість: {item.quantity}</p>
            <p>Ціна: {item.item.price}</p>
            <p>Сума: {item.item.price * item.quantity}</p>

        </div>


    </div>


}