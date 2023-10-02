import React from "react";
import {useDispatch} from "react-redux";
import {useParams, Outlet, NavLink} from "react-router-dom";
import {Signup} from "../../components/Auth/Signup/Signup";
import {Sidebar} from "../../components/Sidebar/sidebar";
import s from "./UserPage.module.scss"

export const UserPage = () => {
    const {page} = useParams()
    const dispatch = useDispatch()


    return <div className={s.user_page_wrapper}>
        <Sidebar/>
        <div className={s.content}>
            <Outlet/>
        </div>
    </div>

}