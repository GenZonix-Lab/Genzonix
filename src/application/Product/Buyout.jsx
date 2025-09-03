import { useEffect, useState } from 'react'
import OrderDetails from '../Delivery/OrderDetails'
import PaymentGateway from '../Payment/PaymentGateway'
import { fetchAuthSession } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import ShippingAddress from '../Delivery/ShippingAddress';

const cart_api=`https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/cart/`;
const paymentApi=`https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/payment/`

const Buyout = () => {
  const navigate=useNavigate();
  //get token
  const getToken = async () => {
    try {
      const session = await fetchAuthSession();
      const idToken = session?.tokens?.idToken?.toString();
      if (!idToken) throw new Error("No idToken found in session");
      return idToken;
    } catch (err) {
      console.error("Error getting token:", err);
      navigate("/Auth");
    }
  };

  //fetch product data
  const [cost, setCost] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [cart, setCart] = useState([])
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = await getToken()
        const res = await fetch(cart_api, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const data_render = await res.json();
        setCart(data_render.buyItems?.products || [])
        setDelivery(data_render.buyItems?.delivery || 0)
        setCost(data_render.buyItems?.cost || 0)
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [])

//fetch payment data
const [credentials, setCredentials]=useState([]);
useEffect(()=>{
  const fetchapi=async()=>{
  try{
      const token =await getToken();
      const response = await fetch(paymentApi,{
          method:'GET',
          headers: {
              'Authorization': `Bearer ${token}`, // Cognito JWT token
          }
      })
      const data= await response.json();
      console.log(data)
      setCredentials(data.order_buy)
  }catch (error){
      console.error("Error fetching payment gateway credentials:",error);
  }
  };
  fetchapi();
},[])


  return (
<div className="container py-4">
  <h4 className="mb-4 text-center"><em>Checkout Summary</em></h4>
  <div className="order-detail mx-auto py-1" style={{maxWidth:'800px'}}>
    <h5>Order Details</h5>
      <OrderDetails 
        cart={cart} 
        delivery={delivery} 
        cost={cost}
      />
  </div>

<div className="user-detail mx-auto py-3" style={{maxWidth:'800px'}}>
  <hr />
  <h5>Shipping Address</h5>
    <ShippingAddress/>
</div>
<div className="payment-detail mx-auto py-3" style={{maxWidth:'800px'}}>
  <hr />
  <h5>Proceed to Pay</h5>
    <PaymentGateway 
      order_id={credentials.id || ''}
      amount={credentials.amount/100 || cost} 
      currency={credentials.currency || 'INR'} 
      solution_kit="products"
      checkout="buyout"
    />
</div>
</div>
      
    
  )
}

export default Buyout