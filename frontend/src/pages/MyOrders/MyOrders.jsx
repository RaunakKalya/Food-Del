// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { StoreContext } from '../../context/StoreContext';
// import './MyOrders.css'; 
// import { assets } from '../../assets/assets';

// const MyOrders = () => {

//     const { url, token } = useContext(StoreContext);
//     const [data, setData] = useState([]);

//     const fetchOrders = async () => {
//         try {
//             const response = await axios.post(url + "/api/order/userorders", {}, {
//   headers: {
//     Authorization: token
//   }
// });

//             setData(response.data.data);
//         } catch (error) {
//             console.error("Error fetching orders:", error);
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             fetchOrders();
//         }
//     }, [token]);

//     return (
//         <div className='my-orders'>
//             <h2>My Orders</h2>
//             <div className="container">
//                 {data.map((order, index) => (
//                     <div key={index} className='my-orders-order'>
//                         <img src={assets.parcel_icon} alt="Parcel Icon" />
//                         <p>
//                             {order.items.map(item => `${item.name} x ${item.quantity}`).join(", ")}
//                         </p>
//                         <p>₹{order.amount}.00</p>
//                         <p>Items: {order.items.length}</p>
//                         <p><span>&#x25cf;</span> <b>{order.status || "Pending"}</b></p>
//                         <button onClick={fetchOrders}>Track Order</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyOrders;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './MyOrders.css'; 
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const userId = JSON.parse(atob(token.split('.')[1])).id;
      const response = await axios.post(url + "/api/order/user-orders", { userId }, {
        headers: { Authorization: token }
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className='my-orders-order'>
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <p>
              {order.items.map(item => `${item.name} x ${item.quantity}`).join(", ")}
            </p>
            <p>₹{order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p className={`status ${order.status?.toLowerCase()}`}>
              <span>&#x25cf;</span> <b>{order.status || "Pending"}</b>
            </p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
