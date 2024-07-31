import React from "react";
import s from "./modal.module.scss"
import {Overlay} from "../../Overlay/Overlay";



export const Modal = ({children}) => {
    return <div className={s.modal}>
        <div className={s.overlay}>
            <Overlay/>
        </div>
       <div className={s.modal_wrap}>
           {children}
       </div>
    </div>
}