import React from 'react'

export const Blocked = () => {
  return (
    <div className="max-w-xs mx-auto mt-20 p-8 text-center border border-gray-300 rounded-lg bg-gray-800 shadow-lg">
      <h2 className="text-xl font-semibold text-red-600 mb-2">Account Blocked</h2>
      <p className="text-gray-300 text-sm">
        Your account has been blocked.
      </p>
    </div>
  )
}
