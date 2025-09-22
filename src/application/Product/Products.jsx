import { useEffect, useRef, useState } from 'react';
import ShowAlert from '../../Components/ShowAlert.jsx'
import { useNavigate, useOutletContext } from 'react-router-dom';
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
  const [ProductLoading, setProductLoading] = useState(true)
  const navigate = useNavigate();
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

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(userLoading) return;
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

