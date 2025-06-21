import { useState, useEffect} from "react";
import { NavLink } from "react-router";
import { getCurrentUser  } from 'aws-amplify/auth';

const getCurrentUserId = async () => {
  const { username, userId, signInDetails } = await getCurrentUser();
  return userId
};

const Cart = () => {
  const [cart, setCart] = useState([]);
  const userid = getCurrentUserId();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`https://x69g27a76e.execute-api.ap-south-1.amazonaws.com/prod/cart/${userId}`);
        const data = await res.json();

        // Assuming data = { products: [{ productCode, quantity }], ... }
        // You may want to map it with real product details here
        setCart(data.products.map(item => ({
          id: item.productCode,
          name: `Product ${item.productCode}`, // ideally fetch real names/prices via another API
          price: 100, // temporary static price, replace with actual
          quantity: item.quantity
        })));
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [userId]);
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
