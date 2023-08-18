import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import Select from "react-select";
import debounce from 'lodash.debounce';
import AsyncSelect from 'react-select/async';



const NovaPoshtaOffices = ({onChange}) => {
    const [offices, setOffices] = useState([]);
    const [office, setOffice] = useState("");
    const [str, setStr] = useState("");
    console.log(str)




    const fetchOffices = async (searchString) => {
        try {
            const apiKey = 'eef0eb91b076fa27569b8ab843f5abab';
            const response = await axios.post(
                `https://api.novaposhta.ua/v2.0/json/`,
                {
                    apiKey: 'eef0eb91b076fa27569b8ab843f5abab',
                    modelName: 'Address',
                    calledMethod: 'getWarehouses',
                    methodProperties: {
                        CityName: 'Київ',
                        Page: '1',
                        Limit: '50',
                        Language: 'UA',
                        FindByString: searchString,
                    },
                }
            );
            setOffices(response.data.data);
        } catch (error) {
            console.error('Error fetching Nova Poshta offices:', error);
        }
    };

    const debouncedFetchOffices = debounce(fetchOffices, 300);

    useEffect(() => {
        debouncedFetchOffices(str);
        return () => {
            debouncedFetchOffices.cancel(); // Cleanup debounce on unmount
        };
    }, [str]);
    const options = useMemo(
        () =>
            offices.map((el) => {
                return { value: el.Description, label: el.Description };
            }),
        [offices]
    );
    return (
        <div>
            {/*<input onChange={(e)=> setStr(e.target.value)} value={str}/>*/}
            {/*<select onChange={el =>{*/}
            {/*    console.log(el)*/}
            {/*    setStr(el.Description)*/}
            {/*}} >*/}
            {/*    {offices.map((office) => (*/}
            {/*        <option key={office.Description}>*/}
            {/*            {office.Description}, {office.CityDescription}*/}
            {/*        </option>*/}
            {/*    ))}*/}
            {/*</select>*/}
            <Select
                options={offices.map(el => {
                    return {value: el.Description, label: el.Description}
                })}
                // value={str}
                onInputChange={(val) => {
                    setStr(val)
                }}
                onChange={(val)=>{
                    console.log(val)
                    setStr(val.value)
                    onChange(val)

                }}
                placeholder={"Виберіть країну"}
            />
        </div>
    );
};

export default NovaPoshtaOffices;
