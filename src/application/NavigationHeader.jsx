import React from 'react';
import logo from '../assets/Genzonix.webp';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import Authenticator from './Authenticator';

const NavigationHeader = () => {
  return (
  <>
  <header>
    <nav className="navbar navbar-expand-xl navbar-dark main-bg">
      <div className="container-fluid">
          <div className="order-2 order-xl-1">
            <NavLink to={"/"}>
            <img
                src={logo}
                className="img"
                alt="Logo"
                title="Website_logo"
                                
            />
          </NavLink>
          </div >
         <div className="order-1 order-xl-2">
            <Sidebar/> 
         </div>
         <div className="order-3">
            <Authenticator/>
          </div>        
      </div>
    </nav>
  </header>




  </>
)};

export default NavigationHeader;
