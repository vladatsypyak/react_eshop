import React from "react";
import {Link, useNavigate} from "react-router-dom";

import {GlobalSvgSelector} from "../../../../assets/GlobalSvgSelector";
import s from "./search_section.module.scss"

import star from "../../../../assets/star .png"
import {useDispatch, useSelector} from "react-redux";
import {setItems} from "../../../../redux/slices/itemsSlice";


export const SearchSection = ({hideSearchResults, inputRef}) => {

    const items = useSelector(state => state.items.foundItems)
    const foundCategories = useSelector(state => state.categories.foundCategories)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchRef = React.useRef(null)

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !event.composedPath().includes(searchRef.current) && !event.composedPath().includes(inputRef.current)) {
                hideSearchResults()
            }
        }
        document.body.addEventListener("click", handleClickOutside)
        return () => {
            document.body.removeEventListener("click", handleClickOutside)
        }
    }, [])

    function onBtnClick() {
        dispatch(setItems(items))
        navigate("searchResultsPage")
        hideSearchResults()

    }

    return <div className={s.search_section_wrap}>
        <div className={s.overlay}></div>
        <div ref={searchRef} className={s.search_results}>
            <div className={s.categories_wrap}>
                {foundCategories.map(el => {
                    return <div className={s.category}>
                        <p>{el.value}</p>
                    </div>
                })}
            </div>
            <div className={s.items_wrap}>
                <h3 className={s.title}>Товари</h3>
                <div className={s.items}>
                    {items.map(el => {
                        return <Link className={s.item} to={`./items/${el._id}`}>
                            <img src={el.imgUrl} alt=""/>
                            <div className={s.info}>
                                <p>{el.title}</p>
                                <p>{el.price}</p>
                            </div>
                        </Link>

                    })}
                </div>
                <button onClick={onBtnClick} className={s.search_btn}>
                    Всі результати
                </button>
            </div>

        </div>

    </div>
}