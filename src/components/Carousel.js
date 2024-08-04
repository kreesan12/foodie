import React, { useEffect, useState } from 'react';
import './Carousel.css';

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { image: '/carousel-image1.png', link: '/menu-item1' },
        { image: '/carousel-image2.png', link: '/menu-item2' },
        { image: '/carousel-image3.png', link: '/menu-item3' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="carousel">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                >
                    <a href={slide.link}>
                        <img src={slide.image} alt={`Slide ${index + 1}`} />
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Carousel;
