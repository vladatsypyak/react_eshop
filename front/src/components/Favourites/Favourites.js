import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteFavourite, getAllFavourites, putFavourite} from "../../redux/slices/itemsSlice";
import {Card} from "../Card/Card"
import s from "./favourites.module.scss"

export const Favourites = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.favouriteItems)

    function onLikeClick(itemId, liked) {
        if (!liked) {
            dispatch(putFavourite({itemId}))
        } else {
            dispatch(deleteFavourite({itemId}))
        }
    }

    React.useEffect(() => {
        dispatch(getAllFavourites())
    }, [])

    return <div className={s.items_wrap}>
        {items?.map(item => {
            return <Card onLikeClick={onLikeClick} item={item}/>
        })}


    </div>
}