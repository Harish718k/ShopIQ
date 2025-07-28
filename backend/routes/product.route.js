import express from "express";
import { deleteProduct, getProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.controller.js";
import { authorizeRoles, protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/product',protectRoute, getProducts)
router.get('/product/:id',protectRoute, getSingleProduct)

//admin routes
router.post('/admin/product/new',protectRoute,authorizeRoles('admin'), newProduct)
router.put('/admin/product/:id', protectRoute,authorizeRoles('admin'), updateProduct)
router.delete('/admin/product/:id', protectRoute,authorizeRoles('admin'), deleteProduct)

export default router;