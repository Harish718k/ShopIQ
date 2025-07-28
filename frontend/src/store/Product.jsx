import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import {create} from 'zustand'


export const useProductStore = create((set)=>({
    products:[],
    isGettingProduct:false,
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
    }
}))