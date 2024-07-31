import React, {useState} from "react";
import s from "./orderConfirm.module.scss"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "../shared/Modal/Modal";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";

export const Confirmed = () => {
    const orderData = useSelector(state => state.cart.orderData)
    const dispatch = useDispatch()
    return <div className={s.order_confirm}>
        <Modal>
            <div className={s.info_wrap}>
                <div className={s.done_img}>
                    <GlobalSvgSelector id={"done"}/>

                </div>
               <p>Дякуємо за замовлення!</p>
                <p>З подальшими питаннями з вами звяжеться менеджер</p>

            </div>
            <div className={s.return}>
                <Link to={"/"}>На головну сторінку</Link>

            </div>


        </Modal>
    </div>
}