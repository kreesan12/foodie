import React, { useEffect, useState, useContext } from 'react';
import { BasketContext } from '../contexts/BasketContext';
import './Menu.css';
import './Modal.css'; // Import the Modal CSS

function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const { addToBasket } = useContext(BasketContext);

    useEffect(() => {
        fetch('https://fathomless-retreat-07632-66acd80d626f.herokuapp.com/api/menu')
            .then(res => res.json())
            .then(data => setMenuItems(data))
            .catch(err => console.error(err));
    }, []);

    const handleAddToBasket = (item) => {
        setSelectedItem(item);
        setSelectedVariant(null); // Reset selected variant
    };

    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);
    };

    const handleConfirm = () => {
        if (selectedItem && selectedVariant) {
            addToBasket(selectedItem, selectedVariant);
            setSelectedItem(null);
            setSelectedVariant(null);
        }
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const categorizedItems = {
        fastFood: menuItems.filter(item => item.category === 'fast food'),
        mainMeals: menuItems.filter(item => item.category === 'main meals'),
        desserts: menuItems.filter(item => item.category === 'desserts'),
        sides: menuItems.filter(item => item.category === 'sides')
    };

    return (
        <div className="menu-container">
            <div className="section-selector">
                <button onClick={() => scrollToSection('fast-food')}>Fast Food</button>
                <button onClick={() => scrollToSection('main-meals')}>Main Meals</button>
                <button onClick={() => scrollToSection('desserts')}>Desserts</button>
                <button onClick={() => scrollToSection('sides')}>Sides</button>
            </div>

            <div className="menu" id="fast-food">
                <h2>Fast Food</h2>
                {categorizedItems.fastFood.map((item) => (
                    <div key={item.id} className="menu-item">
                        <div className="menu-item-info">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>R {item.price}</p>
                            <button className="ios-button" onClick={() => handleAddToBasket(item)}>Add to Basket</button>
                        </div>
                        <div className="menu-item-image">
                            <img src={item.image} alt={item.name} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="menu" id="main-meals">
                <h2>Main Meals</h2>
                {categorizedItems.mainMeals.map((item) => (
                    <div key={item.id} className="menu-item">
                        {/* Repeat the menu item layout */}
                    </div>
                ))}
            </div>

            <div className="menu" id="desserts">
                <h2>Desserts</h2>
                {categorizedItems.desserts.map((item) => (
                    <div key={item.id} className="menu-item">
                        {/* Repeat the menu item layout */}
                    </div>
                ))}
            </div>

            <div className="menu" id="sides">
                <h2>Sides</h2>
                {categorizedItems.sides.map((item) => (
                    <div key={item.id} className="menu-item">
                        {/* Repeat the menu item layout */}
                    </div>
                ))}
            </div>

            {selectedItem && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Select option for {selectedItem.name}</h3>
                        {selectedItem.variants.map((variant) => (
                            <div key={variant.id} className="variant-option">
                                <input
                                    type="radio"
                                    id={`variant-${variant.id}`}
                                    name="variant"
                                    value={variant.name}
                                    onChange={() => handleVariantSelect(variant)}
                                />
                                <label htmlFor={`variant-${variant.id}`}>
                                    {variant.name} - R {variant.price}
                                </label>
                            </div>
                        ))}
                        <div className="modal-buttons">
                            <button className="modal-button confirm" onClick={handleConfirm} disabled={!selectedVariant}>Confirm</button>
                            <button className="modal-button cancel" onClick={() => setSelectedItem(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Menu;
