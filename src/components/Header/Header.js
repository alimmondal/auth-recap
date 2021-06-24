import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Header.css';
import header from '../../images/ITROOM.gif'

const Header = () => {
    return (
        <div  className="header">
            <div className="center" style={{margin: '20px 20px'}}>
                <img src={header} alt="" />
            </div>
            <nav>
                <Link to="/">Home</Link>


                <Link to="/signIn">Sign In</Link>


                <Link to="/SignUp">Sign Up</Link>

                <Link to="/about">About</Link>

                <Link to="/users">Users</Link>

            </nav>
        </div>
    );
};

export default Header;