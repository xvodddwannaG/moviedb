import React from 'react';
import Login from "../Login";
import User from "../User";

const Header = ({updateUserData, userData}) => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a href='#' className="nav-link">Home</a>
                        </li>
                    </ul>
                    {userData ? <User userData={userData}/> : <Login updateUserData={updateUserData}/>}
                </div>
            </nav>
        </div>
    );
};

export default Header;