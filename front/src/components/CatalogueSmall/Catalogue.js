import React from "react"
import s from "../Header/header.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {fetchItems} from "../../redux/slices/itemsSlice";
import {CatalogueItem} from "./CatalogueItem";


export const Catalogue = ({hideCatalogue, btnRef}) => {
    const catalogueRef = React.useRef(null)
    const dispatch = useDispatch()

    const [showItems, setShowItems] = React.useState(false);
    const [activeCategory, setActiveCategory] = React.useState("")
    const items = useSelector(state => state.items.items)
    console.log(items)
    const categories = useSelector(state => state.categories.categories)

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (catalogueRef.current && !event.composedPath().includes(catalogueRef.current) && !event.composedPath().includes(btnRef.current)) {
                hideCatalogue()
            }
        }
        document.body.addEventListener("click", handleClickOutside)
        return () => {
            document.body.removeEventListener("click", handleClickOutside)
        }
    }, [])

    function onCategoryHover(category) {
        setActiveCategory(category)
        setShowItems(true)
        console.log(category)
        dispatch(fetchItems([{name: "category", value: category.type}, {name: "sortBy", value: "date"}]))

    }

    function onLeave() {
        setShowItems(false)
    }

    return <div className={s.catalogue_wrap}>
        <div className={s.overlay}></div>


        <div ref={catalogueRef} onMouseLeave={onLeave} className={s.catalogue}>
            <div className={s.catalogue_categories_wrap}>
                {categories.map((el) => {
                    return <div onMouseEnter={() => onCategoryHover(el)} className={s.catalogue_categorie}>
                        <img src={el.iconUrl} alt={el.value}/>
                        <p>{el.value}</p>
                        <GlobalSvgSelector id={"categorie_arrow"}/>
                    </div>
                })}
            </div>
            {showItems &&
                <div className={s.catalogue_items}>
                    {items.map(el=> <CatalogueItem hideCatalogue={hideCatalogue}  item={el}/>)}
                </div>
            }
        </div>


    </div>
}