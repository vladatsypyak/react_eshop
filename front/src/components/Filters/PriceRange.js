import React from "react";
import Slider from "@mui/material/Slider";
import {useDispatch, useSelector} from "react-redux";
import {deletePriceFilter, setFilters, setPriceFilters, setPriceRange} from "../../redux/slices/filtersSlice";
import {useState} from "react";
import debounce from 'lodash.debounce';
import {setItems} from "../../redux/slices/itemsSlice";
import s from "./filters.module.scss"
import {useParams} from "react-router-dom";


function PriceRange() {
    const {category} = useParams()
    const items = useSelector(state => state.items.items)
    const dispatch = useDispatch()
    const [min, setMin] = React.useState(0);
    const [max, setMax] = React.useState(0);
    const [loading, setLoading] = useState(true); // Initialize loading state
    const [ready, setReady] = useState(false); // Initialize loading state

    const priceRange = useSelector(state => state.filters.priceRange)
    const fetched = useSelector(state => state.items.fetched)

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
        console.log(1)
        if (fetched && items.length > 0) {
            console.log("here")
            setReady(true); // Update loading state once data is fetched
        }
    }, [fetched, items])
    React.useEffect(() => {
        setReady(false)
    }, [category])

    React.useEffect(() => {
        if(fetched){
            const minPrice = getMinPrice(items);
            const maxPrice = getMaxPrice(items);
            dispatch(setPriceRange([minPrice, maxPrice]))
            setMin(minPrice);
            setMax(maxPrice);
        }
        return () => {
            console.log(5)
            dispatch(deletePriceFilter())
            dispatch(setPriceRange([0, 0]))
            dispatch(setItems([]))
        }

    }, [ready])


    return (
        <div className={s.price_wrap}>
            <h3> Ціна </h3>
            {ready && <Slider
                min={min}
                max={max}
                value={priceRange} onChange={handleChanges} valueLabelDisplay="auto"/>}
            <div className={s.values}><p>{priceRange[0]}</p> - <p>{priceRange[1]}</p></div>
        </div>
    );
}

export default PriceRange;

