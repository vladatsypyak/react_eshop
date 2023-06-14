import React from "react";
import s from "./signup.module.scss"
import {Input} from "../shared/Input/Input";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {registerUser} from "../../redux/slices/userSlice";
import {useNavigate} from "react-router-dom";

export const Signup = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate()
    const [password, setPassword] = React.useState("")
    const [repeatPassword, setRepeatPassword] = React.useState("")
    const dispatch = useDispatch()
    const [email, setEmail] = React.useState("")
    const onSubmit = (data) => {
        const {password, repeatPassword, email } = data
        if (password ===repeatPassword) {
            dispatch(registerUser({email, password}))
            navigate("/user/login")

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

    return <div className={s.signup}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input type={"email"} register={{...register("email", {required: true})}} onChange={onEmailChange}/>
            <Input type={"text"} register={{...register("password", {required: true})}} onChange={onPasswordChange}/>
            <Input type={"text"} register={{...register("repeatPassword", {required: true})}}
                   onChange={onRepeatPasswordChange}/>
            <Input type={"submit"}/>


            {/*<input onChange={onPasswordChange} type={"text"} {...register("password",  { required: true })} />*/}
            {/*<input onChange={onRepeatPasswordChange} type={"text"} {...register("repeatPassword",  { required: true })} />*/}
            {/*<input type="submit" />*/}
        </form>
    </div>
}