import React from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css'


const Home = () => {

    const history = useHistory();
    
    const handleCheckout = () => {
        history.push('/shipment');
    }
    return (
        <div>
            <div className="center">
                <h1>This is home</h1>
                <button onClick={handleCheckout}>Proceed Checkout</button>
            </div>
        </div>
    );
};

export default Home;