import React from 'react'
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { PiPackageDuotone } from "react-icons/pi";

const Authenticator = () => {
    const username = "demo-data"; // Replace with actual username logic
  return (
    <>
        <div className="d-flex flex-row text-end navbar-nav">
            <div className="col-4 navbar-item">
                <NavLink to="/order" className="nav-link nav-icon" title='order'>
                    <PiPackageDuotone/>
                </NavLink>
            </div>
            <div className="col-4 navbar-item">
                <NavLink to="/Cart" className="nav-link nav-icon" title='Cart'>
                    <FaShoppingCart/>
                </NavLink>
            </div>
            <div className="col-4 navbar-item">
                <NavLink to="/Auth" className="nav-link nav-icon" id='auth' title='Login/SignUp'>
                    <CgProfile/>
                </NavLink>
            </div>
        </div>
    </>
  )
}

export default Authenticator