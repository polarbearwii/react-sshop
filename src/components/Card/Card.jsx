import style from './Card.module.scss'
import React from "react";
import ContentLoader from "react-content-loader";
import {AppContext} from "../../App";

const Card = ({   id,
                  imageUrl,
                  title,
                  price,
                  onPlus,
                  onFavorite,
                  favorited = false,
                  loading }) => {

    const { isItemInCart } = React.useContext(AppContext)
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus({id, parentId: id, imageUrl, title, price});
    }
    const onClickFavorite = () => {
        onFavorite({id, parentId: id, imageUrl, title, price});
        setIsFavorite(!isFavorite)
    }

        return (

        <div className={style.card}>

            {
                loading ?   <ContentLoader
                    speed={2}
                    width={180}
                    height={220}
                    viewBox="0 0 150 200"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="100" rx="10" ry="10" width="150" height="15" />
                    <rect x="0" y="125" rx="10" ry="10" width="93" height="15" />
                    <rect x="0" y="160" rx="10" ry="10" width="80" height="24" />
                    <rect x="115" y="152" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>

                    : <>
                        {
                            onFavorite && <div className={style.favorite}>
                                <img src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'} alt={'like'} onClick={onClickFavorite}/>
                            </div>
                        }
                        <img width={150}  src={imageUrl} alt={'Фигурки'}/>
                        <h5>{title}</h5>
                        <div className={style.cardBottom}>
                            <div className={style.cardPrice}>
                                <span>Цена:</span>
                                <b>{price} руб.</b>
                            </div>
                            {
                                onPlus && <div className={style.buttonPlus}>
                                    <img onClick={onClickPlus} src={isItemInCart(id) ? '/img/button-checked.svg' : '/img/button-plus.svg'}
                                         alt={'plus'}/>
                                </div>
                            }
                        </div>
                    </>
            }


        </div>

    )
}

export default Card;