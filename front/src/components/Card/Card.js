import React from "react";
import {useNavigate} from "react-router-dom";

import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import s from "../Items/items.module.scss"
import like from "../../assets/card_like_icon.png"
import star from "../../assets/star .png"
import {useDispatch, useSelector} from "react-redux";
import {deleteFavourite, getAllFavourites, putFavourite} from "../../redux/slices/itemsSlice";
import {getAllCartItems, putToCart} from "../../redux/slices/cartSlice";

export const Card = ({item, onLikeClick}) => {
    const allFavourites = useSelector(state => state.items.favouriteItems)
    const allCartItems = useSelector(state => state.cart.items)

    const [liked, setLiked] = React.useState(false)
    const [hovered, setHovered] = React.useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantityInCart, setQuantityInCart] = React.useState(0)

    React.useEffect(() => {
        dispatch(getAllFavourites({userId: "123456"}))
        // dispatch(getAllCartItems({userId: "123456"}))

    }, [])
    React.useEffect(() => {
        if (allFavourites.some(el => el._id === item._id)) {
            setLiked(true)
        }
    }, [allFavourites])
    React.useEffect(() => {
        let cartItem = allCartItems.find(el => el.itemId === item._id)
        if (cartItem) {
            setQuantityInCart(cartItem.quantity)
        }
    }, [allCartItems])

    function likeClickHandle() {
      onLikeClick(item._id, liked)
        setLiked(!liked)
    }

    function onCardClick() {
        navigate(`/items/${item._id}`)
    }

    function onAddToCartClick() {
        dispatch(putToCart({userId: "123456", itemId: item._id}))
    }

    return <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={s.card}>
        <div className={s.flex_wrap}>
            <p className={s.code}>Код товару: 980128</p>
            <div onClick={likeClickHandle} className={liked ? `${s.like} ${s.liked}` : s.like}>
                <GlobalSvgSelector id={"like_not_active"}/>
            </div>

        </div>
        <img onClick={onCardClick} src={item.imgUrl} alt=""/>
        <div className={s.rate}>
            <span>{item.rating}</span><img className={s.star} src={star}/>
        </div>
        <p onClick={onCardClick} className={s.title}>{item.title}</p>

        <div className={s.flex_wrap}>
            <p className={s.price}>{item.price} <span>₴</span></p>
            <button onClick={onAddToCartClick} className={s.card_btn}>{hovered && "До кошика"} <GlobalSvgSelector
                id={"cart_icon"}/>
            <div className={s.quantity}>{quantityInCart}</div>
            </button>

        </div>

    </div>
}