import mongoose from "mongoose";
import crypto from "crypto";
import { type } from "os";

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    role:{
        type: String,
        default: "user"
    },
    isLoggedIn:{
        type:Boolean,
        default: false
    },
    cart:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity:{
                type:Number,
                default: 1
            }
        }
    ],
    orderHistory:{
        type:Array,
        default:[]
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date
},{
    timestamps: true 
})

userSchema.methods.getResetToken = function (){
        const token = crypto.randomBytes(20).toString('hex');
        this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
        this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;
    
        return token;
}


export const User = mongoose.model('User', userSchema)