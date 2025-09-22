import  { useEffect, useRef, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { PiPackageDuotone } from "react-icons/pi";
import { RiRobot3Fill } from "react-icons/ri";
import { BsCloudPlus } from "react-icons/bs";
import { BsCloud } from "react-icons/bs";
import ScrollToTop from '../../Components/ScrollToTop'
import { NavLink , useNavigate, useOutletContext} from 'react-router';
import { CgMaximize } from 'react-icons/cg';
import { fetchAuthSession } from 'aws-amplify/auth';
import Loading from '../../Components/Loading';
import { LuNotebookPen } from "react-icons/lu";
const Profile = () => {
    const navigate = useNavigate();
    const { userLoading} = useOutletContext();
    const icon_size = 30;

    //check user auth
    const userLoadingRef = useRef(userLoading);
    useEffect(() => {
        userLoadingRef.current = userLoading;
    }, [userLoading]);
    useEffect(() => {
        setTimeout(() => {
        if (userLoadingRef.current) {
        navigate("/Auth");
        }
    }, 3000);
    }, [navigate]);
  return (
    <>
        <div className="container mt-2">
            {userLoading ? <Loading/> :
            <div className='bg-transparent border-md-left w-md-fit m-md-auto p-4 row'>
                <div className="col-lg-6">
                    <div className="mt-3 px-md-5">
                        <ScrollToTop />
                        <NavLink to="/Auth" className="nav-link nav-icon d-flex fs-5" id='auth' title='profile info'>
                            <RiRobot3Fill size={icon_size}/><div className='fs-xs-6 ps-3'>personal information</div>
                        </NavLink>
                    </div><hr />
                </div>
                <div className="col-lg-6">
                    <div className="mt-3 px-md-5">
                        <ScrollToTop />
                        <NavLink to="/order" className="nav-link nav-icon fs-5 d-flex" title='order'>
                        <PiPackageDuotone size={icon_size}/><div className='fs-xs-6 ps-3'>Order</div>
                        </NavLink>
                    </div><hr />
                </div>
                <div className="col-lg-6">
                    <div className="mt-3 px-md-5">
                        <ScrollToTop />
                        <NavLink to="/Cart" className="nav-link nav-icon fs-5 d-flex" title='Cart'>
                            <FaShoppingCart size={icon_size}/><div className='fs-xs-6 ps-3'>Cart</div>
                        </NavLink>
                    </div><hr />
                </div>
                <div className="col-lg-6">
                    <div className="mt-3 px-md-5">
                        <ScrollToTop />
                        <NavLink to="/subscriptiondetails" className="nav-link nav-icon fs-5 d-flex" title='Subscription'>
                            <BsCloudPlus size={icon_size}/><div className='fs-xs-6 ps-3'>Subscription</div>
                        </NavLink>
                    </div><hr />
                </div>
                <div className="col-lg-6">
                    <div className="mt-3 px-md-5">
                        <ScrollToTop />
                        <NavLink to="/dairy" className="nav-link nav-icon fs-5 d-flex" title='DigitalDairy'>
                            <LuNotebookPen size={icon_size}/><div className='fs-xs-6 ps-3'>My Digital Dairy</div>
                        </NavLink>
                    </div><hr />
                </div>
            </div>
            }
        </div>
    </>
  )
}

export default Profile