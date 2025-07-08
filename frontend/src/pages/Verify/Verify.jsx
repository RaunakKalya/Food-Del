import React, { useEffect, useContext } from 'react';
import './Verify.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // ✅ Required for API calls
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId
      });

      if (response.data.success) {
        navigate("/myOrders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      <div className="spinner"></div>
      <p>Verifying your payment...</p>
    </div>
  );
};

export default Verify;
