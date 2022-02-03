import Card from "../components/Card/Card";
import React from "react";


const Home = ( { items, searchValue, onAddToCart, onAddToFavorite, onChangeInput, clearSearchValue, isLoading}) => {



    const renderItems = () => {
        const filterItems = items.filter( (item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        return (isLoading ? [...Array(3)] : filterItems).map(item =>
               <Card
                   onPlus={ onAddToCart }
                   onFavorite={ onAddToFavorite }
                   loading={isLoading}
                   {...item}/>)
   }


    return (
        <div className={'content'}>
            <div className={'headContent'}>

                <h1>{searchValue ? `Поиск: ${searchValue}` : 'Все фигурки'}</h1>

                <div className={'searchBlock'}>
                    <img src={'/img/search.svg'} alt={'Search'} className={'search'}/>
                    <input onChange={onChangeInput} value={searchValue} placeholder={'Поиск...'}/>
                    {searchValue ? <img src={'/img/clear.svg'} alt={'Clear'} className={'clear'} onClick={clearSearchValue}/> : null}

                </div>

            </div>

            <div className={'toys'}>
                {
                    renderItems()
                }
            </div>


        </div>
    )
}

export default Home;