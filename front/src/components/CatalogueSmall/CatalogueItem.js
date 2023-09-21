import React from "react";
import {Link, useNavigate} from "react-router-dom";


import s from "./catalogue.module.scss"

export const CatalogueItem = ({item, hideCatalogue}) => {
    const navigate = useNavigate()

    function onClick(){
        navigate(`items/${item._id}`)
        hideCatalogue()
    }

    return <div onClick={onClick} className={s.catalogue_item}>
        <img alt={item.title} src={item.imgUrl}/>
    </div>
}