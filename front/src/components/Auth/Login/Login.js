import React from "react";
import s from "./login.module.scss"
import form from "../form.module.scss"
import {Input} from "../../shared/Input/Input";
import {loginUser, registerUser} from "../../../redux/slices/userSlice";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {setLogin, setSignup} from "../../../redux/slices/modalSlice";
import {Modal} from "../../shared/Modal/Modal";
import {GlobalSvgSelector} from "../../../assets/GlobalSvgSelector";
import {apiUrl} from "../../../config";


export const Login = () => {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch()
    const error = useSelector(state => state.user.isError)

    const onSubmit = async (data) => {
        const {password, email} = data
        try {
            await dispatch(loginUser({email, password})).unwrap();
            dispatch(setLogin(false));
        } catch (err) {
            console.log(err);
        }


    }

    const customNavigate = () => {
        dispatch(setSignup(true))
        dispatch(setLogin(false))

    }

    const googleAuth = () => {
        window.open(
            `${apiUrl}/auth/google/callback`,
            "_self"
        );
    };


    return <div className={s.login}>
        <Modal>
            <div className={form.form_wrap}>

                <button className={form.close} onClick={() => dispatch(setLogin(false))}><GlobalSvgSelector id={"cross"}/>
                </button>

                <h3>Ввійдіть в свій аккаунт</h3>

                <form className={error ? `${form.error}` : `${form.form}`} onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder={"email"} type={"email"} register={{...register("email", {required: true})}}
                    />
                    <Input placeholder={"пароль"} type={"text"} register={{...register("password", {required: true})}}
                    />
                    {error && <p className={form.error_text}>Неправильний логін або пароль</p>}
                    <div className={form.submit}>
                        <Input type={"submit"} value={"Підтвердити"}/>

                    </div>
                    <div className={s.google}>
                        <div className={s.or_container}>
                            <div className={s.line_separator}></div>
                            <div className={s.or_label}>або</div>
                            <div className={s.line_separator}></div>
                        </div>

                        <button onClick={googleAuth}>
                            <img src="https://img.icons8.com/color/16/000000/google-logo.png"/>
                            Ввійти з Google
                        </button>
                    </div>
                    <p className={s.register_link}>Не маєте аккаунту? <span
                        onClick={customNavigate}>Зареєструватися</span>
                    </p>
                </form>
            </div>


        </Modal>
    </div>
}