import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import s from "./orders.module.scss"
import moment from"moment";
import {OrderDetailsItem} from "./OrderDetailsItem";


export const OrderItem = ({item, date}) => {
    const [showDetails, setShowDetails] = useState(false)
    function getStatus(status) {
        switch (status) {
            case "New" :
                return "Опрацьовуєтьcя менеджером";
            case "toDeliver":
                return "Очікується на відправку"
        }
    }
    function getDate(date){
        return moment(new Date(date) ).format("DD/MM/YYYY")
    }


    return <div className={s.order_item_wrap}  >
        <div className={`${s.flex_wrap} ${s.main_info_wrap}`} onClick={()=> setShowDetails(!showDetails)}>
            <p className={s.date}>{getDate(item.createdAt)}</p>

            <img src={item.items[0].item.imgUrl} alt=""/>
            <p>Товарів: {item.items.length}</p>
            <p>Сума: {item.price}грн</p>
            <div className={s.status}>
                <div className={s.circle}></div>
                <p> {getStatus(item.status)}</p>
            </div>

        </div>

        {showDetails &&
            <div className={s.details_wrapper}>
                <div className={s.details} >
                    <h3 className={s.title}>Інформація про замовлення</h3>
                    <div className={s.items}>
                        {item.items.map(obj=> <OrderDetailsItem item={obj}/> )}
                    </div>
                </div>
            </div>
        }

    </div>


}