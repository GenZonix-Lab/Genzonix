import { useState ,useEffect } from "react";
import { fetchAuthSession,fetchUserAttributes } from 'aws-amplify/auth';
import PaymentGateway from '../Payment/PaymentGateway'
import OrderDetails from './OrderDetails';

const cart_api=`https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/cart/`;
const paymentApi=`https://yn5xuarjc7.execute-api.ap-south-1.amazonaws.com/3alim/payment/`

const getToken = async () => {
  const session = await fetchAuthSession(); // await the session
  const token = session.tokens.idToken.toString(); // now you have the JWT string
  return token;
};
const CheckoutPage = () => {
  const [cart,setCart]=useState([]);
  const [cost,setCost]=useState(0);
  const [attributes, setAttributes] = useState({});
  const [delivery,setDelivery]=useState(0);
  const [token, setToken] = useState("");
  const [credentials, setCredentials]=useState([]);

  useEffect(() => {
      const fetchCart = async () => {
        try {
          const fetchuser = await fetchUserAttributes()
          const token =await getToken();
          setToken(token);
          setAttributes(fetchuser)
          const res = await fetch(cart_api,{
              method: "GET",
              headers: {Authorization: `Bearer ${token}`}
            });
          const data = await res.json();
          setCost(data.cost)
          setDelivery(data.delivery)
          setCart(data.products.map(item => ({
            productCode: item.productCode,
            title: item.title, // ideally fetch real names/prices via another API
            price: item.price, // temporary static price, replace with actual
            quantity: parseInt(item.quantity),
          })));
        } catch (err) {
          console.error("Error fetching cart:", err);
          if (err.message?.includes("session.tokens is undefined")) {
            console.error('Please login / Sign-Up'); 
          } else {
            console.error('error:', err);
            }
      }};
      fetchCart();
    }, []);
    const ProfileUpdatepage=()=> {
        window.location.href = "/profileUpdate";
      }
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
        setCredentials(data)
    }catch (error){
        console.error("Error fetching payment gateway credentials:",error);
    }
    };
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
        <div className='amplify-flex amplify-field amplify-textfield'>
          <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
              <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                  <textarea
                  rows={'6'}
                  type="text"
                  name="address"
                  className='amplify-input amplify-field-group__control fst-italic'
                  value={`${attributes?.['name'] ? attributes?.['name'] : '' }
${attributes?.['custom:doorNo'] ? attributes?.['custom:doorNo'] +', ' : '' } ${attributes?.address ? attributes?.address+', ' : '' }${attributes?.['custom:addressLine3'] ? attributes?.['custom:addressLine3']+',' : '' }
${attributes?.['custom:addressLine2'] ? attributes?.['custom:addressLine2']+', ' : '' } 
${attributes?.['custom:district'] ? attributes?.['custom:district']+ (attributes?.['custom:pincode'] ?'':',' ): ''}${attributes?.['custom:pincode'] ? ' - '+attributes?.['custom:pincode'] : ''}
${attributes?.['custom:states'] ? attributes?.['custom:states']+',' : ''} ${attributes?.['custom:country'] ? attributes?.['custom:country'] : ''}
Phone Number :${attributes?.['phone_number'] ? attributes?.['phone_number'] : 'please update your phone number'}`}
                  placeholder="Address"
                  readOnly
                  />
              </div>
          </div>
          <div className='amplify-flex amplify-field amplify-textfield text-end'>
            <div className='amplify-flex amplify-field-group amplify-field-group--horizontal'>
              <div className='amplify-field-group__field-wrapper amplify-field-group__field-wrapper--horizontal'>
                <button className='p-2 me-2 amplify-button amplify-button--primary' onClick={()=>ProfileUpdatepage()}>{attributes?.address?'Update':attributes?.['custom:pincode'] ?"fill your address corrrectly":'fill your Address here'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="payment-detail mx-auto py-3" style={{maxWidth:'800px'}}>
        <hr />
        <h5>Proceed to Pay</h5>
          <PaymentGateway 
            order_id={credentials.id}
            amount={credentials.amount/100} 
            currency={credentials.currency} 
            solution_kit="products"
          />
      </div>
    </div>
    </>
  );
};

export default CheckoutPage;
