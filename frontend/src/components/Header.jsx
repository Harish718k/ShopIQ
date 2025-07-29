import React, { useState } from 'react'
import {Search, ShoppingCart, CircleUserRound, MoveLeft, SidebarClose } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/AuthUser'

export const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [oldpassword, setOldpassword] = useState('')
  const [newpassword, setNewpassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const {user, updateProfile, changePassword, logout} = useAuthStore()
  
  const handleProfileUpdate = (e)=>{
    e.preventDefault()
    updateProfile({firstname, lastname})
  }

  const handleChangePassword = (e)=>{
    e.preventDefault()
    changePassword({oldpassword, newpassword, confirmpassword})
  }

  const handleLogout = ()=>{
    logout();
  }

  return (
    <>
      <div className='py-1 flex justify-between items-center px-4 border-b border-gray-400 fixed w-full bg-white'>
        <div className='flex items-center gap-6'>
          <Link to='/'><img src="/brandlogo.png" alt='brand logo' className='w-32'/></Link>
          
        </div>
        <div className='flex items-center gap-4'>
          <Link to='/product' className='hover:underline'>Products</Link>
          <Link to='/myorder' className='hover:underline'>My Orders</Link>
          
          <div className='flex bg-gray-100 border border-gray-400 px-2 py-1 rounded-md items-center'>
            <i className=' text-gray-400 '><Search size={22}/></i>
            <input type="text" className='px-2 focus:outline-none' placeholder='Search'/>
          </div>
          <i className='bg-gray-100 p-1 border border-gray-400 rounded-md text-gray-700'><ShoppingCart size={22}/></i>
          {!user 
          ? <div className='flex gap-4'>
            <Link to='/login' className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-dark transition duration-300">
              Login
            </Link>
            <Link to='/signup' className="px-4 py-2 rounded-xl border-2 border-primary text-primary hover:bg-primary-dark hover:text-background transition duration-300">
              Signup
            </Link>
          </div> 
          :<i className='text-gray-700 cursor-pointer hover:text-gray-500' onClick={()=>setIsProfileOpen(true)}><CircleUserRound size={28}/></i>}
        </div>
      </div>

      {isProfileOpen && <div className='bg-white border border-gray-400 h-screen w-2xl absolute right-0 z-10 px-6'>
        <div className='left-5 top-5 absolute flex justify-between items-center w-10/12 px-4'>
          <i className='text-gray-700 hover:text-gray-500 cursor-pointer' onClick={()=>setIsProfileOpen(false)}><SidebarClose/></i>
          <button onClick={handleLogout} className='bg-error text-white rounded-sm cursor-pointer px-2'>Logout</button>
        </div>
        <h1 className='text-2xl font-bold text-gray-950 pt-15 py-2 border-b'>Profile Info</h1>
        <p className='text-xl capitalize py-2'>Full Name : {user.firstname +" "+ user.lastname}</p>
        <p className='text-xl '>Email : {user.email}</p>

        <h1 className='text-2xl font-bold text-gray-950 py-2 border-b'>Settings</h1>
        <p className='text-xl py-2 '>Edit Profile :</p>
        <form onSubmit={handleProfileUpdate}>
          <div className='flex gap-4'>
            <div >
              <label className="text-sm font-medium text-copy">First Name</label>
              <input
              type="text"
              placeholder="First name"
              className="w-full px-4 py-2 text-copy border rounded-xl focus:outline-none focus:ring-2 text-copy"
              onChange={(e)=>setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-copy">Last Name</label>
              <input
              type="text"
              placeholder="Last name"
              className="w-full px-4 py-2 text-copy border rounded-xl focus:outline-none focus:ring-2 text-copy"
              onChange={(e)=>setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4 py-2">
            <button
            type="submit"
            className="w-18 text-primary-content bg-success cursor-pointer py-2 rounded-xl hover:bg-primary transition"
          >Update</button>
          <button
            type="reset"
            className="w-18 text-primary-content bg-error cursor-pointer py-2 rounded-xl hover:bg-primary transition"
          >Clear</button>
          </div>
        </form>

        <p className="text-xl py-2">Change Password :</p>
        <form onSubmit={handleChangePassword}>
          <div>
              <label className="text-sm font-medium text-copy">Current password</label>
              <input
              type="text"
              placeholder="Current password"
              className="w-full px-4 py-2 text-copy border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-copy"
              onChange={(e)=>setOldpassword(e.target.value)}
              />
          </div>
          <div className='flex gap-4 py-2'>
            <div >
              <label className="text-sm font-medium text-copy">New password</label>
              <input
              type="text"
              placeholder="New password"
              className="w-full px-4 py-2 text-copy border rounded-xl focus:outline-none focus:ring-2 text-copy"
              onChange={(e)=>setNewpassword(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-copy">Confirm password</label>
              <input
              type="text"
              placeholder="Confirm password"
              className="w-full px-4 py-2 text-copy border rounded-xl focus:outline-none focus:ring-2 text-copy"
              onChange={(e)=>setConfirmpassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4 py-2">
            <button
            type="submit"
            className="w-18 text-primary-content bg-success cursor-pointer py-2 rounded-xl hover:bg-primary transition"
          >Update</button>
          <button
            type="reset"
            className="w-18 text-primary-content bg-error cursor-pointer py-2 rounded-xl hover:bg-primary transition"
          >Clear</button>
          </div>
        </form>
      </div>}
    </>
  )
}
