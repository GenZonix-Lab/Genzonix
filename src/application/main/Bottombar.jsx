import React ,{useState, useEffect}from 'react'
import { CgProfile } from "react-icons/cg";
import { IoCloudOutline } from "react-icons/io5"; //cloud icon
import { NavLink } from 'react-router-dom';
import { AiOutlineProduct } from "react-icons/ai"; //products
import { GoProjectRoadmap } from "react-icons/go"; //projects
const Bottombar = () => {
  const [hidden, setHidden] = useState(false);
  let lastScrollTop = 0;
  const [menu, setMenu] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        // scrolling down
        setHidden(true);
      } else {
        // scrolling up
        setHidden(false);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // avoid negative
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log("Menu state:", menu);
  return (
    <>
    <div className={`bottom-bar fixed-bottom d-block d-md-none ${
        hidden ? "slide-down" : "slide-up"
      }`}>
      <div className='container-fluid position-sticky bottom-0 bg-default border-top border-light'>
      <div className="d-flex justify-content-around py-2">
      <div className="text-center">
        <NavLink 
          to="/sandbox" 
          className={({ isActive }) => isActive ? setMenu("sandbox") : ""}
        >
        <div className={menu === "sandbox" ?"btn-bottom-bar active text-white badge rounded-pill":'btn-bottom-bar badge rounded-pill'}>
          <div className='px-2 py-0'>
            <IoCloudOutline size={24}/>
          </div>
        </div>
        <div><em>Cloud</em></div>
        </NavLink>
      </div>  
      <div className="text-center">
        <NavLink 
          to="/projects" 
          className={({ isActive }) => isActive ? setMenu("projects") : ""}
        >
        <div className={menu === "projects" ?"btn-bottom-bar active text-white badge rounded-pill":'btn-bottom-bar badge rounded-pill'}>
          <div className='px-2 py-0'>
            <GoProjectRoadmap size={24}/>
          </div>
        </div>
        <div><em>Projects</em></div>
        </NavLink>
      </div>


      <div className="text-center">
        <NavLink 
          to="/products" 
          className={({ isActive }) => isActive ? setMenu("products") : ""}
        >
        <div className={menu === "products" ?"btn-bottom-bar active text-white badge rounded-pill":'btn-bottom-bar badge rounded-pill'}>
          <div className='px-2 py-0'>
            <AiOutlineProduct size={24}/>
          </div>
        </div>
        <div><em>Products</em></div>
      </NavLink>
    </div>
          <div className="text-center">
            <NavLink to="/profile" className={({ isActive }) => isActive ? setMenu("profile") : ''}>
              <div className={menu === "profile" ?"btn-bottom-bar active text-white badge rounded-pill":'btn-bottom-bar badge rounded-pill'}>
                <div className='px-2 py-0'>
                  <CgProfile size={24}/>
                </div>
              </div>
              <div><em>Profile</em></div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Bottombar