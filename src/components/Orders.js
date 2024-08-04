import React, { useEffect, useState } from 'react';
import './Orders.css';

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('/api/orders')
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="orders">
            <h2>Your Orders</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Status: {order.status}</p>
                        <p>Total: {order.total} ZAR</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Orders;
