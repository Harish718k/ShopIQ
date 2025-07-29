import axios from 'axios';

export const getLocalCart = ()=>{
    JSON.parse(localStorage.getItem("cart") || '[]')
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