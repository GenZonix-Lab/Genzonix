import React, { useEffect, useState } from 'react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { fetchAuthSession  } from 'aws-amplify/auth';

const Products = () => {
  const [components, setComponents] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');

  const showPopup = (msg) => {
  setPopupMessage(msg);
  setTimeout(() => {
    setPopupMessage('');
  }, 800); // Disappear after 3 seconds
};
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
    window.alert("Please log in to continue.");
    window.location.href = "/Auth";
  }
};
  const handleAddToCart = async (productCode,price,title,image,category) => {
    try{
    const token =await getToken();
    const res = await fetch("https://x69g27a76e.execute-api.ap-south-1.amazonaws.com/prod/cart", {
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
    if (data.success) {
      showPopup("Added to cart!");
    } else {
      if(data.message=="Not enough stock"){
        showPopup("Out of stock")
      }
      
    }
  }
  catch (error){
    if (error.name === 'UserUnAuthenticatedException' || error.message?.includes('User needs to be authenticated') || error.message?.includes("tokens is undefined")) {
      showPopup('Please login / Sign-Up'); 
    } else {
      console.error('Add to cart error:', error);
      showPopup('Thanks for your patience');
    }
  }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ki4mm5ajnj.execute-api.ap-south-1.amazonaws.com/prod/add");
        if (!response.ok) {
            throw new Error('Network response was not ok in fetch data ' + response.statusText);
        }
        const data = await response.json();
        setComponents(JSON.parse(data.body));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
<>
  <div className="container text-center">
    <div className="title"><h2 className="mt-3 p-2">COMPONENTS</h2></div>
    <div className="row justify-content-center justify-content-lg-start">
      {popupMessage && (
        <div className="alert alert-success position-fixed top-0 start-50 translate-middle-x py-4" role="alert" style={{ zIndex: 9999,borderBottom : '4px solid' }}>
          {popupMessage}
        </div>
      )}
      {components
      .filter(components => components.shown)
      .map(product => (
      <div key={product.productCode} className='row mb-4 card-app'>
        <div className="col-xl-3 col-lg-5 col-md-6 col-12 row py-2">
          <div className="col-12 uniform-img">
          {product.meta && (
            <StorageImage 
              alt="Product" 
              className='rounded-top'
              path={product.meta?.thumbnail || 'default/default-thumbnail.png'}
              />
          )}
        </div>
        <div className="col-12 mt-sm-3 mt-2 mt-md-1">
          <button className="btn btn-default px-5 py-2 mt-3 mt-sm-1 mt-xl-0" onClick={()=>{handleAddToCart(product.productCode,product.price,product.title,product.meta?.thumbnail,product.category)}}>Add Cart</button>
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
    </div>    
  </div>
  <hr />
</>
  )
}

export default Products