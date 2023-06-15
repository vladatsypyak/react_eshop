import React from "react";
import s from "./modal.module.scss"



export const Modal = ({children}) => {
    return <div className={s.modal}>
        <div className={s.overlay}></div>
       <div className={s.modal_wrap}>
           {children}
       </div>
    </div>
}