import { useState } from "react";
import { NavLink } from "react-router";

const Cart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "HC-SR04 Ultrasonic Sensor", price: 150, quantity: 1 },
    { id: 2, name: "IR Obstacle Avoidance Sensor", price: 100, quantity: 2 },
  ]);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
    <div className="container py-4">
      <h1 className="mb-4">Shopping Cart</h1>
      <div className="row g-3">
        {cart.map((item) => (
          <div key={item.id} className="col-12 p-3 d-flex flex-row align-items-center justify-content-between border rounded">
            <div>
              <h5>{item.name}</h5>
              <p className="text-muted">Price: ₹{item.price}</p>
              <div className="d-flex align-items-center">
                <button className="btn btn-secondary btn-sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span className="mx-2">{item.quantity}</span>
                <button className="btn btn-secondary btn-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>
            <button className="btn btn-danger" onClick={() => removeItem(item.id)}>
              &#128465;
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 text-end">
        <h4>Total: ₹{totalPrice}</h4>
        <NavLink to={"/checkout"}>
        <button className="btn btn-primary mt-2 w-100">Proceed to Checkout</button>
        </NavLink>
      </div>
    </div>
    <hr />
    </>
  );
};

export default Cart;
