import React, {useState} from "react";
import s from "./images.module.scss"


export const Images = ({photos}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };
    console.log(photos)

    if (!photos) {
        console.log(1)
        return
    }

    return <div className={s.images}>
        <div className={s.thumbnail_list}>
            {photos && photos?.length > 1 && photos?.map((photo, index) => (
                <div
                    className={`${s.thumbnail} ${index === currentIndex ? s.active : ''}`}
                    onClick={() => handleThumbnailClick(index)}>
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
