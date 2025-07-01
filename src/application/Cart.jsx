import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchAuthSession } from 'aws-amplify/auth';
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { Atom } from 'react-loading-indicators';
import ShowAlert from "./ShowAlert";

const cart_api=`https://x69g27a76e.execute-api.ap-south-1.amazonaws.com/prod/cart/`


const Cart = () => {
  const [cart, setCart] = useState([]);
  const [delivery,setdelivery]=useState(0);
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [alert,setAlert]=useState('');
  const [trig,setTrig]=useState(0);
  const navigate = useNavigate();

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
      setAlert("Please log in to continue.");
      window.location.href = "/Auth";
    }
  };
  //get data from server
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const token =await getToken();
        const res = await fetch(cart_api,{
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
          });
        const data = await res.json();
        setCart(data.products.map(item => ({
          productCode: item.productCode,
          title: item.title, // ideally fetch real names/prices via another API
          price: item.price, // temporary static price, replace with actual
          quantity: parseInt(item.quantity),
          category:item.category,
          image:item.image,
        })));
      } catch (err) {
        console.error("Error fetching cart:", err);
        if (err.message?.includes("session.tokens is undefined")) {
          setAlert('Please login / Sign-Up'); 
          navigate('/Auth')
        } else {
          console.error('error:', err);
          }
      }finally{
        setLoading(false);
      }
  };
    fetchCart();
  }, []);
  const handleupdates=async(props)=>{
    try{
      const token =await getToken();
      const response=await fetch(cart_api,{
        method: "POST",
        headers: {
              'Authorization': `Bearer ${token}`, // Cognito JWT token
              'Content-Type': 'application/json'
            },
        body: JSON.stringify(props.type=='checkout'?{
          cost : props.cost || null,
          delivery:props.delivery || null,
          type : props.type || null,
        }:{
          productCode : props.productCode || null,
          category : props.category || null,
          title : props.title || null,
          quantity : props.quantity || null,
          price : props.price || null, 
          type : props.type || null,
          image : props.image || null
        })});
      const data= await response.json();
      return data;
    } catch (error){
      console.error("Error Message: ",error)
    }
  }
  const sub_cost = parseFloat(cart.reduce((sum, item) => sum + item.price * item.quantity, 0)).toFixed(2);
  const handleChange=(e) => setdelivery(parseInt(e.target.value))
  const cost=parseFloat(sub_cost) + delivery;
  const removeItem=async(code)=>{
    setCart(cart.filter((item) => item.productCode !== code));
    await handleupdates({type:'delete',productCode:code})
  }
  const updateItem=async(code,quantity, title, price, image, category)=>{
    const newQuantity = Math.max(1, quantity);
    try {
      const response = await handleupdates({type:'update',productCode:code,quantity:newQuantity,title:title,price:price,image:image,category:category});
      // If backend confirms update
      if (response.success) {
      setCart(
        cart.map((item) =>
          item.productCode === code && item.category === category
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      setErrorMessages(prev => ({ ...prev, [code]: null}));
    } else {
      setErrorMessages(prev => ({ ...prev, [code]: response.message}));
    }
    } catch (error) {
      setErrorMessages(prev => ({ ...prev, [code]: "Update failed:" }));
      console.error("Update failed:", error);
    }
  }
  const checkoutItem=async(newcost,del)=>{
    setTrig(Date.now())
    if (delivery === 0 && sub_cost < 400) {
    setAlert("Please select a delivery option");
    return;
  }else{
    await handleupdates({type:'checkout',cost:newcost,delivery:parseInt(del)})
    navigate("/checkout");
  }
  }
  return (
    <>
    <div className="container py-4 d-flex justify-content-center">
      {loading ? (
              <Atom color="#8488df" size="large" text="Please wait..." textColor="#ff00df" />
            ) : (
      <div>
      <ShowAlert
        message={alert}
        triggerKey={trig}
        type="info"
        duration={3000}
        redirectText=''
        redirectPath=''
      />
        <h2 
        className="mb-4" 
        style={cart.length === 0
          ?{
              backgroundColor:'#f0f8ff',
              color:'#050a30',
              textAlign:'center',
              padding:'50px',
              font:"900 50px italic"
              }:{}}>{cart.length === 0 ?'Your Cart is Empty':'Shopping Cart'}</h2>
      <div className="row gap-3">
        {cart.map((item) => (
          <div key={item.productCode} className="p-2 d-flex flex-row align-items-center justify-content-left border rounded">
            <div className="">
              <tbody>
                <tr>
                  <td>
                    <button className="btn px-md-3 px-1" style={{'color':'whitesmoke','border':'none'}} onClick={() => removeItem(item.productCode)}>
                      &#x2716;
                    </button>
                  </td>
                  <td>
                    <div className="cart-img">
                      <StorageImage 
                        alt="Product" 
                        path={item.image || 'default/default-thumbnail.png'}
                        width={100}
                        />
                    </div>
                  </td>
                  <td>
                    <div className="px-lg-5 px-1 title">
                    <h5>{item.title}</h5>
                    <p className="text-muted">Price: ₹{item.price}</p>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-secondary btn-sm" onClick={() => updateItem(item.productCode, parseInt(item.quantity) - 1,item.title,item.price,item.image,item.category)}>-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button className="btn btn-secondary btn-sm" onClick={() => updateItem(item.productCode, parseInt(item.quantity) + 1,item.title,item.price,item.image,item.category)}>+</button>
                      <span className="mx-4 text-warning">{errorMessages[item.productCode] ? errorMessages[item.productCode] : ''}</span>
                    </div>
                  </div>

                  </td>
                </tr>
              </tbody>
            </div>
          </div>
        ))}
        <div className="justify-content-end" style={cart.length=== 0?{display:'none'}:{display:'flex'}}><h4>Sub Total: <b>₹{sub_cost} </b></h4></div>
      </div>
      <div className="mt-4 text-end " style={cart.length=== 0?{display:'none'}:{display:''}}>
        <div className="d-flex justify-content-end">
          <div className="form-group text-start border-left py-3 px-5">
          <label htmlFor="shipping" className="form-label fs-3">Shipping: </label><br />
          <input type="radio" className="form-check-input fs-5 me-2" name="delivery" id="delivery" value={sub_cost < 400? 49 :0} onChange={handleChange}/><label className="form-check-label fs-4 align-middle">Delhivery: <b> ₹ {sub_cost < 400? 49 :0}</b></label><br />
          <input type="radio" className="form-check-input fs-5 me-2" name="delivery" id="delivery" value={sub_cost < 400? 59 :0} onChange={handleChange}/><label className="form-check-label fs-4">Speed Post: <b> ₹ {sub_cost < 400? 59 :0}</b></label>
        </div>
        </div>
        <div><h2>Total : ₹ {cost}</h2></div>
        <button className="btn btn-primary mt-2 w-100" onClick={()=>checkoutItem(cost,delivery)}>Proceed to Checkout</button>
      </div>
      </div>
      )}
    </div>
    <hr />
    </>
  );
};

export default Cart;