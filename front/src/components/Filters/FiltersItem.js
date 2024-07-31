import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/slices/filtersSlice";
import axios from "axios";
import s from "./filters.module.scss";
import {apiUrl} from "../../config";

export const FiltersItem = ({ filter, filterName }) => {
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const currentCategory = useSelector(
        (store) => store.categories.currentCategory
    );

    useEffect(() => {
        const getFilterValues = async () => {
            try {
                const { data } = await axios.get(
                    `${apiUrl}/api/categories/${currentCategory.type}/filters/${filter}`
                );
                setValues(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching filter values:", error);
                setLoading(false);
            }
        };
        getFilterValues();
    }, [currentCategory.type, filter]);

    const handleFilterChange = (e) => {
        dispatch(setFilters({ name: filter, value: e.target.value }));
    };

    return (
        <div className={s.filtersItem_wrap}>
            <p className={s.title}>{filterName}</p>
            {loading ? (
                <p>Loading filter values...</p>
            ) : (
                values.map((el) => (
                    <div className={s.filter_values} key={el}>
                        <label>
                            <input
                                onChange={handleFilterChange}
                                type="checkbox"
                                value={el}
                            />
                            {el}
                        </label>
                    </div>
                ))
            )}
        </div>
    );
};
