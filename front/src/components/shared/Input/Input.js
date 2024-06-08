import React from "react"
import s from "./input.module.scss"

export const Input = ({type, register, onChange, placeholder, value}) => {
    return <div className={s.input_wrap}>
        <input placeholder={placeholder} onChange={onChange} value={value} type={type} {...register}/>
    </div>
}