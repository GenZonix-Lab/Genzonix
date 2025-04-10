import React from 'react'
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Authenticator = () => {
    const username = "demo-data"; // Replace with actual username logic
  return (
    <>
        <ul className="navbar-nav ms-auto authenticator">
            <li className="nav-item">
                <NavLink to="/Cart" className="nav-link nav-icon" title='Cart'>
                    <FaShoppingCart/>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/Auth" className="nav-link nav-icon" id='auth' title='Login/SignUp'>
                    <CgProfile/>
                </NavLink>
            </li>
        </ul>
    </>
  )
}

export default Authenticator