import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import React from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});

function App() {

    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] =  React.useState([]);
    const [favoriteItems, setFavoriteItems] =  React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect( () => {
        async function fetchData() {
            try {

                const cartResponse = await axios.get('https://61ef1439d593d20017dbb2ee.mockapi.io/cart');
                const favoriteResponse = await axios.get('https://61ef1439d593d20017dbb2ee.mockapi.io/favorite');
                const itemsResponse = await axios.get('https://61ef1439d593d20017dbb2ee.mockapi.io/items');

                setIsLoading(false);

                setCartItems(cartResponse.data);
                setFavoriteItems(favoriteResponse.data);
                setItems(itemsResponse.data);

            } catch (error) {
                alert('Не удалось запросить данные')
            }
        }

        fetchData();

        }, [])



    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
            if(findItem) {
                setCartItems((prev) => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://61ef1439d593d20017dbb2ee.mockapi.io/cart/${findItem.id}`);

            } else {
                setCartItems( (prev) => [...prev, obj] )
                const {data} = await axios.post(`https://61ef1439d593d20017dbb2ee.mockapi.io/cart/`, obj);
                setCartItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    }),
                );

            }
        } catch (error) {
            alert('Не удалось добавить в корзину');
        }

    }
    const onAddToFavorite = async (obj) => {
        try {
            if(favoriteItems.find((item) => Number(item.id) === Number(obj.id))) {
                axios.delete(`https://61ef1439d593d20017dbb2ee.mockapi.io/favorite/${obj.id}`);
                setFavoriteItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)))

            } else {
                const {data} = await axios.post(`https://61ef1439d593d20017dbb2ee.mockapi.io/favorite/`, obj);
                setFavoriteItems( (prev) => [...prev, data] )
            }
        } catch (error) {
            alert('Не удалось добавить в закладки');
        }

    }

    const isItemInCart = (id) => {
      return  cartItems.some( (obj) => Number(obj.parentId) === Number(id))
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://61ef1439d593d20017dbb2ee.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id));
    }

    const onChangeInput = (event) => {
        setSearchValue(event.target.value)
    }

    return (

        <AppContext.Provider value={ {items, cartItems, setCartItems, onAddToCart, favoriteItems, onAddToFavorite, isItemInCart, setCartOpened} }>
            <div className={'wrapper clear'}>

                <Drawer items={cartItems} onRemove={onRemoveItem} onCloseCart={ () => setCartOpened(false)  } opened={cartOpened}/>

                <Header onClickCart={ () => setCartOpened(true) }/>

                <Routes>
                    <Route path={'/'} element={ <Home items={items}
                                                      searchValue={searchValue}
                                                      clearSearchValue={ () => setSearchValue('')}
                                                      cartItems={cartItems}
                                                      favoriteItems={favoriteItems}
                                                      onAddToCart={onAddToCart}
                                                      onAddToFavorite={onAddToFavorite}
                                                      onChangeInput={onChangeInput}
                                                      isLoading={isLoading}/>}/>

                    <Route path={'/favorites'} element={ <Favorites/>} />

                    <Route path={'/orders'} element={<Orders/>}/>
                </Routes>


            </div>
        </AppContext.Provider>



    );
}

export default App;
