import React from 'react'
import { useState } from 'react';
import { ImMenu3,ImMenu4  } from "react-icons/im";
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
    const [toggle,setToggle]=useState(false);
    const state="open";
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
      <ul className="navbar-nav mb-3 mb-xl-0">
        <li className="nav-item py-2 py-xl-0">
        <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
          <NavLink to="/" className="nav-link">
            <h4>Home</h4>
          </NavLink>
          </button>
        </li>
        <li className="nav-item py-2 py-xl-0">
          <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
          <NavLink to="/products" className="nav-link">
            <h4>Products</h4>
          </NavLink>
          </button>
        </li>
        <li className="nav-item py-2 py-xl-0">
        <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
          <NavLink to="/projects" className="nav-link">
            <h4>Project</h4>
          </NavLink>
          </button>
        </li>
        <li className="nav-item py-2 py-xl-0">
        <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
          <NavLink to="https://forms.gle/QEQCW7uBg242nzWv5" target='blank' className="nav-link">
            <h4>Career</h4>
          </NavLink>
          </button>
        </li>
        <li className="nav-item py-2 py-xl-0">
        <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
          <NavLink to="/support" className="nav-link">
            <h4>Support</h4>
          </NavLink>
          </button>
        </li>
      </ul>
      </div>
    </>
  )
}

export default Sidebar