import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Menu from './components/Menu';
import Basket from './components/Basket';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import { BasketProvider } from './contexts/BasketContext';
import './App.css';

function App() {

        useEffect(() => {
            fetch('https://fathomless-retreat-07632-66acd80d626f.herokuapp.com')
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
        }, []);


    return (
        <BasketProvider>
            <Router basename="/foodie">
                <div className="App">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact>
                            <Carousel />
                            <Menu />
                        </Route>
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/about-us" component={AboutUs} />
                        <Route path="/contact-us" component={ContactUs} />
                    </Switch>
                    <Basket /> 
                    <Footer />
                </div>
            </Router>
        </BasketProvider>
    );
}

export default App;