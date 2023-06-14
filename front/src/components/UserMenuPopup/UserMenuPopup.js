import React, {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import s from "./UserMenuPopup.module.scss"
import {Link, useLocation, useNavigate} from "react-router-dom";

export const UserMenuPopup = ({isShown, setIsShown}) => {
    const location = useLocation();
    const navigate = useNavigate();


    return <div className={s.menu}>
        {isShown &&
            <>
                <div className={s.overlay}></div>
                <div className={s.menu_wrap}>
                    <Link onClick={() => setIsShown(false)} to={"user/orders"}>Мої замовлення</Link>
                    <Link onClick={() => setIsShown(false)}>Дані</Link>
                    {/*<Link to={"/login/"} state={{ previousLocation: location }} onClick={()=> setIsShown(false)}>Вхід</Link>*/}
                    <p onClick={() => {
                        navigate('/login/', {state: {previousLocation: location}})
                    setIsShown(false)
                    }}>Log</p>


                </div>
            </>

        }


    </div>


}