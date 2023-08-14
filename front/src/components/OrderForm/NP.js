import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NovaPoshtaOffices = () => {
    const [offices, setOffices] = useState([]);

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const apiKey = 'eef0eb91b076fa27569b8ab843f5abab';
                const response = await axios.get(
                    `https://api.novaposhta.ua/v2.0/json/Address/getWarehouses?apiKey=${apiKey}`
                );
                setOffices(response.data.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching Nova Poshta offices:', error);
            }
        };

        fetchOffices();
    }, []);

    return (
        <div>
            <h1>Nova Poshta Offices</h1>
            <ul>
                {offices.map((office) => (
                    <li key={office.Description}>
                        {office.Description}, {office.City}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NovaPoshtaOffices;
