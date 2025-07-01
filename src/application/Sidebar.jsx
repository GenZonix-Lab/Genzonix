import React from 'react'
import { useState } from 'react';
import { ImMenu3,ImMenu4  } from "react-icons/im";
import { NavLink } from 'react-router-dom';
import ScrollToTop from './ScrollToTop'

const Sidebar = () => {
    const [toggle,setToggle]=useState(false);
    const handletoggle= ()=>{
      setToggle(!toggle)
    }
    return (
    <>
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
    </>
  )
}

export default Sidebar