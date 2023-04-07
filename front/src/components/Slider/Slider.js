import React from "react";
import s from "./slider.module.scss"
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";

const imagesUrls = ["https://www.dropbox.com/s/w17bw23vwi35d7d/44840-1680608871.jpg?raw=1", "https://www.dropbox.com/s/rem7egzgc73pu2a/44903-1680774523.jpg?raw=1", "https://www.dropbox.com/s/2i6d2phhissysmg/image%201%20%283%29.png?raw=1"]
export const Slider = () => {
    const [slideIndex, setSlideIndex] = React.useState(0);

    function onPrevClick() {
        if (slideIndex !== 0) {
            setSlideIndex(slideIndex - 1)
        } else if (slideIndex === 0) {
            setSlideIndex(imagesUrls.length - 1)
        }

    }

    function onNextClick() {
        if (slideIndex !== imagesUrls.length - 1) {
            setSlideIndex((slideIndex) => slideIndex + 1)
        } else {
            setSlideIndex(0)
        }
    }
    function onDotClick(i) {
        setSlideIndex(i)
    }

    return <div className={s.slider}>
        <div className={s.wrap}>
            <button className={s.left} onClick={onPrevClick}>
                <GlobalSvgSelector id={"larrow"}/>

            </button>
            <img className={s.slide_image} src={imagesUrls[slideIndex]} alt=""/>
            <button className={s.right} onClick={onNextClick}>
                <GlobalSvgSelector id={"rarrow"}/>
            </button>

        </div>
        <div className={s.dots}>
            {imagesUrls.map((el, i) => {
                let classNameValue = s.dot
                if (i === slideIndex) {
                    classNameValue = `${s.dot} ${s.active} `
                }
                    return <div onClick={() => onDotClick(i)} className={classNameValue}></div>

            })}
        </div>


    </div>
}