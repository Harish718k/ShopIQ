import React from 'react'
import {Header} from "../components/Header"
import { useAuthStore } from '../store/AuthUser'

export const HomeScreen = () => {
  const {logout} = useAuthStore();
  const handleLogout = ()=>{
    logout();
  }
  return (
    <>
    <Header/>
    <div className='pt-16'>
        <button onClick={handleLogout}>Logout</button>
    </div>
    </>
  )
}
