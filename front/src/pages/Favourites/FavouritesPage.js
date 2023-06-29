import React from "react";
import {Slider} from "../../components/Slider/Slider";
import {Categories} from "../../components/CategoriesMainPage/Categories";
import {Cart} from "../../components/Cart/Cart";
import {Favourites} from "../../components/Favourites/Favourites";
import {useSelector} from "react-redux";
import {loginUser} from "../../redux/slices/userSlice";
import {AskToAuth} from "../../components/Auth/AskToAuth/AskToAuth";
import {NoItems} from "../../components/NoItems/NoItems";

export const FavouritesPage = () => {
    const items = useSelector(state => state.items.favouriteItems)
    const user = useSelector(state => state.user.user)

    function isEmpty(obj) {
        return Object.values(obj).length !== 0;
    }
    return <div className={"favourites_page"}>
        <div className={"container"}>

            {isEmpty(user) && items?.length === 0 &&  <NoItems page={"favourites"}/> }
            {!isEmpty(user) && <AskToAuth page={"favourites"}/> }
            {isEmpty(user) && items?.length !== 0 && <Favourites/>}        </div>


    </div>
}