import React from "react";
import s from "./askToAuth.module.scss"
import lock from "../../../assets/lock.png"
import bg from "../../../assets/cart_bg.png"
import {useDispatch} from "react-redux";
import {setLogin, setSignup} from "../../../redux/slices/modalSlice";

export const AskToAuth = ({page}) => {
    const dispatch = useDispatch()
    const pageText = page === "cart" ? "корзину" : "збережені"

    function onLoginClick() {
        dispatch(setLogin(true))
    }

    function onSignUpClick() {
        dispatch(setSignup(true))
    }
    let background = page === "cart" ? bg : null

    return <div className={s.ask_to_auth}>
        <div className={s.background}>
            <img src={background} alt=""/>
        </div>
       <div className={s.lock_wrap}>
           <img src={lock} alt=""/>
           <p>Щоб переглянути {pageText} <span onClick={onLoginClick}>увійдіть в наявний аккаунт</span>,<br/> або <span
               onClick={onSignUpClick}>зареєструйтеся</span></p>
       </div>
    </div>
}