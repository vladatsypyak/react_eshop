import React from "react"
import s from "./search.module.scss"
import {GlobalSvgSelector} from "../../../assets/GlobalSvgSelector";
import {useDispatch} from "react-redux";
import {searchItems} from "../../../redux/slices/itemsSlice";
import {SearchSection} from "./SearchSection/SearchSection";


export const Search = () => {
    const dispatch = useDispatch()
    const [focused, setFocused] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")
    function onInputChange(e){
        setSearchValue(e.target.value)
        dispatch(searchItems(e.target.value))
    }

    return <div className={s.search}>
        <div className={s.input_wrap}>
            <input onFocus={()=>setFocused(true)}
                   onBlur={()=>setFocused(false)}
                   onChange={onInputChange}
                   type="text"
                   placeholder={"Пошук"}/>
            {!focused && !searchValue &&
                <div className={s.search_icon}>

                    <GlobalSvgSelector id={"search_icon"}/>
                </div>
            }
        </div>

        {searchValue && <SearchSection/>}
    </div>
}