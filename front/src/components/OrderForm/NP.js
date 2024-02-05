import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import Select from "react-select";
import debounce from 'lodash.debounce';
import AsyncSelect from 'react-select/async';
import s from "./orderForm.module.scss"


const NovaPoshtaOffices = ({onChange, city, error}) => {
    console.log(error)
    const [offices, setOffices] = useState([]);
    const [str, setStr] = useState("");
    const [loading, setLoading] = useState(false);
    const fetchOffices = async (searchString) => {
        setLoading(true);

        try {
            const apiKey = 'eef0eb91b076fa27569b8ab843f5abab';
            const response = await axios.post(
                `https://api.novaposhta.ua/v2.0/json/`,
                {
                    apiKey: apiKey,
                    modelName: 'Address',
                    calledMethod: 'getWarehouses',
                    methodProperties: {
                        CityName: city,
                        Page: '1',
                        Limit: '10',
                        Language: 'UA',
                        FindByString: searchString,
                    },
                }
            );
            setOffices(response.data.data);
        } catch (error) {
            console.error('Error fetching Nova Poshta offices:', error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchOffices = debounce(fetchOffices, 300);

    useEffect(() => {
        debouncedFetchOffices(str);
        return () => {
            debouncedFetchOffices.cancel(); // Cleanup debounce on unmount
        };
    }, [str, city]);
    const baseStyles = error ? `${s.error} ${s.select} ` : s.select
    const options = useMemo(
        () =>
            offices.map((el) => {
                return {value: el.Description, label: el.Description};
            }),
        [offices]
    );


    return (
        <div>
            <Select
                options={offices.map(el => {
                    return {value: el.Description, label: el.Description}
                })}
                onInputChange={(val) => {
                    setStr(val)
                }}
                onChange={(val) => {
                    setStr(val.value)
                    onChange(val)

                }}
                isLoading={loading}
                placeholder={"Виберіть країну"}

                classNames={
                    {

                        control: (state) => {
                            let focusedStyle = state.isFocused ? `${s.focused} ${s.select}  ` : ` ${s.select}  `
                            return focusedStyle + baseStyles
                        }
                    }}
            />


        </div>
    );
};

export default NovaPoshtaOffices;
