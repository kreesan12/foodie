import React, { useContext } from 'react';
import { BasketContext } from '../contexts/BasketContext';
import './Basket.css';

function Basket() {
    const { basket, removeFromBasket, total } = useContext(BasketContext);

    return (
        <div className="basket">
            <h2>Your Basket</h2>
            {basket.map((item, index) => (
                <div key={index} className="basket-item">
                    <p>{item.name} - {item.variant.name} - {item.variant.price} ZAR</p>
                    <button onClick={() => removeFromBasket(index)}>Remove</button>
                </div>
            ))}
            <p>Total: {total} ZAR</p>
        </div>
    );
}

export default Basket;