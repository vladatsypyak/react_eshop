import React from "react";
import s from "./signup.module.scss"
import {Input} from "../../shared/Input/Input";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {registerUser} from "../../../redux/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {setLogin, setSignup} from "../../../redux/slices/modalSlice";
import {Modal} from "../Modal";
import {GlobalSvgSelector} from "../../../assets/GlobalSvgSelector";

export const Signup = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate()
    const [password, setPassword] = React.useState("")
    const [repeatPassword, setRepeatPassword] = React.useState("")
    const dispatch = useDispatch()
    const [email, setEmail] = React.useState("")
    const onSubmit = (data) => {
        console.log(data)
        const {password, repeatPassword, email, name, surname, patronymic, birthdate, gender} = data
        if (password === repeatPassword) {
            dispatch(registerUser({email, password, name, surname, patronymic, birthdate, gender}))
            dispatch(setLogin(true))
            dispatch(setSignup(false))

        }

    }

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value)
    }
    const onDateChange = (e) => {
        setRepeatPassword(e.target.value)
    }

    return <div className={s.signup}>
        <Modal>
            <div className={s.signup_wrap}>
                <button className={s.close} onClick={() => dispatch(setSignup(false))}><GlobalSvgSelector id={"cross"}/>
                </button>
                <h3>Зареєструйтесь</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input type={"email"} placeholder={"email"} register={{...register("email", {required: true})}}
                           onChange={onEmailChange}/>
                    <Input type={"text"} placeholder={"пароль"} register={{...register("password", {required: true})}}
                           onChange={onPasswordChange}/>
                    <Input type={"text"} placeholder={"повторіть пароль"}
                           register={{...register("repeatPassword", {required: true})}}
                           onChange={onRepeatPasswordChange}/>
                    <Input type={"text"} placeholder={"прізвище"} register={{...register("surname", {required: true})}}/>
                        <Input type={"text"} placeholder={"ім'я"} register={{...register("name", {required: true})}}
                        />
                        <Input type={"text"} placeholder={"по батькові"}
                               register={{...register("patronymic", {required: true})}}/>
                        <Input type={"date"} placeholder={"дата народження"}
                               register={{...register("birthdate", {required: true})}}
                               onChange={onPasswordChange}/>
                        <select {...register("gender", {required: true})} className={s.text} defaultValue="Жіноча">
                            <option value="female">Жіноча</option>
                            <option value="male">чоловіча</option>

                        </select>
                        <div className={s.submit}>
                            <Input type={"submit"}/>

                        </div>
                </form>
            </div>
        </Modal>

    </div>
}