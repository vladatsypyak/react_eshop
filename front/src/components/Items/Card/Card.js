import React from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GlobalSvgSelector} from "../../../assets/GlobalSvgSelector";

export const Card = ({item}) => {

    return <div className={"card"}>
        <img src={item.imgUrl} alt=""/>
        <p>{item.title}</p>
        <button><GlobalSvgSelector id={"cart_icon"}/></button>

    </div>
}