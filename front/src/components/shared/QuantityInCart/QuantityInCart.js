import React from "react"
import s from "./quantityInCart.module.scss"

export const QuantityInCart = ({number}) => {
    return <div className={s.quantity}>{number}</div>
}