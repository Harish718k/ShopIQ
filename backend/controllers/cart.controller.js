import axios from "axios"
import { User } from "../models/user.model.js";

export async function mergeCart(req, res){
    const {localCart} = req.body;
    
    const userId = req.user.id
    try {
        const user = await User.findById(userId)
        if (!Array.isArray(localCart)) {
            return res.status(400).json({ success: false, message: "localCart must be an array" });
        }
        for (const item of localCart){
            const index = user.cart.findIndex(
                (cartItem)=>cartItem.product.toString() === item.productId
            )

            if(index> -1){
                user.cart[index].quantity += item.quantity
            } else{
                user.cart.push({product: item.productId, quantity:item.quantity})
            }
        }

        await user.save();
        res.status(200).json({success: true, message: "Cart merged", cart:user.cart})
    } catch (error) {
        console.log("Error in mergeCart: "+error.message);
        res.status(500).json({success:false, message:"Server error"})
    }
}

export async function addToCart(req, res){
    const {productId, quantity} = req.body
    const userId = req.user.id
    try {
        const user = await User.findById(userId)
        const index = user.cart.findIndex(
                (cartItem)=>cartItem.product.toString() === productId
            )

        if(index> -1){
            user.cart[index].quantity += quantity
            res.status(201).json({success:true, cart:user.cart})
        } else{
            user.cart.push({product: productId, quantity:quantity})
            res.status(201).json({success:true, cart:user.cart})
        }
        await user.save({validateBeforeSave:false});
        res.status(200).json({success: true, message: "Product added"})
    } catch(error){

    }
}
