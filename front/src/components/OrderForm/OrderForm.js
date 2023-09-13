import React, {useEffect} from "react";
import {Form, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import s from "./orderForm.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {useForm, Controller} from "react-hook-form";
import {useState, useMemo} from 'react'
import {useRef} from "react";
import PhoneInput from "react-phone-number-input";
import {Outlet, NavLink} from "react-router-dom";
import {setOrderData} from "../../redux/slices/cartSlice";
import {NPOfficeSelect} from "./asyncNP";
import NovaPoshtaOffices from "./NP";


export const OrderForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {register, handleSubmit, control} = useForm();

    const user = useSelector(state => state.user.user)

    const [city, setCity] = useState('Київ')
    const [phone, setUserPhone] = useState(user.phone);

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
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            console.log({ place });
            setCity(place.name)
        });
    }, [city]);


    const onFormSubmit = (data) => {
        console.log(data)
        dispatch(setOrderData({
                ...data, city
            })
        )
        navigate("/orderform/confirm")
    }

    return <div className={`container ${s.order_form_wrapper}`}>
        <h3>Оформлення замовлення</h3>
        <form onSubmit={handleSubmit(onFormSubmit)}>
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
                        <p className={s.text}>Phone</p>
                        <Controller
                            defaultValue={phone}
                            name="phone"
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    value={value}
                                    onChange={(val) => {
                                        setUserPhone(val)
                                        onChange(val)
                                    }}
                                    international={true}
                                    defaultCountry={"UA"}
                                />
                            )}
                        />
                    </div>
                    <div className={s.item}>
                        <p className={s.text}>Email</p>
                        <input type="text" defaultValue={user.email}  {...register("email", {required: true})}/>
                    </div>
                </div>
            </div>
            <div className={`${s.section} ${s.delivery}`}>
                <h4 className={s.title}>Доставка</h4>
                <div className={s.items_wrap}>
                    <div className={s.item}>
                        <p className={s.text}>Введіть свій населений пункт :</p>
                        <input type={"text"} ref={inputRef}  />
                    </div>
                    <div className={s.item}>
                        <p className={s.text}>Введіть адрес відділення Нової пошти :</p>

                        <Controller
                            name="npWarehous"
                            control={control}
                            render={({field: {onChange}, field: {value}}) => (
                                <NovaPoshtaOffices
                                    city={city}
                                    onChange={(val)=>{
                                        onChange(val.value)
                                    }}/>
                            )}
                        />


                    </div>

                </div>




            </div>
            <div className={s.btn_wrap}>
                <button className={s.submit} type={"submit"}>Підтвердити</button>

            </div>

        </form>
        <Outlet/>
    </div>


}