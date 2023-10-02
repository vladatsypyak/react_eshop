import React from "react"
import s from "../Header/header.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {fetchCatalogueItems, fetchItems} from "../../redux/slices/itemsSlice";
import {CatalogueItem} from "./CatalogueItem";
import {useNavigate} from "react-router-dom";
import {setCurrentCategory} from "../../redux/slices/categoriesSlice";


export const Catalogue = ({hideCatalogue, btnRef}) => {
    const catalogueRef = React.useRef(null)
    const dispatch = useDispatch()

    const [showItems, setShowItems] = React.useState(false);
    const [activeCategory, setActiveCategory] = React.useState("")
    const items = useSelector(state => state.items.catalogueItems)

    const navigate = useNavigate()
    const categories = useSelector(state => state.categories.categories)

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (catalogueRef.current && !event.composedPath().includes(catalogueRef.current) && !event.composedPath().includes(btnRef.current)) {
                console.log(2)
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
        dispatch(fetchCatalogueItems([{name: "category", value: category.type}, {name: "sortBy", value: "date"}]))

    }

    function onLeave() {
        setShowItems(false)
    }
    function onIconClick(){
        dispatch(setCurrentCategory(activeCategory))
        navigate(`/categories/${activeCategory.type}`)
        hideCatalogue(true)
    }

    return <>
        <div className={s.overlay}></div>
        <div ref={catalogueRef} onMouseLeave={onLeave} className={s.catalogue}>
            <div className={s.catalogue_categories_wrap}>
                {categories.map((el) => {
                    return <div onClick={onIconClick} onMouseEnter={() => onCategoryHover(el)} className={s.catalogue_categorie}>
                        <img src={el.iconUrl} alt={el.value}/>
                        <p>{el.value}</p>
                        <GlobalSvgSelector id={"categorie_arrow"}/>
                    </div>
                })}
            </div>
            {showItems &&
                <div className={s.catalogue_items}>
                    {items.slice(0,9).map(el=> <CatalogueItem hideCatalogue={hideCatalogue}  item={el}/>)}
                </div>
            }
        </div>


    </>
}