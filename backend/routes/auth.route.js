import express from "express";
import { changePassword, deleteUser, forgotPassword, 
    getAllUser, 
    getUser, 
    getUserProfile, 
    login, 
    logout, 
    resetPassword, 
    signup, 
    updateProfile,
    updateUser} from "../controllers/auth.controller.js";
import { authorizeRoles, protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.post('/password/forgot', forgotPassword)
router.post('/password/reset/:token', resetPassword)
router.put('/password/change', protectRoute, changePassword)

router.get('/myprofile', protectRoute, getUserProfile)
router.put('/updateprofile', protectRoute, updateProfile)

//admin routes

router.get('/admin/users', protectRoute, authorizeRoles('admin'), getAllUser)
router.get('/admin/user/:id', protectRoute, authorizeRoles('admin'), getUser)
router.put('/admin/user/:id', protectRoute, authorizeRoles('admin'), updateUser)
router.delete('/admin/user/:id', protectRoute, authorizeRoles('admin'), deleteUser)

// router.post('/admin/login', adminLogin)
// router.post('/admin/logout', adminLogout)

export default router;