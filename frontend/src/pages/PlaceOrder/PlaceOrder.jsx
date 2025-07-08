import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '',
    state: '', pincode: '', country: '', phone: ''
  });

  const navigate = useNavigate();
  const totalAmount = getTotalCartAmount() + 20;

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) navigate('/cart');
  }, [token]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderItems = food_list.filter(item => cartItems[item._id] > 0).map(item => ({
      ...item,
      quantity: cartItems[item._id]
    }));

    const orderData = {
      userId: JSON.parse(atob(token.split('.')[1])).id,
      address: data,
      items: orderItems,
      amount: totalAmount
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        window.location.href = response.data.session_url;
      } else {
        alert("Payment session failed to initialize.");
      }
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" value={data.firstName} onChange={onChangeHandler} placeholder="First Name" />
          <input required name="lastName" value={data.lastName} onChange={onChangeHandler} placeholder="Last Name" />
        </div>
        <input required name="email" value={data.email} onChange={onChangeHandler} placeholder="Email Address" />
        <input required name="street" value={data.street} onChange={onChangeHandler} placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" value={data.city} onChange={onChangeHandler} placeholder="City" />
          <input required name="state" value={data.state} onChange={onChangeHandler} placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="pincode" value={data.pincode} onChange={onChangeHandler} placeholder="PIN Code" />
          <input required name="country" value={data.country} onChange={onChangeHandler} placeholder="Country" />
        </div>
        <input required name="phone" value={data.phone} onChange={onChangeHandler} placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p><p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p><p>₹20</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b><b>₹{totalAmount}</b>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
