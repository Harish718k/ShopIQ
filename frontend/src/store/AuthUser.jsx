import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import {create} from 'zustand'
export const useAuthStore = create((set)=>({
    user:null,
    isSigningUp:false,
    signup: async (credentials)=>{
        set({isSigningUp:true})
        try {
            const response = await axios.post("/api/v1/signup", credentials);
            set({user:response.data.user, isSigningUp:false})
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Singin failed")
            set({isSigningUp:false, user: null})
        }
    },
}))