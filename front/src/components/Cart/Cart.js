import React from "react";
import {useDispatch, useSelector} from "react-redux";
import s from "./cart.module.scss"
import {Item} from "./Item";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {getAllCartItems, setTotal} from "../../redux/slices/cartSlice";
import {useNavigate} from "react-router-dom";

export const Cart = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items)
    const items = useSelector(state => state.items.items)
    const total = useSelector(state => state.cart.total)
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    React.useEffect(() => {
        dispatch(getAllCartItems({userId: user._id}))
    }, [items])
    React.useEffect(() => {
        dispatch(getAllCartItems({userId: user._id}))
    }, [])
    React.useEffect(() => {
        dispatch(setTotal())
    }, [cartItems])

    function onOrderClick(){
        navigate("/orderform")
    }

    return <div className={s.cart_wrap}>
        {
            cartItems?.map(el => {
                return <Item user={user} cartItem={el}/>
            })
        }
        <div className={s.cart_bottom}>
            <div className={s.total_wrap}>
                <p>Загалом</p>
                <p className={s.total}>{total?.toFixed(2)} грн</p>
            </div>
            <button onClick={onOrderClick} className={s.cart_btn}>Оформити замовлення <GlobalSvgSelector id={"rarrow"}/></button>
        </div>
    </div>
}