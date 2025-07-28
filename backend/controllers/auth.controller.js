import { User } from "../models/user.model.js";
// import { Admin } from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { sendEmail } from "../utils/email.js";

export async function signup(req,res){
    try{
        const {firstname, lastname, email, password} = req.body;
        if(!firstname || !lastname || !email || !password){
            return res.status(400).json({success:false, message:"All fields are required"})
        }

        const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailCheck.test(email)){
            return res.status(400).json({success:false, message:"Invalid email"})
        }

        if(password.length < 6){
            return res.status(400).json({success:false, message:"Password must be at least 6 charaters"})
        }

        const existingUserByEmail = await User.findOne({email:email})

        if(existingUserByEmail){
            return res.status(400).json({success:false, message:"Email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:hashedPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save()

            res.status(201).json({success:true, user:{
                ...newUser._doc,
                password:""
            }})
        } 
        
    }catch(error){
        console.log("Error in signup controller : "+error.message);
        
        res.status(500).json({success:false,message:"server error"})
    }
}

export async function login(req,res){
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({success:false, message:"All fields are required"})
        }

        const user = await User.findOne({email:email}).select('+password')

        if(!user){
            res.status(404).json({success:false, message:"Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.status(400).json({success:false, message:"invalid credentials"});
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({success:true, user:{
            ...user._doc,
            password:""
        }})
        
    } catch(error){
        console.log("Error in login controller: "+error.message);
        res.status(500).json({success:false, message:"server error"})
        
    }
}

export async function logout(req,res){
    try {
        res.clearCookie("jwt-shopiq");
        res.status(200).json({success:true, message:"Logged out successfully"})
        
    } catch (error) {
        console.log("Error in logout controller: "+error.message);
        res.status(500).json({success:false, message:"server error"})
    }
}

// export async function adminLogin(req,res){
//     try{
//         const {email,password} = req.body;

//         if(!email || !password){
//             res.status(400).json({success:false, message:"All fields are required"})
//         }

//         const admin = await Admin.findOne({email:email})

//         if(!admin){
//             res.status(404).json({success:false, message:"Invalid credentials"})
//         }

//         const isPasswordCorrect = true ? password==admin.password : false;
//         if(!isPasswordCorrect){
//             res.status(400).json({success:false, message:"Invalid credentials"})
//         }

//         generateTokenAndSetCookie(admin._id, res);

//         res.status(200).json({success:true, admin:{
//             ...admin._doc,
//             password:""
//         }})
        
//     } catch(error){
//         console.log("Error in admin login controller: "+error.message);
//         res.status(500).json({success:false, message:"server error"});
//     }
// }

// export async function adminLogout(req,res){
//     try{
//         res.clearCookie("jwt-shopiq")
//         res.status(200).json({success:true, message:"Logged out successfully"})
//     }
//     catch(error){
//         console.log("Error in admin logout controller: "+error.message);
//         res.status(500).json({success:false, message:"server error"})
//     }
// }

export async function forgotPassword(req,res){
    console.log(req);
    
    
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json({success:false, message:"User not found"})
    }

    const resetToken = user.getResetToken()
    await user.save({validateBeforeSave: false})

    //create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`

    const message = `Your password reset url is as follows \n\n
    ${resetUrl}\n\n If you have not requested this email, then ignore it.`
    console.log(user.email);
    
    try {
        sendEmail({
            email:user.email,
            subject: "ShopIQ Password Recovery",
            text:message
        })

        res.status(200).json({success:true, message:`Email sent to ${user.email}`})
        
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpire = undefined
        await user.save({validateBeforeSave: false})
        return res.status(500).json({success:false, message:"server error"})
    }
}

export async function resetPassword(req, res){
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{
            $gt: Date.now()
        }
    })

    if(!user){
        return res.status(404).json({success:false, message:"Password reset token invalid or expired."})
    }

    if(req.body.password !== req.body.confirmPassword){
        return res.status(400).json({success:false, message:"Password does not match"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined

    await user.save({validateBeforeSave: false})
    generateTokenAndSetCookie(user._id, res);
        res.status(201).json({success:true, message:"Password changed successfully."})
}

export async function changePassword(req,res){
    try {
        const {oldpassword, newpassword, confirmpassword} = req.body
        const user = await User.findById(req.user._id).select('+password')
        const isPasswordMatch = await bcrypt.compare(oldpassword, user.password)

        if(!isPasswordMatch){
            return res.status(400).json({success:false, message:"Current password is wrong!"})
        }

        if(newpassword !== confirmpassword){
            return res.status(400).json({success:false, message:"Password does not match"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);

        user.password = hashedPassword
        await user.save({validateBeforeSave:false})

        res.status(201).json({success:true, message:"Password changed successfully."})
    } catch (error) {
        console.log("Error in change password controller: "+error.message);
        res.status(500).json({success:false, message:"server error"})
    }
}

export async function getUserProfile(req,res){
    try {
        console.log(req.user);
    
        const user = await User.findOne(req.user._id)

        res.status(200).json({success:true, user})
    } catch (error) {
        console.log("Error in getUserProfile controller: "+error.message);
        res.status(500).json({success:false, message:"server error"})
    }
}



export async function updateProfile(req,res){
    try {
        const newUserData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        }

        const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
            new:true,
        })

        res.status(200).json({success:false, user})
    } catch (error) {
        console.log("Error in updateProfile controller: "+error.message);
        res.status(500).json({success:false, message:"server error"})
    }
}

//Admin

export async function getAllUser(req,res){
    try {
        const users = await User.find();
        res.status(200).json({success:false, count:users.length, users})
    } catch (error) {
        console.log("Error in updateProfile controller: "+error.message);
        res.status(500).json({success:false, message:"server error"})
    }
}

export async function getUser(req,res){
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(404).json({success:false, message:"User not found"})
        }
        res.status(200).json({success:true, user})
    } catch (error) {
        console.log("Error in updateProfile controller: "+error.message);
        res.status(500).json({success:false, message:"server error"})
    }
}

export async function updateUser(req,res){
    const {firstname, lastname, role} = req.body
    const newUserData = {
        firstname:firstname,
        lastname:lastname,
        role:role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new:true
    })

    res.status(201).json({success:true, user})
}

export async function deleteUser(req,res) {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        res.status(404).json({success:false, message:"User not found"})
    }
    res.status(200).json({success:true, message:"User deleted."})
}