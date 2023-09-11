import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import s from "./itemInfo.module.scss"
import {GlobalSvgSelector} from "../../assets/GlobalSvgSelector";
import star from "../../assets/star .png"
import {LikeBtn} from "../Favourites/LikeBtn/LikeBtn";
import {useDispatch, useSelector} from "react-redux";
import {deleteCartItem, getAllCartItems, putToCart, removeOneFromCart} from "../../redux/slices/cartSlice";

export const ItemInfo = () => {
    const [item, setItem] = React.useState({})
    const allCartItems = useSelector(state => state.cart.items)
    const [quantityInCart, setQuantityInCart] = React.useState(0)
    const [quantityOnBtn, setQuantityOnBtn] = React.useState(0)

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const {id} = useParams()

    React.useEffect(() => {
        dispatch(getAllCartItems({userId: user._id}))
    }, [])

    React.useEffect(() => {
        let cartItem = allCartItems?.find(el => el.itemId === id)
        if (cartItem) {
            setQuantityInCart(cartItem.quantity)
            setQuantityOnBtn(cartItem.quantity)
        }
    }, [allCartItems])


    function onPlusClick() {
        setQuantityInCart(() => quantityInCart + 1)
    }

    useEffect(() => {
        const fetchItem = async () => {
            const {data} = await axios.get(`http://localhost:8080/api/app/item/${id}`)
            setItem(data)
            return data
        }
        fetchItem()

    }, [])
    console.log(item)

    function onMinusClick() {
        if (quantityInCart !== 0) {
            setQuantityInCart(() => quantityInCart - 1)
        }

    }

    function onAddToCartClick() {
        setQuantityOnBtn(quantityInCart)
        dispatch(putToCart({userId: user._id, itemId: id, quantity: quantityInCart}))

    }

    return <div>
        <div className={s.main_info_wrap}>
            <img src={item.imgUrl}/>
            <div className={s.main_info_text}>
                <h2 className={s.title}>{item.title}</h2>
                <p className={s.price}>{item.price}грн/ <span>1шт</span></p>
                <div className={s.rating}> {item.rating}
                    <img src={star} alt=""/>
                </div>
                <div className={s.add_to_cart_wrap}>
                    <div className={s.quantity}>
                        <p className={s.btn} onClick={onMinusClick}>-</p>
                        <p>{quantityInCart}</p>
                        <p className={s.btn} onClick={onPlusClick}>+</p>
                    </div>
                    <button onClick={onAddToCartClick}>
                        <div className={s.quantityInBtn}>
                            <p>
                                {quantityOnBtn}
                            </p></div>
                        До кошика
                    </button>
                </div>
                {item.ingredients &&
                    <p className={s.info}><span>Склад: </span>{item.ingredients}</p>

                }
                {/*<p className={s.info}><span>Вага упаковки: </span>100 грамів.</p>*/}
                {/*<p className={s.info}><span>Країна: </span>Індія</p>*/}
                <div className={s.favourite_wrap}>
                    <LikeBtn itemId={item._id} isText={true}/>
                </div>
            </div>


        </div>
        <div className={`${s.details} container`}>
            <h3 className={s.title}>Опис</h3>
            <p className={s.text}>{item.description}</p>
           <div className={s.characteristics_wrap}>
               <h3 className={s.title}>Характеристики</h3>
               {item.characteristics?.map((el) => {
                   if (Array.isArray(el.value)) {
                       return <div className={s.characteristics}>
                           <p className={s.characteristics_title}>{el.title.toLowerCase()}:</p>
                           <ul>{el.value.map(arrItem => <li className={s.characteristics_text}>{arrItem}</li>)}</ul>
                       </div>
                   }
                   return <div className={s.characteristics}>

                       <p className={s.characteristics_title}>{el.title.toLowerCase()}:</p>
                       <p className={s.characteristics_text}>{el.value}</p>
                   </div>
               })}
           </div>


        </div>
    </div>


}