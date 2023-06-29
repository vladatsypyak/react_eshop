import React from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoryByType} from "../../redux/slices/categoriesSlice";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {deleteFavourite, fetchItems, getAllFavourites, putFavourite} from "../../redux/slices/itemsSlice";
import {Card} from "../Card/Card"
import s from "./items.module.scss"
import {getAllCartItems, putToCart} from "../../redux/slices/cartSlice";

export const Items = ({items}) => {
    const user = useSelector(state => state.user.user)
    React.useEffect(() => {
        dispatch(getAllFavourites({userId: user._id}))
        dispatch(getAllCartItems({userId: user._id}))

    }, [user])
    const dispatch = useDispatch()
    function onLikeClick(itemId, liked) {
        if (!liked) {
            dispatch(putFavourite({userId: user._id, itemId: itemId}))
        } else {
            dispatch(deleteFavourite({userId: user._id, itemId: itemId}))
        }
    }

    return <div className={s.items_wrap}>
        {items.map(item => {
            return <Card onLikeClick={onLikeClick} item={item}/>
        })}


    </div>
}