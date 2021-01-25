import React, {useContext} from 'react';
import Login from "../Login";
import {AppContext} from '../App';
import UserMenu from "../UserMenu";
import {Link} from "react-router-dom";

const Header = () => {
    const {userData} = useContext(AppContext);
    return (
        <div>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                    </ul>
                    {userData ? <UserMenu/> : <Login/>}
                </div>
            </nav>
        </div>
    );
};

export default Header;