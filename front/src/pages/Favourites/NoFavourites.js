import React from "react";
import {Slider} from "../../components/Slider/Slider";
import {Categories} from "../../components/CategoriesMainPage/Categories";
import {Cart} from "../../components/Cart/Cart";
import {Favourites} from "../../components/Favourites/Favourites";
import {Link} from "react-router-dom";

export const NoFavourites = () => {

    return <div className={"no_favourites"}>
        <div className={"container"}>
            <p>Немає вподобань</p>
            <Link to={"/"}>На головну</Link>
        </div>


    </div>
}