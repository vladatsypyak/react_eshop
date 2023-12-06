import React from "react";
import s from "./modal.module.scss"
import {Overlay} from "../Overlay/Overlay";



export const Modal = ({children}) => {

    // React.useEffect(() => {
    //     document.body.style.overflow = "hidden";
    //     return () => {
    //         document.body.style.overflow = "scroll"
    //     };
    // }, []);
    return <div className={s.modal}>
        <div className={s.overlay}>
            <Overlay/>
        </div>
       <div className={s.modal_wrap}>
           {children}
       </div>
    </div>
}