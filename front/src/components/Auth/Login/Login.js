import React, {useState} from "react";
import s from "./login.module.scss"
import {Input} from "../../shared/Input/Input";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../../../redux/slices/userSlice";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {setLogin, setSignup} from "../../../redux/slices/modalSlice";
import {Modal} from "../Modal";
import {GlobalSvgSelector} from "../../../assets/GlobalSvgSelector";


export const Login = () => {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch()
    const error = useSelector(state => state.user.isError)

    const onSubmit = async (data) => {
        const {password, email} = data
        try {
            await dispatch(loginUser({ email, password })).unwrap();
            dispatch(setLogin(false));
        } catch (err) {
            console.log(err);
        }


    }
    const onEmailChange = (e) => {
    }

    const onPasswordChange = (e) => {
    }
    const customNavigate = () => {
        dispatch(setSignup(true))
        dispatch(setLogin(false))

    }

    return <div className={s.login}>
        <Modal>
            <div className={s.login_wrap}>
                <button className={s.close} onClick={() => dispatch(setLogin(false))}><GlobalSvgSelector id={"cross"}/></button>

                <h3>Ввійдіть в свій аккаунт</h3>

                <form className={error ? `${s.error}` : ""} onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder={"email"} type={"email"} register={{...register("email", {required: true})}}
                           onChange={onEmailChange}/>
                    <Input placeholder={"пароль"} type={"text"} register={{...register("password", {required: true})}}
                           onChange={onPasswordChange}/>
                    {error && <p className={s.error_text}>Неправильний логін або пароль</p>}
                    <div className={s.submit}>
                        <Input type={"submit"}/>

                    </div>
                    <p>Do not have an account? <span onClick={customNavigate}>Register</span>
                    </p>
                </form>
            </div>
        </Modal>

    </div>
}