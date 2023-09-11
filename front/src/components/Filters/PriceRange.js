import React from "react";
import Slider from "@mui/material/Slider";
import {useSelector} from "react-redux";

function PriceRange() {
    const [range, setRange] = React.useState([0, 0]);
    const items = useSelector(state => state.items.items)

    function getMaxPrice(arr) {
        let prices = arr.map(el => el.price)
        return Math.max(...prices)
    }

    function getMinPrice(arr) {
        let prices = arr.map(el => el.price)
        return Math.min(...prices)
    }


    function handleChanges(event, newValue) {
        setRange(newValue);
    }

    React.useEffect(() => {
        console.log(items)
        setRange([getMinPrice(items), getMaxPrice(items)])
    }, [items])
    return (
        <div style={{width: "150px"}}>
            <h3> Price </h3>
            <Slider value={range} onChange={handleChanges} valueLabelDisplay="auto"/>
            The selected range is {range[0]} - {range[1]}
        </div>
    );
}

export default PriceRange;