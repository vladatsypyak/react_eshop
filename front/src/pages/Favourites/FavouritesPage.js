import React from "react";
import {Slider} from "../../components/Slider/Slider";
import {Categories} from "../../components/CategoriesMainPage/Categories";
import {Cart} from "../../components/Cart/Cart";
import {Favourites} from "../../components/Favourites/Favourites";

export const FavouritesPage = () => {

    return <div className={"favourites_page"}>
        <div className={"container"}>
            <Favourites/>
        </div>


    </div>
}