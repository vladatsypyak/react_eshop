import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCartItems} from "../../redux/slices/cartSlice";
import s from "./cart.module.scss"
import {Item} from "./Item";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";


export const Cart = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.cart.items)


    React.useEffect(() => {
        dispatch(getAllCartItems())
    }, [items])
    return <div className={s.cart_wrap}>
        {
            items.map(el => {
                return <Item cartItem={el}/>
            })
        }
        <div className={s.cart_bottom}>
            <div className={s.total_wrap}>
                <p>Загалом</p>
                <p className={s.total}>1000 грн</p>
            </div>
            <button className={s.cart_btn}>Оформити замовлення <GlobalSvgSelector id={"rarrow"}/></button>
        </div>
    </div>
}