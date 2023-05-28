import React from "react";
import {Slider} from "../../components/Slider/Slider";
import {Categories} from "../../components/CategoriesMainPage/Categories";
import {Cart} from "../../components/Cart/Cart";

export const CartPage = () => {

    return <div className={"cart"}>
        <div className={"container"}>
            <Cart/>
        </div>


    </div>
}