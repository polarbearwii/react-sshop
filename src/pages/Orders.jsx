import {Link} from "react-router-dom";
import Card from "../components/Card/Card";
import React from "react";
import axios from "axios";


const Orders = () => {

    const [orderItems, setOrderItems] = React.useState([])

    React.useEffect( () => {
        ( async () => {
            try{
                const { data } = await axios.get('https://61ef1439d593d20017dbb2ee.mockapi.io/orders');
                setOrderItems( data.reduce( (prev, obj) => [...prev, ...obj.items], [] ))
            } catch(error) {
                alert('Не удалось загрузить заказы')
            }
        })()
    }, [])

    return(
        <div className={'ordersContent'}>

            <div className={'ordersHead'}>
                <div>
                    <Link to={'/'}>
                        <img src={'/img/button-back.svg'} alt={'Назад'}/>
                    </Link>
                </div>
                <h1>
                    Мои покупки
                </h1>
            </div>
            <div className={'ordersToys'}>
                {
                    orderItems.map( item =>  <Card
                        key={item.id}
                        {...item}/>)
                }
            </div>

        </div>
    )
}

export default Orders;