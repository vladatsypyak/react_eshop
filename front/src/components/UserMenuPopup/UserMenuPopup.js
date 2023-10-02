import React, {useEffect, useRef} from "react";

import {useDispatch, useSelector} from "react-redux";
import s from "./UserMenuPopup.module.scss"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {setLogin} from "../../redux/slices/modalSlice";
import {logout} from "../../redux/slices/userSlice";

export const UserMenuPopup = ({isShown, setIsShown, usermenuRef}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    function isEmpty(obj) {
        return Object.values(obj).length === 0;
    }
    const menuRef = useRef()

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !event.composedPath().includes(menuRef.current) && !event.composedPath().includes(usermenuRef.current)) {
                setIsShown(false)
            }
        }
        document.body.addEventListener("click", handleClickOutside)
        return () => {
            document.body.removeEventListener("click", handleClickOutside)
        }
    }, [])

    return <>
        {isShown &&

            <>
                <div className={s.overlay}></div>

                {/*<div  className={s.container}>*/}
                    <div ref={menuRef} className={`${s.menu_wrap}  `}>
                        <p><Link onClick={() => setIsShown(false)} to={"user/orders"}>Мої замовлення</Link></p>
                        <p><Link onClick={() => setIsShown(false)} to={"user/profile"}>Дані</Link></p>
                        {isEmpty(user) ? <p onClick={() => {
                                dispatch(setLogin(true))
                                // navigate("/login")
                                setIsShown(false)
                            }}>Вхід</p>
                            : <p onClick={() => dispatch(logout())}>Вихід</p>

                        }


                    </div>
                {/*</div>*/}
            </>

        }


    </>


}