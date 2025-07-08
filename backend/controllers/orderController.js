// const placeOrder = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;
//     const email = address.email;

//     // Validate required fields
//     if (!userId || !items || !amount || !address || !email) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     // Save order as unpaid
//     const newOrder = new orderModel({
//       userId, // ✅ Corrected field name
//       items,
//       amount,
//       address,
//       payment: false,
//     });

//     await newOrder.save();

//     // Clear user cart
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     // Create Stripe line items in INR
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100, // amount in paise
//       },
//       quantity: item.quantity,
//     }));

//     // Add delivery fee (₹200)
//     line_items.push({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: 20000, // ₹200 in paise
//       },
//       quantity: 1,
//     });

//     // Create Stripe Checkout Session (India-compliant)
//     const session = await stripe.checkout.sessions.create({
//       line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//       customer_email: email,
//       customer_details: {
//         name: `${address.firstName} ${address.lastName}`,
//         address: {
//           line1: address.street,
//           city: address.city,
//           state: address.state,
//           postal_code: address.pincode,
//           country: "IN",
//         },
//       },
//     });

//     res.status(200).json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.error("Stripe error:", error);
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = process.env.FRONTEND_URL;


// PLACE ORDER & INITIATE STRIPE CHECKOUT
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const email = address.email;

    if (!userId || !items || !amount || !address || !email) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Save order to MongoDB (match 'userid')
    const newOrder = new orderModel({
      userid: userId,
      items,
      amount,
      address,
      payment: false,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
  price_data: {
    currency: "inr",
    product_data: { name: "Delivery Charges" },
    unit_amount: 2000, // ₹20 in paise
  },
  quantity: 1,
});


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: email,
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      metadata: {
        order_id: newOrder._id.toString(),
      },
      success_url: `${frontend_url}/`, // home page
      cancel_url: `${frontend_url}/cart`, // cart if payment fails

    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// VERIFY ORDER
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({ success: true, message: "Payment Successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: "Payment Cancelled. Order Removed." });
    }
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: "Verification Failed", error: error.message });
  }
};

// GET USER ORDERS
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user orders" });
  }
};

// ADMIN: LIST ALL ORDERS
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// UPDATE ORDER STATUS
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
