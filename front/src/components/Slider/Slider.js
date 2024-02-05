import React from "react";
import s from "./slider.module.scss"
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import {useNavigate} from "react-router-dom";

const imagesUrls = ["https://vlada-tea-images.s3.eu-north-1.amazonaws.com/%D0%B0%D0%BA%D1%86%D1%96%D1%8F3.png",
    "https://vlada-tea-images.s3.eu-north-1.amazonaws.com/%D0%B0%D0%BA%D1%86%D1%96%D1%8F5.jpg",
    "https://vlada-tea-images.s3.eu-north-1.amazonaws.com/%D0%B0%D0%BA%D1%86%D1%96%D1%8F.jpg"]
const sliderImages = [
    {
        imgUrl: "https://vlada-tea-images.s3.eu-north-1.amazonaws.com/%D0%B0%D0%BA%D1%86%D1%96%D1%8F3.png",
        link:`/categories/tea`
    },
    {
        imgUrl: "https://vlada-tea-images.s3.eu-north-1.amazonaws.com/%D0%B0%D0%BA%D1%86%D1%96%D1%8F5.jpg",
        link: `/categories/machines`
    },
    {
        imgUrl: "https://vlada-tea-images.s3.eu-north-1.amazonaws.com/%D0%B0%D0%BA%D1%86%D1%96%D1%8F.jpg",
        link: `items/654a21dd81cf89b949fea37c`
    }
]
export const Slider = () => {
    const navigate = useNavigate()
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
    function onSlideClick(index){
        navigate(sliderImages[index].link)
    }

    return <div className={s.slider}>
        <div className={s.wrap}>
            <button className={s.left} onClick={onPrevClick}>
                <GlobalSvgSelector id={"larrow"}/>

            </button>
            <div className={s.slide_image}>
                <img onClick={() =>onSlideClick(slideIndex)} src={sliderImages[slideIndex].imgUrl} alt=""/>

            </div>
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