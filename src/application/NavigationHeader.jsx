import React from 'react';
import logo from '../assets/Genzonix.webp';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import Authenticator from './Authenticator';
import ScrollToTop from './ScrollToTop'

const NavigationHeader = () => {
  return (
  <>
  <header>
    <nav className="navbar navbar-expand-xl navbar-dark main-bg">
      <div className="container-fluid row">
          <div className="col-3 col-md-6 col-xl-2 order-2 order-xl-1 d-flex justify-content-center">
            <ScrollToTop />
            <NavLink to={"/"}>
            <img
                src={logo}
                className="img"
                alt="Logo"
                title="Website_logo"
                                
            />
          </NavLink>
          </div >
         <div className="col-3 col-md-3 col-xl-8 order-1 order-xl-2">
            <Sidebar/> 
         </div>
         <div className="col-6 col-md-3 col-xl-2 order-3">
            <Authenticator/>
          </div>        
      </div>
    </nav>
  </header>




  </>
)};

export default NavigationHeader;
