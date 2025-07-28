import React from 'react'
import {Search, ShoppingCart, CircleUserRound } from 'lucide-react'

export const Header = () => {
  return (
    <>
      <div className='py-1 flex justify-between items-center px-4 border-b border-gray-400 fixed w-full bg-white'>
        <div className='flex items-center gap-6'>
          <img src="/brandlogo.png" alt='brand logo' className='w-32'/>
          
        </div>
        <div className='flex items-center gap-4'>
          <p>Products</p>
          <p>My Orders</p>
          <div className='flex bg-gray-100 border border-gray-400 px-2 py-1 rounded-md items-center'>
            <i className='search-icon text-gray-400 '><Search size={22}/></i>
            <input type="text" className='px-2 focus:outline-none' placeholder='Search'/>
          </div>
          <i className='bg-gray-100 p-1 border border-gray-400 rounded-md text-gray-700'><ShoppingCart size={22}/></i>
          <i className='text-gray-700'><CircleUserRound size={28}/></i>
        </div>
      </div>

      <div className='border border-gray-400 h-screen w-2xl absolute right-0 -z-10'>

      </div>
    </>
  )
}
