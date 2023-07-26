import React, {useEffect} from "react";
import {Form, useParams} from "react-router-dom";
import axios from "axios";
import s from "./orderForm.module.scss"
import {useSelector} from "react-redux";
import {Input} from "../shared/Input/Input";
import {useForm} from "react-hook-form";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import  { useState, useMemo } from 'react'
import { useRef } from "react";



export const OrderForm = () => {
    const {register, handleSubmit} = useForm();

    const user = useSelector(state => state.user.user)
    const [country, setCountry] = useState('')
    const countryOptions = useMemo(() => countryList().getData(), [])

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: { country: "ua" },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["(cities)"]
    };
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
    }, []);
    const changeHandler = value => {
        setCountry(value)
    }
const onFormSubmit = (data)=>{

}

    return <div className={`container ${s.order_form_wrapper}`}>
        <h3>Оформлення замовлення</h3>
        <form >
            <div className={s.section}>
                <h4 className={s.title}>Контактні дані</h4>
               <div className={s.items_wrap}>
                   <div className={s.item}>
                       <p className={s.text}>Ім'я</p>
                       <input type="text" defaultValue={user.name}  {...register} />

                   </div>
                   <div className={s.item}>
                       <p className={s.text}>Прізвище</p>
                       <input type="text" defaultValue={user.surname}  {...register}/>
                   </div>
                   <div className={s.item}>
                       <p className={s.text}>По батькові</p>
                       <input type="text" defaultValue={user.patronymic}  {...register}/>
                   </div>
                   <div className={s.item}>
                       <p className={s.text}>Номер телефону</p>
                       <input type="text" defaultValue={user.phone}  {...register}/>
                   </div>
                   <div className={s.item}>
                       <p className={s.text}>Email</p>
                       <input type="text" defaultValue={user.email}  {...register}/>
                   </div>
               </div>
            </div>
            <div className={s.section}>
                <h4 className={s.title}>Доставка</h4>
                <div className={s.items_wrap}>
                    <div className={s.item}>
                        <p className={s.text}>Країна</p>
                        <Select options={countryOptions} value={country} onChange={changeHandler} />

                    </div>

                    <div>
                        <label>enter address :</label>
                        <input ref={inputRef} {...register} />
                    </div>
                    <button type={"submit"}></button>
                </div>
            </div>

        </form>
    </div>


}