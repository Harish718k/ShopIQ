import axios from "axios"
import { User } from "../models/user.model.js";

export async function mergeCart(req, res){
    const {localCart} = req.body;
    const userId = req.user.id
    try {
        const user = await User.findById(userId)
        for (const item of localCart){
            const index = user.cart.findIndex(
                (cartItem)=>cartItem.product.toString() === item.productId
            )

            if(index> -1){
                user.cart[index].quantity += item.quantity
                toast.success("Quantity Increased")
            } else{
                user.cart.push({product: item.productId, quantity:item.quantity})
                toast.success("Product added to cart")
            }
        }

        await user.save({validateBeforeSave:false});
        res.status(200).json({success: true, message: "Cart merged"})
    } catch (error) {
        console.log("Error in mergeCart: "+error.message);
        res.status(500).json({success:false, message:"Server error"})
    }
}
