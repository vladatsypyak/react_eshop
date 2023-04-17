import React from "react";
import {Slider} from "../../components/Slider/Slider";
import {Categories} from "../../components/CategoriesMainPage/Categories";
import {useParams} from "react-router-dom";

export const Category = () => {
const {category} =useParams()
    console.log(category)
    return <div className={"category"}>
        <p>category</p>


    </div>
}