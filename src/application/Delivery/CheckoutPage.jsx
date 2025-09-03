import { useState ,useEffect } from "react";
import { fetchAuthSession,fetchUserAttributes } from 'aws-amplify/auth';
import PaymentGateway from '../Payment/PaymentGateway'
import OrderDetails from './OrderDetails';
import { useNavigate } from 'react-router-dom';
import ShippingAddress from "./ShippingAddress";

const cart_api=`https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/cart/`;
const paymentApi=`https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/payment/`

const CheckoutPage = () => {
  const navigate=useNavigate();
  //get token id
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

  //get cart items
  const [cart,setCart]=useState([]);
  const [cost,setCost]=useState(0);
  const [delivery,setDelivery]=useState(0);
  useEffect(() => {
      const fetchCart = async () => {
        try {
          const token =await getToken();
          const res = await fetch(cart_api,{
              method: "GET",
              headers: {Authorization: `Bearer ${token}`}
            });
          const data_render = await res.json();
          const data=data_render.cartItems
          setCost(data.cost)
          setDelivery(data.delivery)
          setCart(data.products);
        } catch (err) {
          console.error("Error fetching cart:", err);
      }};
      fetchCart();
    }, []);
    
  //payment credentials
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
        setCredentials(data.order_cart)
    }catch (error){
        console.error("Error fetching payment gateway credentials:",error);
    }};
    fetchapi();
  },[])

  return (
    <>
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
            order_id={credentials.id}
            amount={credentials.amount/100} 
            currency={credentials.currency} 
            solution_kit="products"
            checkout="checkout"
          />
      </div>
    </div>
    </>
  );
};

export default CheckoutPage;
