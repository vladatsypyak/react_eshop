import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import s from "../profile.module.scss"
import {GlobalSvgSelector} from "../../../assets/GlobalSvgSelector";
import {editProfile} from "../../../redux/slices/userSlice";



export const Contacts = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const [isEditable, setIsEditable] = useState(false); // Стан для визначення, чи можна редагувати поля
    const [userInfo, setUserInfo] = useState({});

    const handleEditClick = () => {
        setIsEditable(true);
    };
    const onSubmit = () => {
        console.log(userInfo)
        dispatch(editProfile(userInfo))
        setIsEditable(false)
    }


    return    <div className={s.section}>
                <div className={s.icon}>
                    <GlobalSvgSelector id={"user_icon"}/>
                </div>
                <div className={s.content}>
                    <h3 className={s.title}>Контактні дані</h3>
                    <div className={s.info}>
                        <div className={s.info_item}>
                            <p className={s.label}>email</p>
                            {isEditable ? (
                                <input className={s.text} type="email" defaultValue={user.email}
                                       onChange={(e) => setUserInfo(() => {
                                           return {...userInfo, email: e.target.value}
                                       })}
                                />
                            ) : (
                                <p className={s.text}>{user.email}</p>
                            )}
                        </div>
                        <div className={s.info_item}>
                            <p className={s.label}>Телефон</p>
                            {isEditable ? (
                                <input className={s.text} type="text" defaultValue={user.phone}
                                       onChange={(e) => setUserInfo(() => {
                                           return {...userInfo, phone: e.target.value}
                                       })}/>
                            ) : (
                                <p className={s.text}>{user.phone}</p>
                            )}
                        </div>

                    </div>
                    {isEditable ? (
                        <button className={`${s.disabled} ${s.edit_btn}`} disabled>Редагувати</button>
                    ) : (
                        <button className={s.edit_btn} onClick={handleEditClick}>Редагувати</button>
                    )}
                    {isEditable && <button className={s.submit} onClick={onSubmit}>Save</button>}

                </div>

            </div>



}