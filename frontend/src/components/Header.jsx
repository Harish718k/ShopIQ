import React from 'react'
import {Search, ShoppingCart, CircleUserRound } from 'lucide-react'

export const Header = () => {
  return (
    <div className='py-1 flex justify-between items-center px-4 border-b border-color max-w-6xl mx-auto'>
      <div className='flex items-center gap-6'>
        <img src="/brandlogo.png" alt='brand logo' className='w-32'/>
        
      </div>
      <div className='flex items-center gap-4'>
        <p>Products</p>
        <p>My Orders</p>
        <div className='flex bg-gray-100 border border-color px-2 py-1 rounded-md items-center'>
          <i className='search-icon text-gray-400 '><Search size={22}/></i>
          <input type="text" className='px-2 focus:outline-none' placeholder='Search'/>
        </div>
        <i className='bg-gray-100 p-1 border border-color rounded-md text-gray-700'><ShoppingCart size={22}/></i>
        <i className='text-gray-700'><CircleUserRound size={28}/></i>
      </div>
    </div>
  )
}
