import React from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {Orders} from "../../components/Order/Orders";


export const UserPage = () => {
    const {page} = useParams()
    console.log(page)
    const dispatch = useDispatch()
    let component
    switch (page) {
        case  "orders" :
            component = <Orders/>
            break;
        case "info": return
    }

    return <div className={` container`}>
        {component}
    </div>

}