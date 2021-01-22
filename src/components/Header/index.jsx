import React from 'react';
import Login from "../Login";

const Header = ({getSession}) => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a href='#' className="nav-link">Home</a>
                        </li>
                    </ul>
                    <Login getSession={getSession}/>
                </div>
            </nav>
        </div>
    );
};

export default Header;