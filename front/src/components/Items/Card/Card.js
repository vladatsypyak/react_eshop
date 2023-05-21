import React from "react";
import { useNavigate } from "react-router-dom";

import {GlobalSvgSelector} from "../../../assets/GlobalSvgSelector";
import s from "../items.module.scss"
import like from "../../../assets/card_like_icon.png"
import star from "../../../assets/star .png"
import {useDispatch, useSelector} from "react-redux";
import {deleteFavourite, getAllFavourites, putFavourite} from "../../../redux/slices/itemsSlice";

export const Card = ({item}) => {
    const allFavourites = useSelector(state => state.items.favouriteItems)
    const [liked, setLiked] = React.useState(false)
    const [hovered, setHovered] = React.useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch(getAllFavourites({userId: "123456"}))
    }, [])
    React.useEffect(() => {
      if(allFavourites.some(el =>  el.itemId === item._id)){
          setLiked(true)
      }
    }, [allFavourites])

    function onLikeClick() {
        if (!liked) {
            dispatch(putFavourite({userId: "123456", itemId: item._id}))
        } else {
            dispatch(deleteFavourite({userId: "123456", itemId: item._id}))
        }
        setLiked(!liked)
    }
    function onCardClick(){
        navigate(`/items/${item._id}`)
    }

    return <div  onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={s.card}>
        <div className={s.flex_wrap}>
            <p className={s.code}>Код товару: 980128</p>
            <div onClick={onLikeClick} className={liked ? `${s.like} ${s.liked}` : s.like}>
                <GlobalSvgSelector id={"like_not_active"}/>
            </div>

        </div>
        <img onClick={onCardClick} src={item.imgUrl} alt=""/>
        <div className={s.rate}>
            <span>{item.rating}</span><img className={s.star} src={star}/>
        </div>
        <p onClick={onCardClick}  className={s.title}>{item.title}</p>

        <div className={s.flex_wrap}>
            <p className={s.price}>{item.price} <span>₴</span></p>
            <button className={s.card_btn}>{hovered && "До кошика"}<GlobalSvgSelector id={"cart_icon"}/></button>

        </div>

    </div>
}