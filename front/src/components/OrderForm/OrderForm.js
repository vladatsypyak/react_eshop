import React, {useEffect} from "react";
import {Form, useParams} from "react-router-dom";
import axios from "axios";
import s from "./orderForm.module.scss"
import {useSelector} from "react-redux";
import {Input} from "../shared/Input/Input";
import {useForm, Controller} from "react-hook-form";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {useState, useMemo} from 'react'
import {useRef} from "react";



export const OrderForm = () => {
    const {register, handleSubmit, control} = useForm();
    const user = useSelector(state => state.user.user)
    const [country, setCountry] = useState('ua')
    const [city, setCity] = useState('')

    const countryOptions = useMemo(() => countryList().getData(), [])

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: { country: country.value },
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["(cities)"]
    };
    useEffect(() => {
        console.log(country.value)
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            console.log({ place });
            setCity({ place })
        });
    }, [country]);

    const changeHandler = value => {
        setCountry(value)
    }
const onFormSubmit = (data)=>{
    console.log(data)
    console.log(city)
}

    return <div className={`container ${s.order_form_wrapper}`}>
        <h3>Оформлення замовлення</h3>
        <form onSubmit={handleSubmit(onFormSubmit)} >
            <div className={s.section}>
                <h4 className={s.title}>Контактні дані</h4>
                <div className={s.items_wrap}>
                    <div className={s.item}>
                        <p className={s.text}>Ім'я</p>
                        <input type="text" defaultValue={user.name}  {...register("name", {required: true})} />

                    </div>
                    <div className={s.item}>
                        <p className={s.text}>Прізвище</p>
                        <input type="text" defaultValue={user.surname}  {...register("surname", {required: true})}/>
                    </div>
                    <div className={s.item}>
                        <p className={s.text}>По батькові</p>
                        <input type="text"
                               defaultValue={user.patronymic} {...register("patronymic", {required: true})}/>
                    </div>
                    <div className={s.item}>
                        <p className={s.text}>Номер телефону</p>
                        <input type="text" defaultValue={user.phone}  {...register("phone", {required: true})}/>
                    </div>
                    <div className={s.item}>
                        <p className={s.text}>Email</p>
                        <input type="text" defaultValue={user.email}  {...register("email", {required: true})}/>
                    </div>
                </div>
            </div>
            <div className={s.section}>
                <h4 className={s.title}>Доставка</h4>
                <div className={s.items_wrap}>
                    <div className={s.item}>
                        <p className={s.text}>Країна</p>
                        <Controller
                            name="country"
                            control={control}
                            render={({ field: { onChange }, field: {value}}) => (
                                <Select
                                    options={countryOptions}
                                    value={value}
                                    onChange={(val) => {
                                        setCountry(val)
                                        onChange(val)
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div>
                        <label>enter address :</label>
                        <input type={"text"} ref={inputRef}  />
                    </div>
                    <button type={"submit"}>сабміт</button>
                </div>
            </div>

        </form>
    </div>


}