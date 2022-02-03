import style from './Header.module.scss'
import {Link} from "react-router-dom";
import React from "react";
import {AppContext} from "../../App";

const Header = (props) => {

    const {cartItems} = React.useContext(AppContext)
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

    return(
        <header>


                <div className={style.headerLeft}>

                    <Link to={'/'}>
                        <img width={40} height={40} src={'/img/logo.png'}/>
                    </Link>

                    <div>
                        <h3 className={style.title}>React Shop</h3>
                        <p>Магазин игрушек</p>
                    </div>
                </div>

            <ul className={style.headerRight}>
                <li className={style.cart} onClick={props.onClickCart}>
                    <img src={'/img/cart.svg'} alt={'Корзина'}/>
                    <span>{totalPrice} руб.</span>
                </li>
                <Link to={'/favorites'}>
                    <li className={style.heart} >
                        <img src={'/img/heart.svg'} alt={'Закладки'}/>
                    </li>
                </Link>
                <Link to={'/orders'}>
                    <li>
                        <img src={'/img/user.svg'} alt={'Пользователь'}/>
                    </li>
                </Link>
            </ul>
        </header>
    )
}

export default Header;