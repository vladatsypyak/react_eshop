import React from "react"
import s from "./header.module.scss"
import {useSelector} from "react-redux";
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";


export const Catalogue = ({hideCatalogue, btnRef}) => {
    const catalogueRef = React.useRef(null)

    const [showItems, setShowItems] = React.useState(false);
    const [activeCategory, setActiveCategory] = React.useState("")

    const categories = useSelector(state => state.categories.categories)

    React.useEffect(() => {
        const handleClickOutside = (event) => {

            if (catalogueRef.current && !event.composedPath().includes(catalogueRef.current) && !event.composedPath().includes(btnRef.current)) {
                hideCatalogue()
            }
            // if(catalogueRef.current && !catalogueRef.current.contains(event.target)) {
            //         hideCatalogue()
            // }
        }
        document.body.addEventListener("click", handleClickOutside)

        return () => {
            document.body.removeEventListener("click", handleClickOutside)
        }
    }, [])

    function onCategoryHover(category){
        setActiveCategory(category)
        setShowItems(true)
    }
    function onLeave(){
        setShowItems(false)
    }
    return <div className={s.catalogue_wrap}>
        <div className={s.overlay}> </div>


      <div ref={catalogueRef} onMouseLeave={onLeave} className={s.catalogue}>
          <div className={s.catalogue_categories_wrap}>
              {categories.map((el) => {
                  return <div  onMouseEnter={()=>onCategoryHover(el.value)} className={s.catalogue_categorie}>
                      <img src={el.iconUrl} alt={el.value}/>
                      <p>{el.value}</p>
                      <GlobalSvgSelector id={"categorie_arrow"}/>
                  </div>
              })}
          </div>
          {showItems &&
              <div className={s.catalogue_items}>
                  {activeCategory}
              </div>
          }
      </div>



    </div>
}