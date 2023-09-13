import React from "react";
import Slider from "@mui/material/Slider";
import {useDispatch, useSelector} from "react-redux";
import {deletePriceFilter, setFilters, setPriceFilters, setPriceRange} from "../../redux/slices/filtersSlice";
import {useState} from "react";
import debounce from 'lodash.debounce';
import {setItems} from "../../redux/slices/itemsSlice";


function PriceRange() {
    const items = useSelector(state => state.items.items)
    const filters = useSelector(state => state.filters.allFilters)
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
    // React.useEffect(() => {
    //     if (items.length > 0) {
    //         const minPrice = getMinPrice(items);
    //         const maxPrice = getMaxPrice(items);
    //         // setRange([minPrice, maxPrice]);
    //         // dispatch(setPriceRange([minPrice, maxPrice]))
    //         setMin(minPrice);
    //         setMax(maxPrice);
    //     }
    //     setLoading(false); // Update loading state once data is fetched
    //
    //     return () => {
    //         dispatch(deletePriceFilter())
    //     }
    // }, [filters])
    React.useEffect(() => {
        console.log(5)
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
            console.log("delete")
            dispatch(deletePriceFilter())
            dispatch(setPriceRange([0, 0]))
            dispatch(setItems([]))

        }
    }, [loading])

    return (
        <div style={{width: "150px"}}>
            <h3> Price </h3>
            {!loading && <Slider
                min={min}
                max={max}
                value={priceRange} onChange={handleChanges} valueLabelDisplay="auto"/>}
            The selected range is {priceRange[0]} - {priceRange[1]}
        </div>
    );
}

export default PriceRange;