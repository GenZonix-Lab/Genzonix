import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { ImMenu3,ImMenu4  } from "react-icons/im";

const Header = () => {
     const [toggle,setToggle]=useState(false);
        const state="open";
        const handletoggle= ()=>{
          setToggle(!toggle)
        }
  return (
    <>
    <header>
        <nav className="navbar navbar-expand-xl navbar-dark main-bg">
        <div className="navbar sticky-top container-fluid d-flex justify-content-between">
            <div className="order-xl-1 order-2">
                <div className="navbar-brand px-4">
                    <h2>Genzonix</h2>
                </div>
            </div>
            <div className="order-xl-2 order-1">
                <button 
                        type="button"  
                        className="navbar-toggler portfolio-toggle-button"
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarCollapse"
                        onClick={()=>handletoggle()} >
                            {toggle ? <ImMenu3/> : <ImMenu4/>}
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mb-3 mb-xl-0">
                        <li className="nav-item py-2 py-xl-0">
                            <a href={"/info"} className="nav-link">
                                <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}> 
                                    <div className="portfolio"><h4>Home</h4></div>
                                </button>
                            </a>
                        </li>
                        <li className="nav-item py-2 py-xl-0">
                            <a href={"#About"} className={"nav-link"}>
                                <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
                                    <div className="portfolio"><h4>About</h4></div>
                                </button>
                            </a>
                        </li>
                        <li className="nav-item py-2 py-xl-0">
                            <a href={"#skills"} className={"nav-link"}>
                                <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
                                   <div className="portfolio"> <h4>Skills</h4></div>
                                </button>
                            </a>
                        </li>
                        <li className="nav-item py-2 py-xl-0">
                            <a href={"#projects"} className={"nav-link"}>
                                <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
                                    <div className="portfolio"><h4>Project</h4></div>
                                </button>
                            </a>
                        </li>
                        <li className="nav-item py-2 py-xl-0">
                            <a href={"#contact"} className={'nav-link smoothScroll'}>
                                <button data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={()=>handletoggle()}>
                                    <div className="portfolio"><h4>Contact</h4></div>
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </nav>
    </header>
    </>
  )
}

export default Header