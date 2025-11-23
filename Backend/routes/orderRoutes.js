import express from "express"
import adminAuth from "../middlewares/adminAuth.js";
import { allOrders, placeOrder, placeOrderStripe, updateStatus, userOrders, verifyStripe } from "../controllers/orderController.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
// orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// User Features
orderRouter.post("/userOrders", authUser, userOrders);

// Verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe)
// orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay)
export default orderRouter;