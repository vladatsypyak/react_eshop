import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import s from "./profile.module.scss"
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";


export const Profile = () => {

        const [isEditable, setIsEditable] = useState(false); // Стан для визначення, чи можна редагувати поля

        const handleEditClick = () => {
            setIsEditable(true);
        };

        return <div className={` container`}>
            <div className={s.profile_wrapper}>
                <div className={s.section}>
                    <div className={s.icon}>
                        <GlobalSvgSelector id={"user_icon"}/>
                    </div>
                    <div className={s.content}>
                        <h3 className={s.title}>Особисті дані</h3>
                        <div className={s.info}>
                            <div className={s.info_item}>
                                <p className={s.label}>Прізвище</p>
                                {isEditable ? (
                                    <input className={s.text} type="text" defaultValue="Цюпяк"/>
                                ) : (
                                    <p className={s.text}>Цюпяк</p>
                                )}
                            </div>
                            <div className={s.info_item}>
                                <p className={s.label}>Ім’я</p>
                                {isEditable ? (
                                    <input className={s.text} type="text" defaultValue="Цюпяк"/>
                                ) : (
                                    <p className={s.text}>Цюпяк</p>
                                )}
                            </div>
                            <div className={s.info_item}>
                                <p className={s.label}>По батькові</p>
                                {isEditable ? (
                                    <input className={s.text} type="text" defaultValue="Цюпяк"/>
                                ) : (
                                    <p className={s.text}>Цюпяк</p>
                                )}
                            </div>
                            <div className={s.info_item}>
                                <p className={s.label}>Дата народження</p>
                                {isEditable ? (
                                    <input className={s.text} type="date" defaultValue="01.02.2002"/>
                                ) : (
                                    <p className={s.text}>01.02.2002</p>
                                )}
                            </div>
                            <div className={s.info_item}>
                                <p className={s.label}>Стать</p>
                                {isEditable ? (
                                    <select className={s.text} type="text" defaultValue="Жіноча">
                                        <option value="female">Жіноча</option>
                                        <option value="male">чоловіча</option>

                                    </select>
                                ) : (
                                    <p className={s.text}>Жіноча</p>
                                )}
                            </div>

                        </div>
                        {isEditable ? (
                            <button className={`${s.disabled} ${s.edit_btn}`} disabled>Редагувати</button>
                        ) : (
                            <button className={s.edit_btn} onClick={handleEditClick}>Редагувати</button>
                        )}
                    </div>

                </div>
            </div>
        </div>


}