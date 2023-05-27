import React, {useState} from "react";
import s from "./sort.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {setSortBy} from "../../redux/slices/filtersSlice";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";

export const sortList  = [
    {
        name: "По популярності",
        sortProperty: "rating"
    },
    {
        name: "По зниженню ціни",
        sortProperty: "priceDESC"
    },
    {
        name: "По зростанню ціни",
        sortProperty: "price"
    },
    {
        name: "По даті",
        sortProperty: "date"
    },

]

export const Sort = () => {
    const dispatch = useDispatch()
    const sort = useSelector(state => state.filters.sortBy)
    const [open, setOpen] = useState(false);
    const sortRef = React.useRef(null)
    const onSortItemClick = (i) => {
        console.log(i.name)
        dispatch(setSortBy(i))
        setOpen(!open)
    }

    React.useEffect(() => {
        const handleClickOutside = (event) => {

            if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
                setOpen(false)
            }
        }
        document.body.addEventListener("click", handleClickOutside)

        return () => {
            document.body.removeEventListener("click", handleClickOutside)
        }
    }, [])

    return <div ref={sortRef} className={s.sort}>
        <div onClick={() => setOpen(!open)} className={s.sort__label}>
             <span >{sort?.name}</span>
            { open ? <GlobalSvgSelector id={"sort_arrow_up"} /> :<GlobalSvgSelector id={"sort_arrow_down"} />  }
        </div>
        {
            open && (
                <div className={s.sort_popup}>
                    <ul>
                        {
                            sortList.map((obj, i) => {
                                return <li key={i} onClick={() => onSortItemClick(obj)}
                                           className={obj.sortProperty === sort.sortProperty ? `${s.active}` : ""}>{obj.name}</li>
                            })
                        }


                    </ul>
                </div>
            )
        }

    </div>

}