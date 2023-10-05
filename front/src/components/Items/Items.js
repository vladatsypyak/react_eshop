import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteFavourite, fetchItems, getAllFavourites, putFavourite, setPage} from "../../redux/slices/itemsSlice";
import {Card} from "../Card/Card"
import s from "./items.module.scss"
import {getAllCartItems, putToCart} from "../../redux/slices/cartSlice";

export const Items = ({items}) => {
    const pageTotal = useSelector(state => state.items.pageCount)
    // const [page, setPage] = useState(1);
    const page = useSelector(state => state.items.page)
    const [pageCount, setPageCount] = useState(0);
    const user = useSelector(state => state.user.user)
    React.useEffect(() => {
        dispatch(getAllFavourites({userId: user._id}))
        dispatch(getAllCartItems({userId: user._id}))
    }, [user])
    const dispatch = useDispatch()
    useEffect(() => {
        setPageCount(pageTotal)
    }, [pageTotal]);

    function handlePrevious() {
        let p = page === 1 ? page : page - 1
        dispatch(setPage(p))
    }

    function handleNext() {
        let p = page === pageCount ? page : page + 1
        dispatch(setPage(p))
    }

    function onLikeClick(itemId, liked) {
        if (!liked) {
            dispatch(putFavourite({userId: user._id, itemId: itemId}))
        } else {
            dispatch(deleteFavourite({userId: user._id, itemId: itemId}))
        }
    }

    return <div className={s.items_wrap}>
        {Array.isArray(items) &&
            items.map(item => {
                return <Card onLikeClick={onLikeClick} item={item}/>
            })
        }
        <footer>
            Page: {page}
            <br/>
            Page count: {pageCount}
            <br/>
            <button disabled={page === 1} onClick={handlePrevious}>
                Previous
            </button>
            <button disabled={page === pageCount} onClick={handleNext}>
                Next
            </button>
            <select
                value={page}
                onChange={(event) => {
                    setPage(event.target.value);
                }}
            >
                {Array(pageCount)
                    .fill(null)
                    .map((_, index) => {
                        return <option key={index}>{index + 1}</option>;
                    })}
            </select>
        </footer>


    </div>
}