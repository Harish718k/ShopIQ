import axios from "axios";
import { clearLocalCart, getLocalCart } from "./cart";

async function mergeCartAfterLogin(){
    const localCart = getLocalCart();

    if(localCart.length===0) return;

    try {
        const response = await axios.post('/api/v1/cart/merge', {localCart},{ withCredentials:true})

        if(response.data.success){
            console.log("Cart merged!");
            clearLocalCart()
        }
    } catch (error) {
        console.log("Error in merge cart after login: "+error.message);
        
    }
}