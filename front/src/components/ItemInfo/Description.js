import s from "./itemInfo.module.scss";
import React from "react";
import {capitalize} from "../../helpers/helpers";

export function Description({item}) {
    return <>
        {
            item.description ?
                <div className={s.description}>
                    <h3 className={s.title}>Опис</h3>
                    <div className={s.text}>
                        {Array.isArray(item.description) ?
                            item.description.map(el => {
                                return (
                                    <div>
                                        <p className={s.subtitle}>{capitalize(el.title)}</p>
                                        {Array.isArray(el.text) ? el.text.map(item => <p>{item}</p>)
                                            : <p>{el.text}</p>}
                                    </div>
                                )
                            })
                            : <p className={s.text}>{item.description.text}</p>}
                    </div>
                </div>
                : null
        }
    </>
}