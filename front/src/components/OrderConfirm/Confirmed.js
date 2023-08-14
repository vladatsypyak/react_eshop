import React, {useState} from "react";
import s from "./orderConfirm.module.scss"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "../Auth/Modal";

export const Confirmed = () => {
    const orderData = useSelector(state => state.cart.orderData)
    const dispatch = useDispatch()
    return <div className={s.order_confirm}>
        <Modal>
            <div className={s.info_wrap}>
               <p>Дякуємо за замовлення!</p>
                <p>З подальшими питаннями з вами звяжеться менеджер</p>

            </div>
            <button className={s.return_btn}>
                <Link to={"/"}>На головну сторінку</Link>

            </button>


        </Modal>
    </div>
}