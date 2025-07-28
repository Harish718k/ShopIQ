import express from "express"
import { authorizeRoles, protectRoute } from "../middleware/protectRoute.js";
import { deleteOrder, getSingleOrder, myOrders, newOrder, orders, updateOrderStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.post('/order/new', protectRoute, newOrder)
router.get('/order/:id',protectRoute, getSingleOrder)
router.get('/myorders', protectRoute, myOrders)

//Admin route

router.get('/admin/orders', protectRoute, authorizeRoles('admin'), orders)
router.put('/admin/order/:id', protectRoute, authorizeRoles('admin'), updateOrderStatus)
router.delete('/admin/order/:id', protectRoute, authorizeRoles('admin'), deleteOrder)

export default router;