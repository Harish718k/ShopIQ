import express from 'express'
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/authenticate.js';
import { uploadBrandLogo } from '../controllers/settingsController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();



const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/brand' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })


router.route('/admin/settings/upload-brand-logo').post(isAuthenticatedUser, authorizeRoles('admin'), upload.single('logo'), uploadBrandLogo)

export default router;
