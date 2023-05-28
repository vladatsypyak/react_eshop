import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCartItems} from "../../redux/slices/cartSlice";
import s from "./cart.module.scss"


export const Cart = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.cart.items)



    React.useEffect(() => {
        dispatch(getAllCartItems())
    }, [])
    return <div className={s.cart_wrap}>
        <p>cart</p>
    </div>
}