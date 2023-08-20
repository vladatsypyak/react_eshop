import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import s from "./orderForm.module.scss"


const apiKey = 'eef0eb91b076fa27569b8ab843f5abab';
const apiUrl = 'https://api.novaposhta.ua/v2.0/json/';


export const NPOfficeSelect = ({onChange, city}) => {
    const [currentCity, setCurrentCity] = useState(city); // Стан для відстеження поточного міста

    const fetchOffices = async (searchString) => {
        try {
            console.log(city)
            const response = await axios.post(apiUrl, {
                apiKey,
                modelName: 'Address',
                calledMethod: 'getWarehouses',
                methodProperties: {
                    CityName: currentCity,
                    Page: '1',
                    Limit: '10',
                    Language: 'UA',
                    FindByString: searchString,
                },
            });

            return response.data.data.map((office) => ({
                value: office.Description,
                label: office.Description,
            }));
        } catch (error) {
            console.error('Error fetching offices:', error);
            return [];
        }
    };


    const loadOptions = (inputValue, callback) => {
        fetchOffices(inputValue)
            .then((options) => {
                callback(options);
            })
            .catch((error) => {
                console.error('Error loading options:', error);
                callback([]);
            });
    };

    useEffect(() => {
        setCurrentCity(city);
    }, [city]);

    return (
        <AsyncSelect
            placeholder={"Номер або адреса відділеня"}
            classNames={{
                control: (state) =>
                    state.isFocused ? 'border-red-600' : 'border-grey-300',
            }} cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            onChange={(data) => {
                onChange(data)
            }}
        />
    );
};

