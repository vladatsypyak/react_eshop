import React, {useEffect, useState} from "react";
import {setPage} from "../../redux/slices/itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import s from "./pagination.module.scss"

export const Pagination = () => {
    const pageTotal = useSelector(state => state.items.pageCount)
    const page = useSelector(state => state.items.page)
    const [pageCount, setPageCount] = useState(0);
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
    return (
        <nav className={s.pagination}>
            <ul className={"pagination justify-content-center"}>
                <li onClick={handlePrevious} className={page === 1 ? "page-item disabled" : "page-item"}>
                    <a className="page-link" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
                </li>
                {Array(pageCount)
                    .fill(null)
                    .map((_, index) => {
                        return <li
                            onClick={() => {
                                dispatch(setPage(index + 1))
                                console.log(page)
                                console.log(index)
                            }}
                            className={page === index + 1  ? `page-item active ${s.active}` : "page-item"}
                            key={index}>
                            <a className={"page-link"}>{index + 1}</a>
                        </li>;
                    })}
                <li onClick={handleNext} className={page === pageCount ? "page-item disabled" : "page-item"}>
                    <a className="page-link"><span aria-hidden="true">&raquo;</span></a>
                </li>
            </ul>

        </nav>
    )


}