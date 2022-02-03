import style from './Drawer.module.scss'
import React from "react";
import Info from "../Info";
import {AppContext} from "../../App";
import axios from "axios";

const delay = (ms) => new Promise( (resolve) => setTimeout(resolve, ms) );

const Drawer = ({items = [], onCloseCart, onRemove, opened}) => {

    const {cartItems, setCartItems} = React.useContext(AppContext)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            await axios.post('https://61ef1439d593d20017dbb2ee.mockapi.io/orders', {
                items: cartItems
            });
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://61ef1439d593d20017dbb2ee.mockapi.io/cart/${item.id}`);
                await delay(1000)
            }
        } catch (error) {
            alert('Не удалось создать заказ')
        }
        setIsLoading(false)
    }

    return (

            <div className={`${style.overlay} ${opened ? style.overlayVisible : ''}` }>
            <div className={style.drawer}>
                <h2>Корзина
                    <img onClick={onCloseCart}
                        className={style.cartRemoveBtn}
                         src={'/img/button-remove.svg'}
                         alt={'Remove'}/>
                </h2>


                {
                    items.length > 0
                        ?   <div>
                                <div className={style.items}>
                                {items.map( (item) => (
                                    <div className={style.cartItem}>

                                        <div className={style.cartImgSneaker}
                                             style={{backgroundImage: `url(${item.imageUrl})`}}></div>
                                        <div className={style.cartInfo}>
                                            <p>{item.title}</p>
                                            <b>{item.price} руб.</b>
                                        </div>
                                        <img className={style.cartRemoveBtn}
                                             src={'/img/button-remove.svg'}
                                             alt={'Remove'}
                                             onClick={ () => onRemove(item.id)}/>
                                    </div>
                                ))}
                            </div>
                                <div className={style.cartTotalBlock}>
                                <ul>
                                    <li>
                                        <span>Итого: </span>
                                        <div></div>
                                        <b> {totalPrice} руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%: </span>
                                        <div></div>
                                        <b>{totalPrice * 5 / 100} руб. </b>
                                    </li>
                                </ul>
                                <button className={style.greenBtn} onClick={ onClickOrder } disabled={isLoading}>Оформить заказ</button>
                            </div>
                            </div>

                        :


                        <div className={style.cartEmpty}>

                            <Info image={ isOrderComplete ? '/img/completeOrder.png' : '/img/cartEmpty.png' }
                                  title={ isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая' }
                                  description={ isOrderComplete ? 'Ваш заказ скоро будет передан курьерской доставке' : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'}/>

                        </div>
                }





            </div>
        </div>
    )
}

export default Drawer;