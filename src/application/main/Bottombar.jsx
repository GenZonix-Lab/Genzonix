import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoCloudOutline } from "react-icons/io5"; // cloud icon
import { NavLink } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai"; // products
import { GoProjectRoadmap } from "react-icons/go"; // projects

const Bottombar = () => {
  const [hidden, setHidden] = useState(false);
  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
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

  return (
    <>
      <div
        className={`bottom-bar fixed-bottom d-block d-md-none ${
          hidden ? "slide-down" : "slide-up"
        }`}
      >
        <div className="container-fluid position-sticky bottom-0 bg-default border-top border-light">
          <div className="d-flex justify-content-around py-2">
            {/* Cloud */}
            <div className="text-center">
              <NavLink
                to="/sandbox"
                className={({ isActive }) =>
                  isActive
                    ? "btn-bottom-bar active text-white badge rounded-pill"
                    : "btn-bottom-bar badge rounded-pill"
                }
              >
                <div className="px-2 py-0">
                  <IoCloudOutline size={24} />
                </div>
              </NavLink>
              <div>
                <em className="fs-7">Cloud</em>
              </div>
            </div>

            {/* Projects */}
            <div className="text-center">
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive
                    ? "btn-bottom-bar active text-white badge rounded-pill"
                    : "btn-bottom-bar badge rounded-pill"
                }
              >
                <div className="px-2 py-0">
                  <GoProjectRoadmap size={24} />
                </div>
              </NavLink>
              <div>
                <em className="fs-7">Projects</em>
              </div>
            </div>

            {/* Products */}
            <div className="text-center">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "btn-bottom-bar active text-white badge rounded-pill"
                    : "btn-bottom-bar badge rounded-pill"
                }
              >
                <div className="px-2 py-0">
                  <AiOutlineProduct size={24} />
                </div>
              </NavLink>
              <div>
                <em className="fs-7">Products</em>
              </div>
            </div>

            {/* Profile */}
            <div className="text-center">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "btn-bottom-bar active text-white badge rounded-pill"
                    : "btn-bottom-bar badge rounded-pill"
                }
              >
                <div className="px-2 py-0">
                  <CgProfile size={24} />
                </div>
              </NavLink>
              <div>
                <em className="fs-7">Profile</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bottombar;
