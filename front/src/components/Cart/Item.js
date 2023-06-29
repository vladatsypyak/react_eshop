import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCartItem, getAllCartItems, putToCart, removeOneFromCart} from "../../redux/slices/cartSlice";
import s from "./cart.module.scss"
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";


export const Item = ({cartItem, user}) => {
    const dispatch = useDispatch()
    function onMinusClick() {
        if(cartItem.quantity === 1){
            dispatch(deleteCartItem({userId: user._id, itemId: cartItem.itemId}))

        } else {
            dispatch(removeOneFromCart({userId:  user._id, itemId: cartItem.itemId}))

        }

    }

    function onPlusClick() {
        console.log(cartItem.quantity)
        dispatch(putToCart({userId:  user._id, itemId: cartItem.itemId, quantity: cartItem.quantity + 1}))
    }

    function onDeleteClick() {
        dispatch(deleteCartItem({userId: user._id, itemId: cartItem.itemId}))
    }
    return <div className={s.cart_item_wrap}>
        <div onClick={onDeleteClick}><GlobalSvgSelector id={"cross"}/></div>
        <img src={cartItem.item.imgUrl} alt=""/>
        <p>{cartItem.item.title}</p>
        <p className={s.price}>{cartItem.item.price}<span> грн</span></p>
        <div className={s.quantity_wrap}>
            <p onClick={onMinusClick} className={s.change_quantity}>-</p>
            <p className={s.quantity}>{cartItem.quantity}</p>
            <p onClick={onPlusClick} className={s.change_quantity}>+</p>


        </div>
        <p className={s.item_total}>{cartItem.quantity * cartItem.item.price} грн</p>


    </div>
}