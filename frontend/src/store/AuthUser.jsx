import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import {create} from 'zustand'
export const useAuthStore = create((set)=>({
    user:null,
    isSigningUp:false,
    isLoggingin:false,
    isLoggingout:false,
    isCheckingAuth:true,
    isProfileUpdating:false,
    isChangingPassword:false,
    authCheck: async ()=>{
        set({isCheckingAuth: true})
        try {
            const response = await axios.get("/api/v1/authCheck")
            set({user:response.data.user, isCheckingAuth: false})
        } catch (error) {
            set({isCheckingAuth: false, user:null});
            // toast.error(error.response.data.message || "Logout failed")
        }
    },
    signup: async (credentials)=>{
        set({isSigningUp:true})
        try {
            const response = await axios.post("/api/v1/signup", credentials);
            set({user:response.data.user, isSigningUp:false})
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed")
            set({isSigningUp:false, user: null})
        }
    },
    login: async (credentials)=>{
        set({isLoggingin:true});
        try {
            const response = await axios.post("/api/v1/login", credentials);
            set({user:response.data.user, isLoggingin:false})
            toast.success("Logged in successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Login failed")
            set({isLoggingin:false, user: null})
        }
    },
    logout: async ()=>{
        set({isLoggingout:true});
        try {
            await axios.post("/api/v1/logout")
            set({user:null, isLoggingout:false})
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Logout failed")
            set({isLoggingout:false})
        }
    },
    updateProfile: async (credentials)=>{
        set({isProfileUpdating:true})
        try {
            const response = await axios.put("/api/v1/updateprofile", credentials)
            set({user:response.data.user, isProfileUpdating:false})
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Profile update failed")
            set({isProfileUpdating:false})
        }
    },
    changePassword: async (credentials)=>{
        set({isChangingPassword:true})
        try {
            const response = await axios.put("/api/v1/password/change", credentials)
            set({user:response.data.user, isChangingPassword:false})
            toast.success("Password changed successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Password change failed")
            set({isChangingPassword:false})
        }
    }
}))