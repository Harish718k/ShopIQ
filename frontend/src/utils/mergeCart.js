import axios from "axios";
import { clearLocalCart, getLocalCart } from "./cart";

export async function mergeCartAfterLogin(){
    try {
        const localCart = getLocalCart();
        if(!Array.isArray(localCart) || localCart.length===0) return;
        
        const response = await axios.put('/api/v1/cart/merge', {localCart},{ withCredentials:true})

        if(response.data.success){
            console.log("Cart merged!");
            clearLocalCart()
        }
    } catch (error) {
        console.log("Error in merge cart after login: "+error.message);
        
    }
}