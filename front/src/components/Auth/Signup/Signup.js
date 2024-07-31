import React from "react";
import s from "./signup.module.scss"
import form from "../form.module.scss"
import {Input} from "../../shared/Input/Input";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {registerUser} from "../../../redux/slices/userSlice";
import {setLogin, setSignup} from "../../../redux/slices/modalSlice";
import {Modal} from "../Modal";
import {GlobalSvgSelector} from "../../../assets/GlobalSvgSelector";

export const Signup = () => {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch()
    const onSubmit = (data) => {
        console.log(data)
        const {password, repeatPassword, email, name, surname, patronymic, birthdate, gender} = data
        if (password === repeatPassword) {
            dispatch(registerUser({email, password, name, surname, patronymic, birthdate, gender}))
            dispatch(setLogin(true))
            dispatch(setSignup(false))
        }
    }


    return <div className={s.signup}>
        <Modal>
            <div className={`${form.form_wrap}`}>
                <button className={form.close} onClick={() => dispatch(setSignup(false))}><GlobalSvgSelector id={"cross"}/>
                </button>
                <h3>Зареєструйтесь</h3>
                <form className={form.form} onSubmit={handleSubmit(onSubmit)}>

                    <div className={s.field}>
                        <p className={s.asterisk}>*</p>
                        <Input type={"email"} placeholder={"email"} register={{...register("email", {required: true})}}
                        />
                    </div>
                    <div className={s.field}>
                        <p className={s.asterisk}>*</p>
                        <Input type={"text"} placeholder={"пароль"}
                               register={{...register("password", {required: true})}}
                        />
                    </div>
                    <Input type={"text"} placeholder={"повторіть пароль"}
                           register={{...register("repeatPassword", {required: true})}}
                    />
                    <Input type={"text"} placeholder={"прізвище"} register={{...register("surname")}}/>
                    <Input type={"text"} placeholder={"ім'я"} register={{...register("name")}}
                    />
                    <Input type={"text"} placeholder={"по батькові"}
                           register={{...register("patronymic")}}/>
                    <Input type={"date"} placeholder={"дата народження"}
                           register={{...register("birthdate")}}
                    />
                    <label className={s.label}>Стать: </label>
                    <select {...register("gender")} className={s.text} defaultValue="Жіноча">
                        <option value="female">Жіноча</option>
                        <option value="male">чоловіча</option>
                    </select>
                    <div className={form.submit}>
                        <Input type={"submit"}/>
                    </div>
                </form>
            </div>
        </Modal>

    </div>
}