import React, {useState} from "react";
import s from "./orderConfirm.module.scss"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "../Auth/Modal";

export const OrderConfirm = () => {
    const orderData = useSelector(state => state.cart.orderData)
    const dispatch = useDispatch()
    return <div className={s.order_confirm}>
        <Modal>
            <div className={s.info_wrap}>
                <div className={s.item}>
                    <p className={s.title}>Ім'я</p>
                    <p>{orderData.name}</p>
                </div>
                <div className={s.item}>
                    <p className={s.title}>Прізвище</p>
                    <p>{orderData.surname}</p>
                </div>
                <div className={s.item}>
                    <p className={s.title}>По батькові</p>
                    <p>{orderData.patronymic}</p>
                </div>
                <div className={s.item}>
                    <p className={s.title}>Телефон</p>
                    <p>{orderData.phone}</p>
                </div>
                <div className={s.item}>
                    <p className={s.title}>Адреса доставки</p>
                    <p>{orderData.placeStr}</p>
                </div>
            </div>
           <div className={s.buttons_wrap}>
               <button className={s.btn}>
                   <Link to={"/orderform"}>Назад</Link>

               </button>
               <button className={`${s.btn} ${s.confirm_btn}`}>
                   <Link to={"/orderform/confirmed"}>Підтвердити</Link>

               </button>
           </div>

        </Modal>
    </div>
}