import React, {useState, useContext} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {AppContext} from '../App';
import CallApi from "../../api/api_v2";

const UserMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {userData, updateUserData, sessionId} = useContext(AppContext)

    console.log(sessionId)

    const toggleHandler = () => setIsDropdownOpen(!isDropdownOpen)
    const logoutHandler = () => {
        CallApi.delete("/authentication/session",
            {
                body: {
                    session_id: sessionId
                }
            })
            .then((res) => {console.log(res)});
        updateUserData(null, null)
    }

    return (
        <Dropdown nav isOpen={isDropdownOpen} toggle={toggleHandler}>
            <DropdownToggle tag='div' onClick={toggleHandler} data-toggle='dropdown' aria-expanded={isDropdownOpen}>
                <img width="40"
                     className="rounded-circle"
                     src={`https://secure.gravatar.com/avatar/${userData.avatar.gravatar.hash}.jpg?s=64"`}
                     alt='avatar'
                />
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem onClick={logoutHandler}>Выйти</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default UserMenu;