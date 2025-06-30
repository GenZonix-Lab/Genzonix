import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchAuthSession } from 'aws-amplify/auth';
import { StorageImage } from "@aws-amplify/ui-react-storage";

const cart_api=`https://x69g27a76e.execute-api.ap-south-1.amazonaws.com/prod/cart/`
const getToken = async () => {
  const session = await fetchAuthSession(); // await the session
  const token = session.tokens.idToken.toString(); // now you have the JWT string
  return token;
};

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [delivery,setdelivery]=useState(0);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  //get data from server
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token =await getToken();
          if (!token) {
            throw new Error("session.tokens is undefined");
          }
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
          alert('Please login / Sign-Up'); 
          navigate('/Auth')
        } else {
          console.error('error:', err);
          }
    }};
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
    if (delivery === 0 && sub_cost < 400) {
    alert("Please select a delivery option");
    return;
  }else{
    await handleupdates({type:'checkout',cost:newcost,delivery:parseInt(del)})
    navigate("/checkout");
  }
  }
  return (
    <>
    <div className="container py-4">
      <h1 className="mb-4">{cart.length === 0 ?'Your Cart is Empty':'Shopping Cart'}</h1>
      <div className="row g-3">
        {cart.map((item) => (
          <div key={item.productCode} className="col-12 p-3 d-flex flex-row align-items-center justify-content-left border rounded">
            <button className="btn px-3" style={{'color':'whitesmoke','border':'none'}} onClick={() => removeItem(item.productCode)}>
              &#x2716;
            </button>
            <div>
              <StorageImage 
                alt="Product" 
                path={item.image || 'default/default-thumbnail.png'}
                width={100}
                />
            </div>
            <div className="px-5">
              <h5>{item.title}</h5>
              <p className="text-muted">Price: ₹{item.price}</p>
              <div className="d-flex align-items-center">
                <button className="btn btn-secondary btn-sm" onClick={() => updateItem(item.productCode, parseInt(item.quantity) - 1,item.title,item.price,item.image,item.category)}>-</button>
                <span className="mx-2">{item.quantity}</span>
                <button className="btn btn-secondary btn-sm" onClick={() => updateItem(item.productCode, parseInt(item.quantity) + 1,item.title,item.price,item.image,item.category)}>+</button>
                <span className="mx-4 text-warning">{errorMessages[item.productCode] ? errorMessages[item.productCode] : ''}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-end " style={cart.length=== 0?{display:'none'}:{display:''}}>
        <div className="d-flex justify-content-end">
          <div className="form-group text-start">
            <label className="form-check-label"><h5>Sub Total: <b>₹{sub_cost} </b></h5></label><br />
          <label htmlFor="shipping" className="form-label">Shipping: </label><br />
          <input type="radio" className="form-check-input" name="delivery" id="delivery" value={sub_cost < 400? 49 :0} onChange={handleChange}/><label className="form-check-label">Delhivery: <b> ₹ {sub_cost < 400? 49 :0}</b></label><br />
          <input type="radio" className="form-check-input" name="delivery" id="delivery" value={sub_cost < 400? 59 :0} onChange={handleChange}/><label className="form-check-label">Speed Post: <b> ₹ {sub_cost < 400? 59 :0}</b></label>
        </div>
        </div>
        <div><h2>Total:{cost}</h2></div>
        <button className="btn btn-primary mt-2 w-100" onClick={()=>checkoutItem(cost,delivery)}>Proceed to Checkout</button>
      </div>
    </div>
    <hr />
    </>
  );
};

export default Cart;