import React, { useContext } from 'react';
import { BasketContext } from '../contexts/BasketContext';
import { useHistory } from 'react-router-dom';
import './FrontPageBasket.css';

function Basket() {
    const { basket, total } = useContext(BasketContext);
    const history = useHistory();

    const handleClick = () => {
        history.push('/checkout');
    };

    return (
        <div className="frontpagebasket" onClick={handleClick}>
            <h2>Your Basket</h2>
            <div className="basket-summary">
                <p>Items: {basket.length}</p>
                <p>Total: {total} ZAR</p>
            </div>
        </div>
    );
}

export default Basket;
