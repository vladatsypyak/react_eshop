import React, {useRef} from "react"
import s from "./search.module.scss"
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {useDispatch, useSelector} from "react-redux";
import {searchItems} from "../../redux/slices/itemsSlice";
import {SearchSection} from "./SearchSection/SearchSection";
import {searchCategories} from "../../redux/slices/categoriesSlice";
import {setSearchValue} from "../../redux/slices/filtersSlice";


export const Search = () => {
    const dispatch = useDispatch()
    const sortBy = useSelector(state => state.filters.sortBy)
    const [focused, setFocused] = React.useState(false)
    const [showResults, setShowResults] = React.useState(false)
    const inputRef = useRef()
    const searchValue = useSelector(state => state.filters.searchValue)


    function hideSearchResults() {
        setShowResults(false)
    }


    function onInputChange(e) {
        dispatch(setSearchValue(e.target.value))
        if (e.target.value) {
            setShowResults(true)
        } else {
            setShowResults(false)

        }
        dispatch(searchItems({title: e.target.value, sortBy: sortBy.sortProperty}))
        dispatch(searchCategories(e.target.value))
    }

    function onInputClick() {
        if (searchValue) {
            setShowResults(true)
        }
    }


    return <>
        <div className={`${s.search} search`}>
            <div className={s.input_wrap}>
                <input ref={inputRef} onFocus={() => setFocused(true)}
                       onBlur={() => setFocused(false)}
                       onChange={onInputChange}
                       onClick={onInputClick}

                       type="text"
                       placeholder={"Пошук"}/>
                {!focused && !searchValue &&
                    <div className={s.search_icon}>
                        <GlobalSvgSelector id={"search_icon"}/>
                    </div>
                }
            </div>

        </div>
        {showResults && <SearchSection inputRef={inputRef} hideSearchResults={hideSearchResults}/>}
    </>

}