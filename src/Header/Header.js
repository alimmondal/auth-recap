import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <div >
                <nav>
                    <ul  style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'center', }}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/signIn">Sign In</Link> 
                        </li>
                        <li>
                            <Link to="/SignUp">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;