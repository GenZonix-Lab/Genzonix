import React, { useEffect, useState } from 'react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { getCurrentUser  } from 'aws-amplify/auth';

const getCurrentUserId = async () => {
  const { username, userId, signInDetails } = await getCurrentUser();
  return userId
};


const Products = () => {
  const [components, setComponents] = useState([]);

  const handleAddToCart = async (productCode) => {
    const userid = await getCurrentUserId();
    const res = await fetch("https://x69g27a76e.execute-api.ap-south-1.amazonaws.com/prod/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid,
        productCode,
        quantity: 1
      })
    });
    const data = await res.json();
    if (data.success) {
      alert("Added to cart!");
    } else {
      alert("Failed to add.");
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

  const kits = [
    {
      id: 1,
      name: "IoT Starter Kit",
      description: "A beginner-friendly IoT kit with essential sensors and modules.",
      price: "₹1699",
      key:"GZXKITIOT",
      image: '/images/Boxcomponents.png'
    },
   /*  {
      id: 2,
      name: "AI Vision Kit",
      description: "An advanced kit for AI-based computer vision projects.",
      price: "₹4999",
      image: "#"
    },
    {
      id: 3,
      name: "Cloud Connected Kit",
      description: "A kit designed for cloud-integrated IoT applications.",
      price: "₹3999",
      image: "#"
    } */
  ];
  return (
    <>
    <div className="container text-center">
    <div className="title"><h2 className="mt-3 p-2"></h2></div>
    <div className="row justify-content-center justify-content-lg-start">
      {components
      .filter(components => components.shown)
      .map(product => (
       <div key={product.productCode} className="col-10 col-md-4 col-lg-3 col-sm-6 mb-4">
       <div className="card h-100 shadow-sm card-product d-flex flex-column">
        {product.meta && (
          <StorageImage 
            alt="Product" 
            path={product.meta?.thumbnail || 'default/default-thumbnail.png'}
            />
        )}
         <div className="card-body d-flex flex-column">
           <h5 className="card-title">{product.title}</h5>
           <p className="card-text truncate-description">{product.description}</p>
           <div className="mt-auto">
           <p className="fw-bold fs-4">{product.price}</p>
             <div className="d-flex justify-content-center align-items-end">
               <button className="btn-default btn-product-btn me-2 p-1" onClick={()=>{getCurrentUserId()}}>Buy Now</button>
               <button className="btn-default btn-product-btn p-1" onClick={()=>{handleAddToCart(product.productCode)}}>Add Cart</button>
             </div>
           </div>
            </div>
          </div>
        </div>
        
      ))}
    </div>
    <hr />
    <div className="title"><h2 className="mt-3 p-2">DIY Kits</h2></div>
    <div className="row justify-content-center justify-content-lg-start">
      {kits.map(product => (
        <div key={product.id} className="col-10 col-md-4 col-lg-3 col-sm-6 mb-4">
          <div className="card h-100 shadow-sm card-product">
            <img src={product.image} className="card-img-top" alt={product.name} />
              {console.log(product.image)}
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <div className="mt-auto">
                <p className="fw-bold fs-4">{product.price}</p>
                <div className="d-flex justify-content-center align-items-end">
                  <button className="btn-default btn-product-btn me-2 p-1">Buy Now</button>
                  <button className="btn-default btn-product-btn p-1">Add Cart</button>
                </div>
              </div>
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