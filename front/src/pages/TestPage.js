import React from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";



export const TestPage = ({component}) => {


    return <div className={` container`}>
        <p>test</p>
        {component}
    </div>

}