import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useSessionId, useUserData } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/applyMiddleware";

const UserMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userData = useUserData();
  const sessionId = useSessionId();
  const dispatch = useDispatch();

  const toggleHandler = () => setIsDropdownOpen(!isDropdownOpen);
  const logoutHandler = () => dispatch(userLogout(sessionId));

  return (
    <Dropdown nav isOpen={isDropdownOpen} toggle={toggleHandler}>
      <DropdownToggle
        tag="div"
        onClick={toggleHandler}
        data-toggle="dropdown"
        aria-expanded={isDropdownOpen}
      >
        <img
          width="40"
          className="rounded-circle"
          src={`https://secure.gravatar.com/avatar/${userData.avatar.gravatar.hash}.jpg?s=64"`}
          alt="avatar"
        />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={logoutHandler}>Выйти</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
