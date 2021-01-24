import React, {useContext} from 'react';
import Login from "../Login";
import {AppContext} from '../App';
import UserMenu from "../UserMenu";

const Header = () => {
    const {userData} = useContext(AppContext);
    return (
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a href='#' className="nav-link">Home</a>
                        </li>
                    </ul>
                    {userData ? <UserMenu/> : <Login/>}
                </div>
            </nav>
        </div>
    );
};

export default Header;