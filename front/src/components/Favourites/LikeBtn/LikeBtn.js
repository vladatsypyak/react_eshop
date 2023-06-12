import React from "react";
import s from "./likeBtn.module.scss"
import {GlobalSvgSelector} from "../../../assets/GlobalSvgSelector";
import {useDispatch, useSelector} from "react-redux";
import {deleteFavourite, getAllFavourites, putFavourite} from "../../../redux/slices/itemsSlice";


export const LikeBtn = ({ itemId, isText}) => {
    const [liked, setLiked] = React.useState(false)
    const allFavourites = useSelector(state => state.items.favouriteItems)
    const dispatch = useDispatch()


    function onLikeClick(itemId, liked) {
        if (!liked) {
            dispatch(putFavourite({userId: "123456", itemId: itemId}))
        } else {
            dispatch(deleteFavourite({userId: "123456", itemId: itemId}))
        }
    }
    function likeClickHandle() {
        onLikeClick(itemId, liked)
        setLiked(!liked)
    }

    React.useEffect(() => {
        dispatch(getAllFavourites({userId: "123456"}))

    }, [])
    React.useEffect(() => {
        if (allFavourites.some(el => el._id === itemId)) {
            setLiked(true)
        }
    }, [allFavourites])
    return <div className={s.like_btn_wrap}>
        <div onClick={likeClickHandle} className={liked ? `${s.like} ${s.liked}` : s.like}>
            <GlobalSvgSelector id={"like_not_active"}/>
            {isText && <p>  Додати до вподобань</p>}
        </div>
    </div>
}