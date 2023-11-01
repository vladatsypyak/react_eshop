import React, {useEffect, useState} from "react";
import s from "./images.module.scss"


import Gallery from 'react-image-gallery';

import Slider from 'react-slick';


export const Images = ({photos, defaultImg}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };
    console.log(photos)

    if (!photos ) {
        console.log(1)
        return
    }
    // if (!photos ){
    //     console.log(2)
    //     return  <div className={s.main_image}>
    //         <img src={defaultImg} alt=""/>
    //     </div>
    // }


    return <div className={s.images}>
        <div className={s.thumbnail_list}>
            {photos && photos?.length > 1 && photos?.map((photo, index) => (
                <div
                    className={`${s.thumbnail} ${index === currentIndex ? s.active : ''}`}
                    onClick={()=> handleThumbnailClick(index)}>
                    <img src={photo} alt="Thumbnail"/>
                </div>))
            }
        </div>
        <div className={s.main_image}>
            <img src={photos[currentIndex]} alt=""/>
        </div>
    </div>


}
export default Images;
