import React from "react";
import {Slider} from "../../components/Slider/Slider";
import {Categories} from "../../components/CategoriesMainPage/Categories";
import {Outlet} from "react-router-dom";

export const Main = () => {

    return <div className={"main"}>
        <Slider/>
        <Categories/>

        {<Outlet/>}
    </div>
}