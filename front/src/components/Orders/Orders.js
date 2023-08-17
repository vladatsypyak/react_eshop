import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getUserOrders} from "../../redux/slices/cartSlice";
import {OrderItem} from "./OrderItem";

export const Orders = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.cart.orders)
    const user = useSelector(state => state.user.user._id)

    useEffect(()=>{
        dispatch(getUserOrders({userId: user}))
    }, [])
    console.log(orders)
    return <div>
        {
            orders.map(obj => {
                return <OrderItem item={obj}/>
            })
        }
    </div>


}