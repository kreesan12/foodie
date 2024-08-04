import React, { createContext, useState } from 'react';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState([]);

    // Function to add an item to the basket
    const addToBasket = (item, variant) => {
        setBasket(prevBasket => [...prevBasket, { ...item, variant, quantity: 1 }]);
    };

    // Function to remove an item from the basket by index
    const removeFromBasket = (index) => {
        setBasket(prevBasket => prevBasket.filter((_, i) => i !== index));
    };

    // Function to update item quantity
    const updateItemQuantity = (index, delta) => {
        setBasket(prevBasket => {
            const newBasket = [...prevBasket];
            newBasket[index].quantity += delta;

            if (newBasket[index].quantity <= 0) {
                newBasket.splice(index, 1);
            }

            return newBasket;
        });
    };

    // Calculate total price of items in the basket
    const total = basket.reduce((sum, item) => sum + (item.variant.price || item.price) * item.quantity, 0);

    return (
        <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, updateItemQuantity, total }}>
            {children}
        </BasketContext.Provider>
    );
};
