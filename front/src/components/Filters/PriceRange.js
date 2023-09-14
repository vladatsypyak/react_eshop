import React from "react";
import Slider from "@mui/material/Slider";
import {useDispatch, useSelector} from "react-redux";
import {deletePriceFilter, setFilters, setPriceFilters, setPriceRange} from "../../redux/slices/filtersSlice";
import {useState} from "react";
import debounce from 'lodash.debounce';
import {setItems} from "../../redux/slices/itemsSlice";
import s from "./filters.module.scss"


function PriceRange() {
    const items = useSelector(state => state.items.items)
    const dispatch = useDispatch()
    const [min, setMin] = React.useState(0);
    const [max, setMax] = React.useState(0);
    const [loading, setLoading] = useState(true); // Initialize loading state
    const priceRange = useSelector(state => state.filters.priceRange)
    console.log(items)

    function getMaxPrice(arr) {
        let prices = arr.map(el => el.price)
        return Math.max(...prices)
    }

    function getMinPrice(arr) {
        let prices = arr.map(el => el.price)
        return Math.min(...prices)
    }

    const handleChanges = debounce((event, newValue) => {
        if (Array.isArray(newValue) && newValue.length === 2) {
            dispatch(setPriceRange(newValue));
            dispatch(setPriceFilters({name: "priceMin", value: newValue[0]}));
            dispatch(setPriceFilters({name: "priceMax", value: newValue[1]}));
        }
    }, 200);

    React.useEffect(() => {
        if (items.length > 0) {
            setLoading(false); // Update loading state once data is fetched
        }
    }, [items])
    React.useEffect(() => {
        const minPrice = getMinPrice(items);
        const maxPrice = getMaxPrice(items);
        dispatch(setPriceRange([minPrice, maxPrice]))
        setMin(minPrice);
        setMax(maxPrice);
        return () => {
            dispatch(deletePriceFilter())
            dispatch(setPriceRange([0, 0]))
            dispatch(setItems([]))
        }
    }, [loading])

    return (
        <div className={s.price_wrap} >
            <h3> Ціна </h3>
            {!loading && <Slider
                min={min}
                max={max}
                value={priceRange} onChange={handleChanges} valueLabelDisplay="auto"/>}
          <div className={s.values}><p>{priceRange[0]}</p> - <p>{priceRange[1]}</p></div>
        </div>
    );
}

export default PriceRange;