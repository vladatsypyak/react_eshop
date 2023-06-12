import React from "react";
import s from "./login.module.scss"
import {Input} from "../shared/Input/Input";
import {Link} from "react-router-dom";


export const Login = () => {

    return <div className={s.login}>
        <p>login</p>
        <input type="email"/>
        <div className={s.input}>
            <Input/>
        </div>
        <p>Don`t have an account? <Link to={"/user/signup"}>Sign Up</Link></p>
    </div>
}