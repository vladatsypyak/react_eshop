import React from "react";
import Slider from "@mui/material/Slider";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchMaxMin,
    setPriceFilters,
    setPriceRange
} from "../../redux/slices/filtersSlice";
import debounce from 'lodash.debounce';
import s from "./filters.module.scss"
import {useParams} from "react-router-dom";


function PriceRange() {
    const {category} = useParams()
    const dispatch = useDispatch()
    const priceRange = useSelector(state => state.filters.priceRange)
    const maxAndMin = useSelector(state => state.filters.maxAndMin)
    const currentChosenFilters = useSelector(state => state.filters.chosenFilters)
    const sortBy = useSelector(state => state.filters.sortBy)

    const handleChanges = debounce((event, newValue) => {
        if (Array.isArray(newValue) && newValue.length === 2) {
            dispatch(setPriceRange(newValue));
            // dispatch(setPriceFilters({name: "priceMin", value: newValue[0]}));
            // dispatch(setPriceFilters({name: "priceMax", value: newValue[1]}));
        }
    }, 200);


    React.useEffect(() => {
        dispatch(fetchMaxMin([...currentChosenFilters, {name: "category", value: category}, {name: "sortBy", value: sortBy.sortProperty}]))
    }, [category, currentChosenFilters])

    React.useEffect(() => {
        dispatch(setPriceRange(maxAndMin))
    }, [maxAndMin])


    return (
        <div className={s.price_wrap}>
            <h3> Ціна </h3>
             <Slider
                min={maxAndMin[0]}
                max={maxAndMin[1]}
                value={priceRange} onChange={handleChanges} valueLabelDisplay="auto"/>
            <div className={s.values}><p>{priceRange[0]}</p> - <p>{priceRange[1]}</p></div>
        </div>
    );
}

export default PriceRange;

