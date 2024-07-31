import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteFavourite, getAllFavourites, putFavourite} from "../../redux/slices/itemsSlice";
import {Card} from "../Card/Card"
import s from "./items.module.scss"
import {getAllCartItems, putToCart} from "../../redux/slices/cartSlice";


export const Items = ({items}) => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getAllFavourites({userId: user._id}))
        dispatch(getAllCartItems({userId: user._id}))
    }, [user])

    function onLikeClick(itemId, liked) {
        if (!liked) {
            dispatch(putFavourite({userId: user._id, itemId: itemId}))
        } else {
            dispatch(deleteFavourite({userId: user._id, itemId: itemId}))
        }
    }

    return <div className={`${s.container} wrapper`}>

        <div className={s.items_wrap}>
            {Array.isArray(items) &&
                items.map(item => {
                    return <Card onLikeClick={onLikeClick} item={item}/>
                })
            }
        </div>
    </div>
}