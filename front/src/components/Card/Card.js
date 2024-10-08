import React from "react";
import {useNavigate} from "react-router-dom";

import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import s from "./card.module.scss"
import star from "../../assets/star .png"
import {useDispatch, useSelector} from "react-redux";
import {putToCart} from "../../redux/slices/cartSlice";
import {LikeBtn} from "./LikeBtn/LikeBtn";
import {setLogin} from "../../redux/slices/modalSlice";
import {QuantityInCart} from "../shared/QuantityInCart/QuantityInCart";

export const Card = ({item}) => {
    const allCartItems = useSelector(state => state.cart.items)
    const [hovered, setHovered] = React.useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantityInCart, setQuantityInCart] = React.useState(0)
    const user = useSelector(state => state.user.user)

    React.useEffect(() => {
        let cartItem = allCartItems?.find(el => el.itemId === item._id)
        if (cartItem) {
            setQuantityInCart(cartItem.quantity)
        }
    }, [allCartItems])


    function onCardClick() {
        navigate(`/items/${item._id}`)
    }

    function onAddToCartClick() {
        if(!Object.values(user).length){
            dispatch(setLogin(true))
            return
        }
        dispatch(putToCart({itemId: item._id, quantity: quantityInCart + 1}))
    }
    function truncateString(str, maxLength) {
        if (str.length <= maxLength) {
            return str;
        } else {
            return str.substring(0, maxLength) + "...";
        }
    }

    return <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={s.card}>
        <div className={s.flex_wrap}>
            <p className={s.code}>Код товару: 980128</p>
            <LikeBtn itemId={item._id}/>


        </div>
        <div className={s.image}>
            <img onClick={onCardClick} src={item.imgUrl} alt=""/>

        </div>
        <div className={s.rate}>
            <span>{item.rating}</span><img className={s.star} src={star}/>
        </div>
        <p onClick={onCardClick} className={s.title}>{truncateString(item.title, 65)}</p>

        <div className={`${s.flex_wrap} ${s.bottom}`}>
            <p className={s.price}>{item.price.toFixed(2)} <span>грн</span></p>
            <button onClick={onAddToCartClick} className={s.card_btn}>{hovered && "До кошика"} <GlobalSvgSelector
                id={"cart_icon"}/>
                {quantityInCart !== 0 &&  <QuantityInCart number={quantityInCart}/>  }
            </button>

        </div>

    </div>
}