import { useState } from "react";

const CheckoutPage = () => {
  const [form, setForm] = useState({ name: "", phoneNumber: "", address: "", paymentMethod: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <label className="form-label">Contact Number</label>
          <input type="tel" className="form-control" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <label className="form-label">Address</label>
          <textarea className="form-control" name="address" value={form.address} onChange={handleChange} required></textarea>
        </div>
        <div className="col-12">
          <label className="form-label">Payment Method</label>
          <select className="form-select" name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">Place Order</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
