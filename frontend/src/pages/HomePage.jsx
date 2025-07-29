import React from 'react'
import {useAuthStore} from "../store/AuthUser"
import { SignupPage } from './SignupPage'
import { HomeScreen } from './HomeScreen'

export const HomePage = () => {
  
  return (
    <>
    {<HomeScreen/>}
    </>
  )
}
