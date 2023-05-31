import React, {useRef} from "react"
import s from "./search.module.scss"
import {GlobalSvgSelector} from "../../../assets/GlobalSvgSelector";
import {useDispatch} from "react-redux";
import {searchItems} from "../../../redux/slices/itemsSlice";
import {SearchSection} from "./SearchSection/SearchSection";
import {logDOM} from "@testing-library/react";


export const Search = () => {
    const dispatch = useDispatch()
    const [focused, setFocused] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")
    const [showResults, setShowResults] = React.useState(false)
    const inputRef = useRef()


    function hideSearchResults() {
        setShowResults(false)
    }


    function onInputChange(e) {
        setSearchValue(e.target.value)
        if (e.target.value) {
            setShowResults(true)
        } else {
            setShowResults(false)

        }
        dispatch(searchItems(e.target.value))
    }

    function onInputClick() {
        if (searchValue) {
            setShowResults(true)
        }
    }


    return <div className={s.search}>
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

        {showResults && <SearchSection inputRef={inputRef} hideSearchResults={hideSearchResults}/>}
    </div>
}