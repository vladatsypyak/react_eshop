import React, {useEffect} from "react";
import {Form, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import s from "./orderForm.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {Input} from "../shared/Input/Input";
import {useForm, Controller} from "react-hook-form";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import {useState, useMemo} from 'react'
import {useRef} from "react";
import PhoneInput from "react-phone-number-input";
import {Outlet, NavLink} from "react-router-dom";
import {setOrderData} from "../../redux/slices/cartSlice";
import NovaPoshtaOffices from "./NP";


export const OrderForm = () => {
    const {register, handleSubmit, control} = useForm();
    const user = useSelector(state => state.user.user)
    const [country, setCountry] = useState({value: "ua"})
    const [city, setCity] = useState('')
    const [npWarehouse, setNpWarehouse] = useState('')

    const [phone, setUserPhone] = useState(user.phone);
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')


    const countryList = [{value: "ua", label: "Україна"}, {value: "pl", label: "Польща"}]

    const autoCompleteRef = useRef();
    const autoCompleteRef2 = useRef();

    const inputRef = useRef();
    const streetRef = useRef();

    const navigate = useNavigate()

    const options = {
        // componentRestrictions: { country: country.value },
        // fields: ["address_components", "geometry", "icon", "name"],
        // types: ["(cities)"]
    };
    const streetOptions = {
        componentRestrictions: {country: country.value},
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["address"]
    };

    useEffect(() => {
        autoCompleteRef2.current = new window.google.maps.places.Autocomplete(
            streetRef.current,
            streetOptions
        );
        autoCompleteRef2.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef2.current.getPlace();
            // console.log({ place });
            setAddress({place})
            // console.log(place.address_components.map(el => el.long_name).join(","))
        });
    }, [city]);

    const changeHandler = value => {
        setCountry(value)
    }
    const onFormSubmit = (data) => {
        console.log({...data, ...address, placeStr: address.place.address_components.map(el => el.long_name).join(",")})
        console.log(address)
        console.log(npWarehouse)
        dispatch(setOrderData({
                ...data, ...address,
                placeStr: address.place.address_components.map(el => el.long_name).join(",")
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
                        <p className={s.text}>Країна</p>
                        <Controller
                            name="country"
                            // Provide the default value for the input field

                            control={control}
                            render={({field: {onChange}, field: {value}}) => (
                                <Select
                                    options={countryList}
                                    value={value}
                                    onChange={(val) => {
                                        setCountry(val)
                                        onChange(val)
                                    }}
                                    placeholder={"Виберіть країну"}
                                />
                            )}
                        />
                    </div>

                    <div className={s.item}>
                        <p className={s.text}>Введіть свою адресу :</p>
                        <input placeholder={"Київ, вул. Шевченка 30"} type={"text"} ref={streetRef}/>
                    </div>
                    {/*<div className={s.item}>*/}
                    {/*    <p className={s.text}>Введіть свій населений пункт :</p>*/}
                    {/*    <input type={"text"} ref={inputRef}  />*/}
                    {/*</div>*/}

                </div>
                <Controller
                    name="npWarehous"
                    // Provide the default value for the input field

                    control={control}
                    render={({field: {onChange}, field: {value}}) => (
                        <NovaPoshtaOffices onChange={(val)=>{
                            console.log(val)
                            setNpWarehouse(val)
                            onChange(val)
                        }}/>

                    )}
                />


                {/*<NovaPoshtaOffices/>*/}

            </div>
            <div className={s.btn_wrap}>
                <button className={s.submit} type={"submit"}>Підтвердити</button>

            </div>

        </form>
        <Outlet/>
    </div>


}