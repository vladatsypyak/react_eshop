import React from "react"
import s from "./input.module.scss"

export const Input = ({type, register, onChange, placeholder}) => {
    return <div className={s.input_wrap}>
        <input placeholder={placeholder} onChange={onChange} type={type} {...register}/>
    </div>
}