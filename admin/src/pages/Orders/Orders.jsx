// import React from 'react'
// import './Orders.css'
// import {toast} from "react-toastify"
// import { useState } from 'react'
// import { useEffect } from 'react'
// import axios from "axios"
// import {assets} from "../../assets/assets"
// const Orders = ({url}) => {

//   const [orders,setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     const response = await axios.get(url+"/api/order/list");
//     if (response.data.success) {
//       setOrders(response.data.data);
//       console.log(response.data.data);
//     }
//     else{
//       toast.error("Error")
//     }                      
//   }

//   const statusHandler = async (event,orderId) =>{
//     const response = await axios.post(url+"/api/order/status",{
//       orderId,
//       status:event.target.value
//     })
//     if (response.data.success) {
//       await fetchAllOrders();
//     }
//   }

//   useEffect(()=>{
//     fetchAllOrders();
//   },[])

//   return (
//     <div className='order add'>
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order,index)=>{
//           <div key={index} className="order-item">
//             <img src={assets.parcel_icon} alt="" />
//             <div>
//               <p className='order-item-food'>
//                 {order.items.map((item,index)=>{
//                   if (index===order.items.length-1) {
//                     return item.name + " x " + item.quantity
//                   }
//                   else{
//                     return item.name + " x " + item.quantity + ", "
//                   }
//                 })}
//               </p>
//               <p className='order-item-name'>
//                 {order.address.firstName+" "+order.address.lastName}
//               </p>
//               <div className="order-item-address">
//                 <p>{order.address.street+","}</p>
//                 <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.pincode}</p>
//               </div>
//               <p className="order-item-phone">{order.address.phone}</p>
//             </div>
//             <p>Items : {order.items.length}</p>
//             <p>₹{order.amount}</p>
//             <select onChange={(event)=>statusHandler(event,order._Id)} value={order.status}>
//               <option value="Food Proccessing">Food Proccessing</option>
//               <option value="Out for delivery">Out for deliver</option>
//               <option value="Food Delivered">Food Delivered</option>
//             </select>
//           </div>
//         })}
//       </div>
        
//     </div>
//   )
// }

// export default Orders

import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
        console.log('Orders fetched:', response.data.data);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Fetch orders error:', error.message);
      toast.error('Server error while fetching orders');
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + '/api/order/status', {
        orderId,
        status: event.target.value,
      });

      if (response.data.success) {
        await fetchAllOrders();
        toast.success('Order status updated');
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Status update error:', error.message);
      toast.error('Error updating order status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx !== order.items.length - 1 && ', '}
                    </span>
                  ))}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + ' ' + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state},{' '}
                    {order.address.country}, {order.address.pincode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>₹{order.amount}</p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >
                <option value="Food Proccessing">Food Processing</option>
                <option value="Out for delivery">Out for Delivery</option>
                <option value="Food Delivered">Food Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
