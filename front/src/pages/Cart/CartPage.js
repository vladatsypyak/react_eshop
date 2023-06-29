import React from "react";
import {Slider} from "../../components/Slider/Slider";
import {Categories} from "../../components/CategoriesMainPage/Categories";
import {Cart} from "../../components/Cart/Cart";
import {useSelector} from "react-redux";
import {NoItems} from "../../components/NoItems/NoItems";
import {Link} from "react-router-dom";
import {AskToAuth} from "../../components/Auth/AskToAuth/AskToAuth";

export const CartPage = () => {
    const items = useSelector(state => state.cart.items)
    const user = useSelector(state => state.user.user)

    function isEmpty(obj) {
        return Object.values(obj).length !== 0;
    }

    return <div className={"cart"}>
        <div className={"container"}>
            {isEmpty(user) && items?.length === 0 &&  <NoItems page={"cart"}/> }
            {!isEmpty(user) && <AskToAuth page={"cart"}/> }
            {isEmpty(user) && items?.length !== 0 && <Cart/>}
        </div>
    </div>
}