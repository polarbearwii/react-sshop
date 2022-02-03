import Card from "../components/Card/Card";
import React from "react";
import {Link} from "react-router-dom";
import { AppContext } from '../App'

const Favorites = () => {

const {favoriteItems, onAddToFavorite, onAddToCart} = React.useContext(AppContext)

    return (
        <div className={'favoriteContent'}>

            <div className={'favoriteHead'}>

                <div>
                    <Link to={'/'}>
                        <img src={'/img/button-back.svg'} alt={'Назад'}/>
                    </Link>
                </div>



                <h1>
                    Мои закладки
                </h1>
            </div>
            <div className={'favoriteToys'}>
                {
                    favoriteItems.map( item =>  <Card
                        onPlus={ onAddToCart }
                        onFavorite={onAddToFavorite}
                        favorited={true}
                        {...item}/>)
                }
            </div>

        </div>
    )
}

export default Favorites;