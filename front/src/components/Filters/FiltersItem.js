import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setFilters } from "../../redux/slices/filtersSlice";
import axios from "axios";
import s from "./filters.module.scss";

export const FiltersItem = ({ filter, filterName }) => {
    const currentChosenFilters = useSelector(
        (state) => state.filters.chosenFilters
    );
    const [values, setValues] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize loading state
    const dispatch = useDispatch();
    const currentCategory = useSelector(
        (store) => store.categories.currentCategory
    );

    useEffect(() => {
        const getFilterValues = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:8080/api/app/filters/${currentCategory.type}/${filter}`
                );
                setValues(data);
                setLoading(false); // Update loading state once data is fetched
            } catch (error) {
                console.error("Error fetching filter values:", error);
                setLoading(false); // Update loading state in case of an error
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
            {loading ? ( // Display loading indicator while data is being fetched
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
