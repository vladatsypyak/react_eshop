import React from "react";
import {Outlet} from "react-router-dom";
import {Sidebar} from "../../components/Sidebar/sidebar";
import s from "./UserPage.module.scss"

export const UserPage = () => {


    return <div className={s.user_page_wrapper}>
        <Sidebar/>
        <div className={s.content}>
            <Outlet/>
        </div>
    </div>

}