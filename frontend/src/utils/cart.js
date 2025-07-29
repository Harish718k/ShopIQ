import axios from 'axios';

export const getLocalCart = ()=>{
    try {
        const cart = JSON.parse(localStorage.getItem("cart") || '[]')
        
        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        console.error("Invalid JSON in localStorage.cart");
        return [];
    }
}

export const saveLocalCart = (cart)=>{
    localStorage.setItem("cart", JSON.stringify(cart))
}

export const addToLocalCart = (productId, quantity)=>{
    const cart = getLocalCart();
    const index = cart.findIndex(item => item.productId === productId);

    if(index !== -1){
        cart[index].quantity += quantity
    } else {
        cart.push({ productId, quantity})
    }

    saveLocalCart(cart);
}

export const clearLocalCart = ()=>{
    localStorage.removeItem("cart")
}