import React from "react";
import {Link, useNavigate} from "react-router-dom";

import {GlobalSvgSelector} from "../../../../assets/GlobalSvgSelector";
import s from "./search_section.module.scss"

import star from "../../../../assets/star .png"
import {useDispatch, useSelector} from "react-redux";
import {setItems} from "../../../../redux/slices/itemsSlice";
import {setCurrentCategory} from "../../../../redux/slices/categoriesSlice";


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

    function onCategoryClick(category) {
        dispatch(setCurrentCategory(category))
        hideSearchResults()

    }

    return <div className={s.search_section_wrap}>
        <div className={s.overlay}></div>
        <div ref={searchRef} className={s.search_results}>
            <div className={s.categories_wrap}>
                <h3 className={s.title}>Категорії</h3>

                {foundCategories.map(el => {
                    return <Link to={  `categories/${el.type}`} onClick={()=>onCategoryClick(el)} className={s.category}>
                        <img src={el.iconUrl} alt=""/>
                        <p>{el.value}</p>
                    </Link>
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