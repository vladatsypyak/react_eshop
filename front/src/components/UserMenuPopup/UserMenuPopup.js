import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import s from "./UserMenuPopup.module.scss"
import {Link} from "react-router-dom";

export const UserMenuPopup = ({isShown, setIsShown}) => {


    return <div className={s.menu}>
        {isShown &&
            <>
                <div className={s.overlay}></div>
                <div className={s.menu_wrap}>
                    <Link onClick={()=> setIsShown(false)} to={"user/orders"}>Мої замовлення</Link>
                    <Link onClick={()=> setIsShown(false)}>Дані</Link>
                    <Link to={"user/login"} onClick={()=> setIsShown(false)}>Вхід</Link>

                </div>
            </>

        }



    </div>


}