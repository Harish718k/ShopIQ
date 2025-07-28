import React, { useState } from 'react'
import { useAuthStore } from '../store/AuthUser'

export const SignupPage = () => {

  const {signup} = useAuthStore()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = (e)=>{
    e.preventDefault()
    signup({firstName, lastName, email, password})
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-foreground p-8 rounded-2xl shadow-md w-full max-w-md border border-color">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary-dark ">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div className='flex gap-4'>
            <div >
              <label className="text-sm font-medium text-copy">First Name</label>
              <input
              type="text"
              placeholder="First name"
              className="w-full px-4 py-2 text-copy border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-copy"
              onChange={(e)=>setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-copy">Last Name</label>
              <input
              type="text"
              placeholder="Last name"
              className="w-full px-4 py-2 text-copy border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-copy"
              onChange={(e)=>setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-copy">Email Address</label>
            <input
              type="email"
              placeholder="abc@example.com"
              className="w-full px-4 text-copy py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-copy">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border rounded-xl text-copy focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full text-primary-content bg-primary py-2 rounded-xl hover:bg-primary transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-copy-light text-center mt-4">
          Already have an account? <a href="#" className="text-primary hover:underline">Log in</a>
        </p>
      </div>
    </div>
    
  )
}
