import style from "./Drawer/Drawer.module.scss";
import React from "react";
import {AppContext} from "../App";



const Info = ({image, title, description }) => {

    const {setCartOpened} = React.useContext(AppContext);

    return(
            <div className={style.cartEmpty}>
              <img src={image} alt="Корзина"/>
              <h2>{title}</h2>
              <p>{description}</p>
              <button className={style.greenBtn} onClick={() => setCartOpened(false)}>Вернуться назад</button>
            </div>
  )
}

export default Info;