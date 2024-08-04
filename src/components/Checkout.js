import React, { useContext, useState } from 'react';
import { BasketContext } from '../contexts/BasketContext';
import { useHistory } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal'; // Import the modal component
import './Checkout.css';
import useCheckoutForm from '../hooks/useCheckoutForm'; // Import the custom hook

const initialAddressValues = {
    name: '',
    phone: '',
    addressType: '',
    streetNumber: '',
    streetName: '',
    suburb: '',
    postalCode: '',
    apartmentName: '',
    unitNumber: '',
    businessName: '',
    businessEstate: ''
};

function Checkout() {
    const { basket, removeFromBasket, updateItemQuantity, total } = useContext(BasketContext);
    const [orderStatus, setOrderStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const history = useHistory();

    const {
        values: address,
        errors,
        handleChange,
        handleSubmit
    } = useCheckoutForm(initialAddressValues);

    const handleQuantityChange = (index, delta) => {
        updateItemQuantity(index, delta);
    };

    const handleRemoveItem = (index) => {
        setItemToRemove(index);
        setIsModalOpen(true);
    };

    const confirmRemoveItem = () => {
        if (itemToRemove !== null) {
            removeFromBasket(itemToRemove);
        }
        setIsModalOpen(false);
    };

    const cancelRemoveItem = () => {
        setItemToRemove(null);
        setIsModalOpen(false);
    };

    const submitOrder = (formValues) => {
        const validAddressTypes = ['Standalone Private House', 'Apartment/Complex', 'Business/Work'];
        if (!validAddressTypes.includes(formValues.addressType)) {
            alert('Please select a valid address type.');
            return;
        }

        const addressFields = {
            'Standalone Private House': ['streetNumber', 'streetName', 'suburb', 'postalCode'],
            'Apartment/Complex': ['apartmentName', 'unitNumber', 'streetNumber', 'streetName', 'suburb', 'postalCode'],
            'Business/Work': ['businessName', 'businessEstate', 'streetNumber', 'streetName', 'suburb', 'postalCode']
        };

        const requiredFields = addressFields[formValues.addressType];
        for (let field of requiredFields) {
            if (!formValues[field]) {
                alert(`Please fill in all required fields for ${formValues.addressType}.`);
                return;
            }
        }

        const orderDetails = {
            items: basket,
            total: total,
            deliveryAddress: formValues,
        };

       /* fetch('https://fathomless-retreat-07632-66acd80d626f.herokuapp.com/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then((res) => res.json())
            .then((data) => {
                setOrderStatus('Order placed successfully!');
                console.log('Order placed:', data);
            })
            .catch((err) => {
                setOrderStatus('Failed to place order. Please try again.');
                console.error('Error placing order:', err);
            });
    };*/


    if (!orderDetails) {
        console.error('Order details are undefined or null.');
        setOrderStatus('Failed to place order. Order details are missing.');
    } else {
        fetch('https://fathomless-retreat-07632-66acd80d626f.herokuapp.com/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then((res) => {
                if (!res.ok) {
                    // Handle HTTP errors
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setOrderStatus('Order placed successfully!');
                console.log('Order placed:', data);
            })
            .catch((err) => {
                // Enhanced error handling
                if (err.name === 'TypeError') {
                    setOrderStatus('Failed to place order. Network error or API not reachable.');
                } else if (err.name === 'SyntaxError') {
                    setOrderStatus('Failed to place order. Invalid response from server.');
                } else {
                    setOrderStatus('Failed to place order. Please try again.');
                }
                console.error('Error placing order:', err);
            });
    }

    const handleAddMoreItems = () => {
        history.push('/');
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <div className="basket-summary">
                {basket.map((item, index) => (
                    <div key={index} className="basket-item">
                        <div className="item-image">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-details">
                            <p>{item.name} - {item.variant.name} - {item.variant.price} ZAR</p>
                            <div className="quantity-controls">
                                <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                                <button onClick={() => handleRemoveItem(index)}>Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="align-right">
                    <button className="ios-button" onClick={handleAddMoreItems}>Add More Items</button>
                    <p className="total-value">Total: <span>{total} ZAR</span></p>
                </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e, submitOrder)}>
                <h3>Please provide your delivery details below</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Contact person name"
                    value={address.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && <p className="error">{errors.name}</p>}
                <input
                    type="text"
                    name="phone"
                    placeholder="Contact person number"
                    value={address.phone}
                    onChange={handleChange}
                    required
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
                <select
                    name="addressType"
                    value={address.addressType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Address Type</option>
                    <option value="Standalone Private House">Standalone Private House</option>
                    <option value="Apartment/Complex">Apartment/Complex</option>
                    <option value="Business/Work">Business/Work</option>
                </select>
                {address.addressType === 'Standalone Private House' && (
                    <>
                        <input
                            type="text"
                            name="streetNumber"
                            placeholder="Street Number"
                            value={address.streetNumber}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="streetName"
                            placeholder="Street Name"
                            value={address.streetName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="suburb"
                            placeholder="Suburb"
                            value={address.suburb}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={address.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}
                {address.addressType === 'Apartment/Complex' && (
                    <>
                        <input
                            type="text"
                            name="apartmentName"
                            placeholder="Apartment/Complex Name"
                            value={address.apartmentName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="unitNumber"
                            placeholder="Unit Number/Block/Street within Complex"
                            value={address.unitNumber}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="streetNumber"
                            placeholder="Street Number"
                            value={address.streetNumber}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="streetName"
                            placeholder="Street Name"
                            value={address.streetName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="suburb"
                            placeholder="Suburb"
                            value={address.suburb}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={address.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}
                {address.addressType === 'Business/Work' && (
                    <>
                        <input
                            type="text"
                            name="businessName"
                            placeholder="Business Name"
                            value={address.businessName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="businessEstate"
                            placeholder="Business Estate, Unit, or Block"
                            value={address.businessEstate}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="streetNumber"
                            placeholder="Street Number"
                            value={address.streetNumber}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="streetName"
                            placeholder="Street Name"
                            value={address.streetName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="suburb"
                            placeholder="Suburb"
                            value={address.suburb}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={address.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}
                <button className="ios-button-select" type="submit">Place Order</button>
            </form>
            {orderStatus && <p className="order-status">{orderStatus}</p>}
            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={confirmRemoveItem}
                onCancel={cancelRemoveItem}
                item={basket[itemToRemove]}
            />
        </div>
    );
}

export default Checkout;
