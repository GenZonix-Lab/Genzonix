import { useState } from 'react';
import logo from '../../assets/Genzonix.webp';
import { NavLink } from 'react-router-dom';
import ScrollToTop from '../../Components/ScrollToTop'
import { ImMenu3,ImMenu4  } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { PiPackageDuotone } from "react-icons/pi";

const Header = () => {
  const [toggle,setToggle]=useState(false);
  const handletoggle= ()=>{
    setToggle(!toggle)
  }
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
          <button 
            type="button"  
            className="navbar-toggler"
            data-bs-toggle="collapse" 
            data-bs-target="#navbarCollapse"
            onClick={()=>handletoggle()} >
              {toggle ? <ImMenu3/> : <ImMenu4/>}
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="col navbar-nav mb-3 mb-xl-0 d-flex justify-content-center">
              <li className="nav-item py-2 py-xl-0">
                <ScrollToTop />
                <NavLink to="/" className="nav-link">
                <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}><h4>Home</h4></button>
                </NavLink>
              </li>
              <li className="nav-item py-2 py-xl-0">
                <ScrollToTop />
                <NavLink to="/products" className="nav-link">
                  <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
                    <h4>Products</h4>
                  </button>
                </NavLink>
              </li>
              <li className="nav-item py-2 py-xl-0">
                <ScrollToTop />
                <NavLink to="/projects" className="nav-link">
                  <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
                    <h4>Project</h4>
                  </button>
                </NavLink>
              </li>
              <li className="nav-item py-2 py-xl-0">
                <ScrollToTop />
                <NavLink to="https://forms.gle/QEQCW7uBg242nzWv5" target='blank' className="nav-link">
                  <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
                    <h4>Career</h4>
                  </button>
                </NavLink>    
              </li>
              <li className="nav-item py-2 py-xl-0">
                <ScrollToTop />
                <NavLink to="/support" className="nav-link" aria-current="page">
                  <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
                    <h4>Support</h4>
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
         <div className="col-6 col-md-3 col-xl-2 order-3">
            <div className="d-flex flex-row text-end navbar-nav">
              <div className="col-4 navbar-item">
                  <ScrollToTop />
                  <NavLink to="/order" className="nav-link nav-icon" title='order'>
                      <PiPackageDuotone/>
                  </NavLink>
              </div>
              <div className="col-4 navbar-item">
                  <ScrollToTop />
                  <NavLink to="/Cart" className="nav-link nav-icon" title='Cart'>
                      <FaShoppingCart/>
                  </NavLink>
              </div>
              <div className="col-4 navbar-item">
                  <ScrollToTop />
                  <NavLink to="/Auth" className="nav-link nav-icon" id='auth' title='Login/SignUp'>
                      <CgProfile/>
                  </NavLink>
              </div>
            </div>
          </div>        
      </div>
    </nav>
  </header>




  </>
)};

export default Header;
