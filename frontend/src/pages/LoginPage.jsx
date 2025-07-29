import React, { useState } from 'react'
import { useAuthStore } from '../store/AuthUser'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login} = useAuthStore()
  const handleLogin = (e)=>{
    e.preventDefault()
    login({email, password});
  }

  return (
  <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-foreground p-8 rounded-2xl shadow-md w-full max-w-md border border-color">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary-dark ">Welcome back</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
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
            Login
          </button>
        </form>
        <p className="text-sm text-copy-light text-center mt-4">
          Don't have an account? <a href="#" className="text-primary hover:underline">
            <Link to='/signup'>Signup</Link>
          </a>
        </p>
      </div>
    </div>
    </>
  )
}
