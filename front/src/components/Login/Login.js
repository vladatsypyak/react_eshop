import React from "react";
import s from "./login.module.scss"
import {Input} from "../shared/Input/Input";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../../redux/slices/userSlice";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";


export const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch()


    const onSubmit = (data) => {
        const {password, email} = data

        dispatch(loginUser({email, password}))


    }

    const onEmailChange = (e) => {
    }

    const onPasswordChange = (e) => {
    }
    const customNavigate = () => {
        // window.history.back(); // Navigate back to the previous page
        navigate('/signup/', {state: {previousLocation: location}});


    }

    return <div className={s.login}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input type={"email"} register={{...register("email", {required: true})}} onChange={onEmailChange}/>
            <Input type={"text"} register={{...register("password", {required: true})}} onChange={onPasswordChange}/>
            <Input type={"submit"}/>
            <p>Do not have an account?
                {/*<Link to={"/signup/"} state={{ previousLocation: location }} >Register</Link>*/}
                <p onClick={customNavigate}>Registrr</p>
            </p>
        </form>
    </div>
}