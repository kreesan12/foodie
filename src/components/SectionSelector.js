import React from 'react';
import './SectionSelector.css';

function SectionSelector() {

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="section-selector">
            <button onClick={() => scrollToSection('fast-food')}>Fast Food</button>
            <button onClick={() => scrollToSection('main-meals')}>Main Meals</button>
            <button onClick={() => scrollToSection('desserts')}>Desserts</button>
            <button onClick={() => scrollToSection('sides')}>Sides</button>
        </div>
    );
}

export default SectionSelector;
