import { useEffect, useState } from 'react';
import logo from '/favicon.png';
import { NavLink, useNavigate } from 'react-router-dom';
import ScrollToTop from '../../Components/ScrollToTop'
import { ImMenu3,ImMenu4  } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { MdSupportAgent } from "react-icons/md";  //support icon
import { fetchAuthSession } from 'aws-amplify/auth';

const cartApi = `https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/cart`

const Header = ({cartTrig, userLoading}) => {
  const [toggle,setToggle]=useState(false);
  const location = useLocation();
  const [count ,setCount] = useState(0);
  const navigate = useNavigate();

  const handletoggle= ()=>{
    setToggle(!toggle)
  }
  const getToken = async () => {
        try {
          const session = await fetchAuthSession();
          const idToken = session?.tokens?.idToken?.toString();
          if (!idToken) throw new Error("No idToken found in session");
          return idToken;
        } catch (err) {
          console.error("Error getting token:", err);
          if(location.pathname!='/') navigate("/Auth");
        }
      };
    useEffect(() => {
    const fetchcart = async () => {
      try{
        if (userLoading) return
        if (location.pathname !=='/products') return;
        const token = await getToken()
        const response = await fetch(cartApi, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        if (!response.ok) throw Error("Data Not Received properly, Please Reload. ")
        const data = await response.json();
        if (data?.message) {
          if (data.message === "Unauthorized") {
            console.log("Unauthorized, skipping fetch");
            return; // ✅ stop here
          }
        }else{
          const datarender=data.cartItems
          const products = datarender?.products || []; // safe fallback
          if (products.length !== 0) {
            setCount(products.length);
          } else {
            setCount(0)
          }
        }
      } catch (err){
        if(err == "TypeError: Cannot read properties of undefined (reading 'length')"){
          console.log("Loading error")
        }else{
          console.log(err)
        }
      }
    };
    fetchcart();
  }, [location.pathname,cartTrig]);

  return (
  <>
  <header>
    <nav className="navbar navbar-expand-xl navbar-dark main-bg">
      <div className="container-fluid row">
        
        <div className={`col-10 col-md-3 col-xl-2 order-2 order-xl-1 d-flex justify-content-md-center`}>
            <ScrollToTop />
            <NavLink to={"/"} className='align-middle'>
            <div className="align-middle">
            <img
                src={logo}
                className="logo-img"
                alt="Logo"
                title="Website_logo" 
            />
              <div className='d-inline fs-4 ms-2 align-middle fw-bold f-graduate color-default'>Genzonix</div>
            </div>
          </NavLink>
        </div >
        {/* <div className="col-2 col-md-3 col-xl-8 order-1 order-xl-2 d-none d-md-block">
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
        </div> */} 
         <div className="col-2 col-md-3 col-xl-2 order-3">
            <div className="d-flex flex-row text-end navbar-nav">
              <div className="col navbar-item">
                  <ScrollToTop />
                   {location.pathname === "/products" && (
                  <>
                    <NavLink to="/Cart" className="nav-link nav-icon d-md-inline me-md-4 gap-3 position-relative" title='Cart'>
                      <FaShoppingCart size={30}/>
                      {count!==0 && 
                        <span className={`position-absolute top-50 start-100 translate-middle badge ps-4 ps-lg-2 pt-3  fs-6 color-default`}>
                          {`${count}`}
                        </span>
                      }
                    </NavLink>                 
                  </>)}
                  
                  {location.pathname === "/profile" ? (
                  <NavLink to="/support" className="nav-link nav-icon d-block d-md-none" id='auth' title='profile info'>
                      <MdSupportAgent size={30}/>
                  </NavLink>): (
                    <NavLink to="/profile" className="nav-link nav-icon d-md-inline" id='auth' title='profile info'>
                      <CgProfile size={30}/>
                    </NavLink>
                  )}
              </div>
            </div>
          </div>        
      </div>
    </nav>
  </header>
  </>
)};

export default Header;
