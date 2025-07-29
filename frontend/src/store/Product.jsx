import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import {create} from 'zustand'


export const useProductStore = create((set)=>({
    products:[],
    isGettingProduct:false,
    isAddingToCart:false,
    getProduct: async (keyword = '', sort = '')=>{
        set({isGettingProduct:true})
        const queryParams = new URLSearchParams()
        if (keyword) queryParams.append('keyword', keyword)
        if (sort) queryParams.append('sort', sort)
        try {
            const response = await axios.get(`/api/v1/product?${queryParams.toString()}`)
            set({products:response.data.products, isGettingProduct:false})
        } catch (error) {
            set({isGettingProduct:false, products:[]})
            toast.error("Product not availble or Failed to fetch product")
        }
    },
    addToCart: async (credentials) =>{
        set({isAddingToCart:true})
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = localCart.find((item) => item.productId === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            localCart.push({ productId, quantity });
        }
        localStorage.setItem("cart", JSON.stringify(localCart));
    },

}))