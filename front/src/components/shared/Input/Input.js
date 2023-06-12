import React from "react"
import s from "./input.module.scss"

export const Input = ({type, register, onChange}) => {
    return <div className={s.input_wrap}>
        <input onChange={onChange} type={type} {...register}/>
    </div>
}