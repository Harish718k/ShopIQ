import express from "express";
import { deleteProduct, getProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.controller.js";
import { authorizeRoles, protectRoute } from "../middleware/protectRoute.js";
// import { addToCart, mergeCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.get('/product', getProducts)
router.get('/product/:id', getSingleProduct)
// router.put('/cart/merge', protectRoute, mergeCart)
// router.put('/cart/add', protectRoute, addToCart)

//admin routes
router.post('/admin/product/new',protectRoute,authorizeRoles('admin'), newProduct)
router.put('/admin/product/:id', protectRoute,authorizeRoles('admin'), updateProduct)
router.delete('/admin/product/:id', protectRoute,authorizeRoles('admin'), deleteProduct)

export default router;