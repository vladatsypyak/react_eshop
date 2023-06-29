import React from "react";
import {Slider} from "../../components/Slider/Slider";
import {Categories} from "../../components/CategoriesMainPage/Categories";
import {Cart} from "../../components/Cart/Cart";
import {Favourites} from "../../components/Favourites/Favourites";
import {useSelector} from "react-redux";
import {NoFavourites} from "./NoFavourites";
import {loginUser} from "../../redux/slices/userSlice";

export const FavouritesPage = () => {
    const items = useSelector(state => state.items.favouriteItems)
    console.log(items)
    return <div className={"favourites_page"}>
        <div className={"container"}>

            {items ? <Favourites/> : <NoFavourites/> }
        </div>


    </div>
}