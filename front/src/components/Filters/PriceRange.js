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
        }
    }, 200);


    React.useEffect(() => {
        dispatch(fetchMaxMin([...currentChosenFilters, {name: "category", value: category}, {
            name: "sortBy",
            value: sortBy.sortProperty
        }]))
    }, [category, currentChosenFilters])

    React.useEffect(() => {
        dispatch(setPriceRange(maxAndMin))
    }, [maxAndMin])


    function onMinInputChange(e) {
        if(!Number(e.target.value)){
            return
        }
        if(e.target.value > maxAndMin[1]){
            dispatch(setPriceRange([maxAndMin[1], priceRange[1]]))
        } else{
            dispatch(setPriceRange([e.target.value, priceRange[1]]))

        }
    }
    function onMaxInputChange(e) {
        if(!Number(e.target.value)){
            return
        }
        if(String(e.target.value).length === String(maxAndMin[0]).length && e.target.value < maxAndMin[0]){
            dispatch(setPriceRange([priceRange[0], maxAndMin[0]] ))
        } else{
            dispatch(setPriceRange([ priceRange[0], e.target.value]))
        }
    }

    return (
        <div className={s.price_wrap}>
            <h3> Ціна </h3>
            <Slider
                min={maxAndMin[0]}
                max={maxAndMin[1]}
                value={priceRange} onChange={handleChanges} valueLabelDisplay="auto"/>
            <div className={s.values}>
                <input onChange={(e) => onMinInputChange(e)} value={priceRange[0]}/> -
                <input onChange={(e) => onMaxInputChange(e)} value={priceRange[1]}/>
            </div>
        </div>
    );
}

export default PriceRange;

