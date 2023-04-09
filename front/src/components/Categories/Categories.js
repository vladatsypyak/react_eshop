import React from "react"
import s from "./categories.module.scss"
import {CategoriesItem} from "./CategoriesItem";

const categoriesMock = [
    {
        imageUrl: "https://www.dropbox.com/s/81ae71hu5gfth9m/Rectangle%2044.png?raw=1",
        category: "Ноутбуки"
    },
    {
        imageUrl: "https://www.dropbox.com/s/81ae71hu5gfth9m/Rectangle%2044.png?raw=1",
        category: "Ноутбуки"
    }, {
        imageUrl: "https://www.dropbox.com/s/81ae71hu5gfth9m/Rectangle%2044.png?raw=1",
        category: "Ноутбуки"
    }, {
        imageUrl: "https://www.dropbox.com/s/81ae71hu5gfth9m/Rectangle%2044.png?raw=1",
        category: "Ноутбуки"
    },
    {
        imageUrl : "https://www.dropbox.com/s/81ae71hu5gfth9m/Rectangle%2044.png?raw=1",
        category: "Ноутбуки"
    },
    {
        imageUrl : "https://www.dropbox.com/s/81ae71hu5gfth9m/Rectangle%2044.png?raw=1",
        category: "Ноутбуки"
    },

]


export const Categories = () => {
    return <div className={s.categories}>
        {categoriesMock.map((el) => {
            return <CategoriesItem imageUrl={el.imageUrl} category={el.category}/>
        })}
    </div>
}