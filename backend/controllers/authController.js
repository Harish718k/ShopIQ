const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto')

//Register User - /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {name,lastname, email, password } = req.body

    let avatar;
    
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.file){
        avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
    }

    const user = await User.create({
        name,
        lastname,
        email,
        password,
        avatar
    });

    sendToken(user, 201, res)

})

//Login User - /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} =  req.body

    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    //finding the user database
    const user = await User.findOne({email}).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }
    
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    sendToken(user, 201, res)
    
})

//Logout - /api/v1/logout
exports.logoutUser = (req, res, next) => {
        res.cookie('token',null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        .status(200)
        .json({
            success: true,
            message: "Loggedout"
        })

}

//Forgot Password - /api/v1/password/forgot
exports.forgotPassword = catchAsyncError( async (req, res, next)=>{
    const user =  await User.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorHandler('User not found with this email', 404))
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave: false})
    
    let BASE_URL = process.env.FRONTEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }


    //Create reset url
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

    const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

    try{
        sendEmail({
            email: user.email,
            subject: "JVLcart Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message), 500)
    }

})  

//Reset Password - /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError( async (req, res, next) => {
   const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex'); 

    const user = await User.findOne( {
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt : Date.now()
        }
    } )

    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or expired'));
    }

    if( req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false})
    sendToken(user, 201, res)

})

//Get User Profile - /api/v1/myprofile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
   const user = await User.findById(req.user.id)
   res.status(200).json({
        success:true,
        user
   })
})

//Change Password  - api/v1/password/change
exports.changePassword  = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    //check old password
    if(!await user.isValidPassword(req.body.oldPassword)) {
        return next(new ErrorHandler('Old password is incorrect', 401));
    }

    //assigning new password
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
        success:true,
    })
 })

//Update Profile - /api/v1/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    let newUserData = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email
    }

    let avatar;
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.file){
        avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
        newUserData = {...newUserData,avatar }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })

})

//Admin: Get All Users - /api/v1/admin/users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
   const users = await User.find();
   res.status(200).json({
        success: true,
        users
   })
})

//Admin: Get Specific User - api/v1/admin/user/:id
exports.getUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
   })
});

//Admin: Update User - api/v1/admin/user/:id
// exports.updateUser = catchAsyncError(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         lastname:req.body.lastname,
//         email: req.body.email,
//         role: req.body.role
//     }

//     const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
//         new: true,
//         runValidators: true,
//     })

//     res.status(200).json({
//         success: true,
//         user
//     })
// })

exports.updateUser = async (req, res, next) => {
  const { name, email, role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;
  if ('isblocked' in req.body) {
    user.isblocked = String(req.body.isblocked) === "true";
    }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
};

//Admin: Delete User - api/v1/admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }
    await user.deleteOne();
    res.status(200).json({
        success: true,
    })
})

// Admin: Impersonate - /api/v1/admin/impersonate/:id
exports.impersonateUser = catchAsyncError(async (req, res, next) => {
  const admin = req.user; // Already authenticated

  if (admin.role !== "admin") {
    return next(new ErrorHandler("Only admins can impersonate users", 403));
  }

  const userToImpersonate = await User.findById(req.params.id);

  if (!userToImpersonate) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Set a cookie to remember who the original admin was
  res.cookie("originalAdmin", admin._id.toString(), {
    httpOnly: false, // Allow client-side access
    sameSite: "Strict",
    maxAge: 30 * 60 * 1000,
  });

  
  sendToken(userToImpersonate, 200, res);
});

// Admin: revert Impersonate - /api/v1/admin/revert
exports.revertToAdmin = catchAsyncError(async (req, res, next) => {
  const originalAdminId = req.cookies.originalAdmin;

  if (!originalAdminId) {
    return next(new ErrorHandler("No impersonation session to revert", 400));
  }

  const originalAdmin = await User.findById(originalAdminId);

  if (!originalAdmin || originalAdmin.role !== "admin") {
    return next(new ErrorHandler("Original admin not found", 404));
  }

  // Clear the impersonation cookie
  res.clearCookie("originalAdmin");

  // Restore session as admin
  sendToken(originalAdmin, 200, res);
});