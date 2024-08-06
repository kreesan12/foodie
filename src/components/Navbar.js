import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BasketContext } from '../contexts/BasketContext';
import './Navbar.css';

function Navbar() {
    const { total } = useContext(BasketContext);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src= {process.env.PUBLIC_URL + '/logo.png'} alt="Logo" />
                <span className="navbar-title">Divineveg on 262</span>
            </div>
            <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/about-us">About Us</Link>
                <Link to="/contact-us">Contact Us</Link>
            </div>
            <div className="navbar-actions">
                <button className="sign-in-btn ios-button">Sign In</button>
                <div className="basket-icon">
                    <Link to="/checkout">
                        <img src="/basket-icon.png" alt="Basket" />
                    </Link>
                </div>
                <div className="basket-icon">
                    <Link to="/checkout">
                        <span className="basket-count">Basket: R{total}</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
