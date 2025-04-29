import React from 'react'
const Products = () => {
  const singleComponents = [
    {
      id: 1,
      name: "ESP32 Module with micro-USB cable",
      description: "A powerful Wi-Fi and Bluetooth-enabled microcontroller.",
      price: "₹399",
      key:"GZXMCESP32",
      image: "/images/ESP32_with_cable.png",
      checked: false
    },
    {
      id: 2,
      name: "Relay Module",
      description: "5V Dual Channel Relay Module with Optocoupler.",
      price: "₹89",
      key:"GZXMODRE",
      image: "/images/5V Dual Channel Relay Module with Optocoupler.png",
      checked: true
    },
    {
      id: 3,
      name: "LDR sensor",
      description: "The Digital LDR Module is used to detect the presence of light.",
      price: "₹49",
      KEY:"GZXSLDR",
      image: "/images/LDR Sensor.png",
      checked: true
    },
    {
      id: 4,
      name: "IR Sensor Module",
      description: "Infrared Obstacle Avoidance IR Sensor Module (Active Low) uses IR transmitter and receiver tubes to detect obstacles.",
      price: "₹49",
      key:"GZXSIR",
      image: "/images/IR_Sensor.png",
      checked: true
    },
    {
      id: 5,
      name: "HC-SR04-Ultrasonic Range Finder",
      description: "The HC-SR04 Ultrasonic Range Finder is a popular sensor for distance measurement and object detection.",
      price: "₹79",
      key:"GZXSUS",
      image: "/images/Ultrasonic Sensor.png",
      checked: true
    },
    {
      id: 6,
      name: "Mini Breadboard",
      description: "The SYB-170 Mini Solderless Breadboard is named for its 170 tie points.",
      price: "₹25",
      key:"GZXBBB",
      image: "/images/Breadboard.png",
      checked: true
    },
    {
      id: 7,
      name: "Battery Connector Cap",
      description: "9v Battery Snap Connector + DC Jack",
      price: "₹25",
      key:"GZXBCC",
      image: "/images/connector.png",
      checked: true
    }
  ];

  
  
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
      {singleComponents.map(product => (
       <div key={product.id} checked={product.checked?'':''} className="col-10 col-md-4 col-lg-3 col-sm-6 mb-4">
       <div className="card h-100 shadow-sm card-product d-flex flex-column">
         <img src={product.image} className="card-img-top" alt={product.name} />
         <div className="card-body d-flex flex-column">
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