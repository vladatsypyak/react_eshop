import React, {useState} from "react";
import s from "./sort.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {setSortBy} from "../../redux/slices/filtersSlice";

export const sortList  = [
    {
        name: "популярністі",
        sortProperty: "rating"
    },
    {
        name: "зниженню ціни",
        sortProperty: "priceDESC"
    },
    {
        name: "зростанню ціни",
        sortProperty: "price"
    },
    {
        name: "даті",
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
    return <div className={s.sort}>
        <div className={s.sort__label}>
            <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                    fill="#2C2C2C"
                />
            </svg>
            Сортування по: <span onClick={() => setOpen(!open)}>{sort?.name}</span>
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