import React, { useEffect, useState } from 'react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { fetchAuthSession  } from 'aws-amplify/auth';
import ShowAlert from '../../Components/ShowAlert.jsx'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.jsx';
import AllKits from './AllKits.jsx';
import Robotics from './Robotics.jsx';
import AI from './AI.jsx';
import Iot from './Iot.jsx';
import Components from './Components.jsx';
import Loading from '../../Components/Loading.jsx';

const productApi = "https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/products"

const Products = () => {
  const { setCartTrig ,userLoading} = useOutletContext();
  const [components, setComponents] = useState([]);
  const [kits, setKits] = useState([]);
  const [alertMsg,setAlertMsg] = useState('');
  const [trig, setTrig] = useState(0);
  const navigate = useNavigate()
  const [ProductLoading, setProductLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(userLoading) navigate("/Auth");
        const response = await fetch(productApi);
        if (!response.ok) { 
          throw new Error('Network response was not ok in fetch data ' + response.statusText);  
        } else {
          const data = await response.json();
          setComponents(data.components)
          setKits(data.kits)
          setProductLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const kitss = kits.map((element)=>{
    const price = parseFloat(element.price.replace("₹", "")).toFixed(2);
    const mrp = parseFloat(element.mrp.replace("₹", "")).toFixed(2);
    const discount = ((mrp - price) * 100) / mrp;
    const stock = parseInt(element.stock)
    return { ...element, discount: discount.toFixed(2), stock:stock};
})

  return (
    <>    
   {ProductLoading ? <Loading/> :
    <div className="container">
      <div className='d-flex '>
        <ShowAlert
          message={alertMsg}
          triggerKey={trig}
          type={alertMsg=="Out of stock"?"error":alertMsg=="Added to cart!"?"success":"info"}
          duration={3000}
          redirectText={alertMsg =="Out of stock" || alertMsg == "Added to cart!"?"Cart":''}
          redirectPath={alertMsg =="Out of stock" || alertMsg == "Added to cart!"?"/cart":''}
        />
      </div>
      <nav className="fs-7 fs-md-6 nav nav-tabs d-flex justify-content-around mt-2" id="nav-tab" role="tablist">
          <button className="nav-link active col" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home-tab" aria-selected="true">All Kits</button>
          <button className="nav-link col" id="nav-robotics-tab" data-bs-toggle="tab" data-bs-target="#nav-robotics" type="button" role="tab" aria-controls="nav-robotics" aria-selected="false">Robotics</button>
          <button className="nav-link col" id="nav-ai-tab" data-bs-toggle="tab" data-bs-target="#nav-ai" type="button" role="tab" aria-controls="nav-ai" aria-selected="false">AI</button>
          <button className="nav-link col" id="nav-iot-tab" data-bs-toggle="tab" data-bs-target="#nav-iot" type="button" role="tab" aria-controls="nav-iot" aria-selected="false">IoT</button>
          <button className="nav-link col" id="nav-components-tab" data-bs-toggle="tab" data-bs-target="#nav-components" type="button" role="tab" aria-controls="nav-components" aria-selected="false">Components</button>
      </nav>
      <main>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
            <AllKits kits={kitss} setAlertMsg={setAlertMsg} setTrig={setTrig} setCartTrig ={setCartTrig}/>
          </div>
          <div className="tab-pane fade" id="nav-robotics" role="tabpanel" aria-labelledby="nav-robotics-tab" tabIndex="0">
            <Robotics kits={kitss} setAlertMsg={setAlertMsg} setTrig={setTrig} setCartTrig ={setCartTrig}/>
          </div>
          <div className="tab-pane fade" id="nav-ai" role="tabpanel" aria-labelledby="nav-ai-tab" tabIndex="0">
            <AI kits={kitss} setAlertMsg={setAlertMsg} setTrig={setTrig} setCartTrig ={setCartTrig}/>
          </div>
          <div className="tab-pane fade" id="nav-iot" role="tabpanel" aria-labelledby="nav-iot-tab" tabIndex="0">
            <Iot kits={kitss} setAlertMsg={setAlertMsg} setTrig={setTrig} setCartTrig ={setCartTrig}/>
          </div>
          <div className="tab-pane fade" id="nav-components" role="tabpanel" aria-labelledby="nav-components-tab" tabIndex="0">
            <Components components={components} setAlertMsg={setAlertMsg} setTrig={setTrig} setCartTrig ={setCartTrig}/>
          </div> 
        </div>
      </main>
   </div>
   }
   </>
  )
}

export default Products


/* 
{components
      .filter(components => components.shown)
      .map(product => (
      <div key={product.productCode} className='row mb-4 card-app'>
        <div className="col-xl-3  col-lg-5 col-md-6 col-12">
          <div className='d-flex flex-column align-items-center p-3 h-100'>
            <div className="uniform-img text-center">
              {product.meta && (
                <StorageImage 
                   alt="Image was Loading"
                   className='rounded-top'
                   path={product.meta?.thumbnail || 'default/default-thumbnail.webp'}
                 />
              )}
            </div>
            <div className="my-2">
              <button className="btn btn-default px-5 py-2 mt-3 mt-sm-1 mt-xl-0" onClick={()=>{handleAddToCart(product.productCode,product.price,product.title,product.meta?.thumbnail,product.category)}}>Add Cart</button>
            </div>
          </div>
        </div>



        <div className="row col-xl-9 col-lg-7 col-md-6 col-12 py-3">
          <div className='truncate-description'>
            <div className="title text-start"><h4>{product.title}</h4></div>
            <div className="text-start"><p>{product.description}</p></div>
          </div>
          <div className="row align-items-end mt-md-0 mt-3">
            <div className="col-md-12 col-6 docs mb-0 fs-5 text-md-end text-start"><h4>{product.stock!=0?product.price:null}</h4></div>
            <em className='col-md-12 col-6 text-end' style={{ color: product.stock != 0 ? 'green' : 'red' }}>{product.stock!=0?"in stock":"out of stock"}</em>
          </div>
        </div>
      </div>
      ))}
*/
/* 
  const [components, setComponents] = useState([]);
  const [alertMsg,setAlertMsg] = useState('');
  const [trig, setTrig] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const getToken = async () => {
    try{
      const session = await fetchAuthSession(); // await the session
      const token = session.tokens.idToken.toString(); // now you have the JWT string
      if (!token) {
        console.warn("User session not found. Redirecting to auth...");
        throw new Error("No idToken found in session");
      }
      return token;
    }catch(err){
      console.error("Error getting token:", err);
      setAlertMsg("Please log in to continue.");
      window.location.href = "/Auth";
    }
  };
  const handleAddToCart = async (productCode,price,title,image,category) => {
    try{
    const token =await getToken();
    const res = await fetch(cartApi, {
      method: "POST",
      headers: {
              'Authorization': `Bearer ${token}`, // Cognito JWT token
              'Content-Type': 'application/json'
            },
      body: JSON.stringify({
        productCode,
        title,
        price,
        image,
        category,
        quantity: 1
      })
    });
    const data = await res.json();
    setTrig(Date.now());
    if (data.success) {
      setAlertMsg("Added to cart!")
    } else {
      if(data.message=="Not enough stock"){
      setAlertMsg("Out of stock")
      }
    }
  }
  catch (error){
    if (error.name === 'UserUnAuthenticatedException' || error.message?.includes('User needs to be authenticated') || error.message?.includes("tokens is undefined")) {
      setAlertMsg('Please login / Sign-Up')
    } else {
      console.error('Add to cart error:', error);
      setAlertMsg('We apologize for the inconvenience. Our support team is working to resolve the issue.')
    }
  }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(productApi);
        if (!response.ok) {
            throw new Error('Network response was not ok in fetch data ' + response.statusText);
        }
        const data = await response.json();
        setComponents(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
return(
<div className="container py-4 d-flex justify-content-center">
    {loading ? (
      <div className="m-5 p-5">
        <ThreeDot 
          variant="bounce" 
          color="#cae8ff" 
          size="200px" 
          text="please wait..." 
          textColor="#549acf" 
        />
      </div>) : (
    <div className="container-fluid">
      <div className='d-flex '>
      <ShowAlert
        message={alertMsg}
        triggerKey={trig}
        type={alertMsg=="Out of stock"?"error":alertMsg=="Added to cart!"?"success":"info"}
        duration={3000}
        redirectText={alertMsg =="Out of stock" || alertMsg == "Added to cart!"?"Cart":''}
        redirectPath={alertMsg =="Out of stock" || alertMsg == "Added to cart!"?"/cart":''}
      />
    </div>
    <div className="title"><h2 className="mt-3 p-2">COMPONENTS</h2></div>
    <div className="row justify-content-center">
      
    </div>   
    </div>  
    )} 
  </div>)
{components
      .filter(components => components.shown)
      .map(product => (
      <div key={product.productCode} className='row mb-4 card-app'>
        <div className="col-xl-3  col-lg-5 col-md-6 col-12">
          <div className='d-flex flex-column align-items-center p-3 h-100'>
            <div className="uniform-img text-center">
              {product.meta && (
                <StorageImage 
                   alt="Image was Loading"
                   className='rounded-top'
                   path={product.meta?.thumbnail || 'default/default-thumbnail.webp'}
                 />
              )}
            </div>
            <div className="my-2">
              <button className="btn btn-default px-5 py-2 mt-3 mt-sm-1 mt-xl-0" onClick={()=>{handleAddToCart(product.productCode,product.price,product.title,product.meta?.thumbnail,product.category)}}>Add Cart</button>
            </div>
          </div>
        </div>



        <div className="row col-xl-9 col-lg-7 col-md-6 col-12 py-3">
          <div className='truncate-description'>
            <div className="title text-start"><h4>{product.title}</h4></div>
            <div className="text-start"><p>{product.description}</p></div>
          </div>
          <div className="row align-items-end mt-md-0 mt-3">
            <div className="col-md-12 col-6 docs mb-0 fs-5 text-md-end text-start"><h4>{product.stock!=0?product.price:null}</h4></div>
            <em className='col-md-12 col-6 text-end' style={{ color: product.stock != 0 ? 'green' : 'red' }}>{product.stock!=0?"in stock":"out of stock"}</em>
          </div>
        </div>
      </div>
      ))}
*/