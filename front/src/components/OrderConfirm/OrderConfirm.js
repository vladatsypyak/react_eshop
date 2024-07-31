import React from "react";
import s from "./orderConfirm.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "../shared/Modal/Modal";
import {createOrder} from "../../redux/slices/cartSlice";

export const OrderConfirm = () => {
    const orderData = useSelector(state => state.cart.orderData)
    const user = useSelector(state => state.user.user)
    const cartItems = useSelector(state => state.cart.items)
    const price = useSelector(state => state.cart.total)

    const orderItems = cartItems?.map((obj => {
        return {quantity: obj.quantity, item: obj.item}
    }))
    console.log(orderItems)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onConfirmClick() {
        dispatch(createOrder({userId: user._id, items: orderItems, userData: orderData, price: price}))
        navigate("/orderform/confirmed")
    }

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
                    <p className={s.title}>Місто доставки</p>
                    <p>{orderData.city}</p>
                </div>
                <div className={s.item}>
                    <p className={s.title}>Відділення нової пошти</p>
                    <p>{orderData.npWarehous}</p>
                </div>
            </div>
            <div className={s.buttons_wrap}>
                <button className={s.btn}>
                    <Link to={"/orderform"}>Назад</Link>
                </button>
                <button onClick={onConfirmClick} className={`${s.btn} ${s.confirm_btn}`}>
                    Підтвердити
                </button>
            </div>

        </Modal>
    </div>
}