import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import s from "./UserMenuPopup.module.scss"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {setLogin} from "../../redux/slices/modalSlice";

export const UserMenuPopup = ({isShown, setIsShown}) => {
    const dispatch = useDispatch()


    return <div className={s.menu}>
        {isShown &&
            <>
                <div className={s.overlay}></div>
                <div className={s.container}>
                    <div className={`${s.menu_wrap} `}>
                        <p><Link onClick={() => setIsShown(false)} to={"user/orders"}>Мої замовлення</Link></p>
                        <p><Link onClick={() => setIsShown(false)}>Дані</Link></p>
                        <p onClick={() => {
                            dispatch(setLogin(true))
                            setIsShown(false)
                        }}>Вхід</p>


                    </div>
                </div>
            </>

        }


    </div>


}