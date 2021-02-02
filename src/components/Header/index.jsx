import React from "react";
import Login from "../Login";
import UserMenu from "../UserMenu";
import { Link } from "react-router-dom";
import { useUserData } from "../../redux/selectors";

const Header = () => {
  const userData = useUserData();
  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {userData ? <UserMenu /> : <Login />}
        </div>
      </nav>
    </div>
  );
};

export default Header;
