import express from "express";
import authMiddleWare from "../middleware/auth.js";
import { deleteOrder, listOrder, placeOrder, updateStatus, userOrders } from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/place", authMiddleWare,placeOrder);
orderRoute.post("/userOrders", authMiddleWare, userOrders);
orderRoute.get("/list",listOrder);
orderRoute.post("/update",updateStatus);
orderRoute.post("/delete", deleteOrder);

export default orderRoute;