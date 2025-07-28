import React from 'react'
import {useAuthStore} from "../store/AuthUser"
import { SignupPage } from './SignupPage'
import { HomeScreen } from './HomeScreen'

export const HomePage = () => {
  const {user} = useAuthStore()
  console.log(user);
  
  return (
    <>
    {!user? <SignupPage/> : <HomeScreen/>}
    </>
  )
}
