import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import s from "./profile.module.scss"
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {editProfile} from "../../redux/slices/userSlice";


export const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const [isEditable, setIsEditable] = useState(false); // Стан для визначення, чи можна редагувати поля
    const [name, setName] = useState(user.name);
    const [userInfo, setUserInfo] = useState({});
    const [surname, setSurname] = useState(user.surname);
    const [patronymic, setPatronymic] = useState(user.patronymic);
    const [gender, setGender] = useState(user.gender);
    const [birthdate, setBirthdate] = useState(user.name);


    const handleEditClick = () => {
        setIsEditable(true);
    };
    const onSubmit = () => {
        console.log(userInfo)
        dispatch(editProfile(userInfo))
        setIsEditable(false)
    }


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
                                <input className={s.text} type="text" defaultValue={user.surname}
                                       onChange={(e) => setUserInfo(() => {
                                           return {...userInfo, surname: e.target.value}
                                       })}
                                />
                            ) : (
                                <p className={s.text}>{user.surname}</p>
                            )}
                        </div>
                        <div className={s.info_item}>
                            <p className={s.label}>Ім’я</p>
                            {isEditable ? (
                                <input className={s.text} type="text" defaultValue={user.name}
                                       onChange={(e) => setUserInfo(() => {
                                           return {...userInfo, name: e.target.value}                                       })}/>
                            ) : (
                                <p className={s.text}>{user.name}</p>
                            )}
                        </div>
                        <div className={s.info_item}>
                            <p className={s.label}>По батькові</p>
                            {isEditable ? (
                                <input  className={s.text} type="text" defaultValue={user.patronymic}
                                        onChange={(e) => setUserInfo(() => {
                                            return {...userInfo, patronymic: e.target.value}                                        })}/>
                            ) : (
                                <p className={s.text}>{user.patronymic}</p>
                            )}
                        </div>
                        <div className={s.info_item}>
                            <p className={s.label}>Дата народження</p>
                            {isEditable ? (
                                <input onChange={(e) => setUserInfo(() => {
                                    return {...userInfo, birthdate: e.target.value}                                })} className={s.text} type="date" defaultValue={user.birthdate}/>
                            ) : (
                                <p className={s.text}>{user.birthdate}</p>
                            )}
                        </div>
                        <div className={s.info_item}>
                            <p className={s.label}>Стать</p>
                            {isEditable ? (
                                <select className={s.text} defaultValue={user.gender} onChange={(e) => setUserInfo(() => {
                                    return {...userInfo, gender: e.target.value}                                })}>
                                    <option value="female">Жіноча</option>
                                    <option value="male">чоловіча</option>

                                </select>
                            ) : (
                                <p className={s.text}>{user.gender}</p>
                            )}

                        </div>

                    </div>
                    {isEditable ? (
                        <button className={`${s.disabled} ${s.edit_btn}`} disabled>Редагувати</button>
                    ) : (
                        <button className={s.edit_btn} onClick={handleEditClick}>Редагувати</button>
                    )}
                </div>
                {isEditable &&                     <button className={s.submit} onClick={onSubmit}>submit</button>
                }

            </div>
        </div>
    </div>


}