import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCartItem, getAllCartItems, putToCart, removeOneFromCart} from "../../redux/slices/cartSlice";
import s from "./cart.module.scss"
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";


export const Item = ({cartItem, user}) => {
    console.log(cartItem)
    const dispatch = useDispatch()

    function onMinusClick() {
        if (cartItem.quantity === 1) {
            dispatch(deleteCartItem({itemId: cartItem.itemId}))
        } else {
            dispatch(removeOneFromCart({itemId: cartItem.itemId}))
        }

    }

    function onPlusClick() {
        dispatch(putToCart({itemId: cartItem.itemId, quantity: cartItem.quantity + 1}))
    }

    function onDeleteClick() {
        dispatch(deleteCartItem({itemId: cartItem.itemId}))
    }

    return <div className={s.cart_item_wrap}>
        <div className={s.close} onClick={onDeleteClick}><GlobalSvgSelector id={"cross"}/></div>
        <div className={s.image}>
            <img src={cartItem.item.imgUrl} alt=""/>
        </div>
        <div className={s.responsive_wrap1}>
            <div className={s.title}>
                <p className={s.title}>{cartItem.item.title}</p>
            </div>
            <p className={s.price}>{cartItem?.item?.price.toFixed(2)}<span> грн</span></p>
        </div>

        <div className={s.responsive_wrap}>
            <div className={s.quantity_wrap}>
                <p onClick={onMinusClick} className={s.change_quantity}>-</p>
                <p className={s.quantity}>{cartItem.quantity}</p>
                <p onClick={onPlusClick} className={s.change_quantity}>+</p>
            </div>
            <p className={s.item_total}>{(cartItem?.quantity * cartItem?.item.price).toFixed(2)} грн</p>
        </div>
    </div>
}