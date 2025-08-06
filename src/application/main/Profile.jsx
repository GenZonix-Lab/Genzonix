import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { PiPackageDuotone } from "react-icons/pi";
import { RiRobot3Fill } from "react-icons/ri";
import { BsCloudPlus } from "react-icons/bs";
import { BsCloud } from "react-icons/bs";
import ScrollToTop from '../../Components/ScrollToTop'
import { NavLink , useNavigate} from 'react-router';
import { CgMaximize } from 'react-icons/cg';
const Profile = () => {
    const navigate = useNavigate();
    const icon_size = 30;
  return (
    <>
        <div className="container mt-2">
            <div className='bg-transparent border-md-left w-md-fit m-md-auto p-4'>
                <div className="mt-3 px-md-5">
                    <ScrollToTop />
                    <NavLink to="/Auth" className="nav-link nav-icon d-flex " id='auth' title='profile info'>
                        <RiRobot3Fill size={icon_size}/><div className='fs-5 ps-3'>personal information</div>
                    </NavLink>
                </div><hr />
                <div className="px-md-5">
                    <ScrollToTop />
                    <NavLink to="/order" className="nav-link nav-icon d-flex" title='order'>
                     <PiPackageDuotone size={icon_size}/><div className='fs-5 ps-3'>Order</div>
                    </NavLink>
                </div><hr />
                <div className="px-md-5">
                    <ScrollToTop />
                    <NavLink to="/Cart" className="nav-link nav-icon d-flex" title='Cart'>
                        <FaShoppingCart size={icon_size}/><div className='fs-5 ps-3'>Cart</div>
                    </NavLink>
                </div><hr />
                <div className="px-md-5">
                    <ScrollToTop />
                    <NavLink to="/subscriptiondetails" className="nav-link nav-icon d-flex" title='Subscription'>
                        <BsCloudPlus size={icon_size}/><div className='fs-5 ps-3'>Subscription</div>
                    </NavLink>
                </div><hr />
                <div className="text-end position-fixed end-0 bottom-0 mb-2">
                    <button className='amplify-button amplify-button--secondary px-4 px-xl-4 me-3' onClick={()=>navigate(-1)}>⬅ </button>
                </div>
            </div>
        </div>
        <hr />
    </>
  )
}

export default Profile