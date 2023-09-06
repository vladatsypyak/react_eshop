import React from "react"
import s from "./categories.module.scss"
import {CategoriesItem} from "./CategoriesItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, selectCategories} from "../../redux/slices/categoriesSlice";
import {Amplify, Auth, Storage} from 'aws-amplify';


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
        imageUrl: "https://www.dropbox.com/s/81ae71hu5gfth9m/Rectangle%2044.png?raw=1",
        category: "Ноутбуки"
    },
    {
        imageUrl: "https://www.dropbox.com/s/81ae71hu5gfth9m/Rectangle%2044.png?raw=1",
        category: "Ноутбуки"
    },

]


export const Categories = () => {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.categories)

    const getCategories = async () => {
        dispatch(fetchCategories())


    }
    React.useEffect(() => {
        getCategories()
    }, [])
    React.useEffect(() => {
        console.log("mm")
        Storage.get("coffee.jpg").
        then(data=> console.log(data)

        )
    }, [])
    return <div className={s.categories}>
        {categories.map((el) => {
            return <CategoriesItem imageUrl={el.imageUrl} name={el.value} category={el.type}/>
        })}
    </div>
}