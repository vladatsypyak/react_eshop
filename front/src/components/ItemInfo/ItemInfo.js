import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export const ItemInfo = () => {
    const [item, setItem] = React.useState({})
    const {id} = useParams()
    useEffect( () => {
        const fetchItem = async () => {
            const {data} = await axios.get(`http://localhost:8080/api/app/item/${id}`)
            console.log(data)
            setItem(data)
            return data
        }
        fetchItem()

    }, [])


    return <div>
        {item.category}
    </div>


}