import { useState } from 'react';
import logo from '../../assets/Genzonix.webp';
import { NavLink } from 'react-router-dom';
import ScrollToTop from '../../Components/ScrollToTop'
import { ImMenu3,ImMenu4  } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { MdSupportAgent } from "react-icons/md";  //support icon
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
        <div className="col-10 col-md-6 col-xl-2 order-2 order-xl-1 d-flex justify-content-md-center">
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
        <div className="col-2 col-md-3 col-xl-8 order-1 order-xl-2 d-none d-md-block">
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
                <NavLink to="/sandbox" className="nav-link">
                  <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
                    <h4>Cloud</h4>
                  </button>
                </NavLink>
              </li>
              <li className="nav-item py-2 py-xl-0">
                <ScrollToTop />
                <NavLink to="/projects" className="nav-link">
                  <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
                    <h4>Projects</h4>
                  </button>
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
                <NavLink to="/support" className="nav-link" aria-current="page">
                  <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
                    <h4>Support</h4>
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
         <div className="col-2 col-md-3 col-xl-2 order-3">
            <div className="d-flex flex-row text-end navbar-nav">
              <div className="col navbar-item">
                  <ScrollToTop />
                  <NavLink to="/profile" className="nav-link nav-icon d-none d-md-block" id='auth' title='profile info'>
                      <CgProfile size={30}/>
                  </NavLink>
                  <NavLink to="/support" className="nav-link nav-icon d-block d-md-none" id='auth' title='profile info'>
                      <MdSupportAgent size={30}/>
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
