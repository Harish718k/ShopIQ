import { Minus, Plus, ViewIcon, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const ProductCard = ({ name, description, price, inStock, onAddToCart, stock}) => {
  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text

  const [isProductOpen, setIsProductOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  return (<>
    {isProductOpen && <div className='h-screen bg-gray-950/60 w-full fixed top-0 left-0 flex justify-center items-center'>
        <div className="border rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-200 flex flex-col justify-between bg-white min-w-2xl h-2xl">
        <i className='text-gray-700 cursor-pointer' onClick={()=>setIsProductOpen(false)}><ViewIcon/></i>
        <div className="space-y-2 text-left">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">
          {description}
        </p>
        <div className="text-primary font-bold text-base">₹{price}</div>
        <span
          className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
            inStock
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {inStock ? 'In Stock' : 'Out of Stock'} {stock}
        </span>
      </div>
      <div className='flex gap-4'>
        <p>Quantity :</p>
        <Plus/>
        <input type="number" value={quantity} onChange={()=>setQuantity(e.target.value)}/>
        <Minus/>
      </div>
      <button
        onClick={onAddToCart}
        disabled={!inStock}
        className={`mt-4 py-2 px-4 text-sm font-medium rounded-lg transition duration-200 ${
          inStock
            ? 'bg-primary text-white hover:bg-primary-dark cursor-pointer'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
      >
        Add to Cart
      </button>
    </div>
    </div>}
    <div className="border rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-200 flex flex-col justify-between">
        <i className='text-gray-700 cursor-pointer' onClick={()=>setIsProductOpen(true)}><ViewIcon/></i>
        <div className="space-y-2 text-left">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">
          {truncate(description, 30)}
        </p>
        <div className="text-primary font-bold text-base">₹{price}</div>
        <span
          className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
            inStock
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <div className='flex gap-4 justify-start items-center'>
        <p>Quantity :</p>
        <div className='flex justify-center w-30 items-center'>
          <Plus size={20} onClick={()=>setQuantity(quantity+1)}/>
        <input type="number" className='w-10 text-center' value={quantity} onChange={()=>setQuantity(e.target.value)} />
        <Minus size={20} onClick={()=>setQuantity(quantity-1)}/>
        </div>
      </div>

      <button
        onClick={()=>onAddToCart(quantity)}
        disabled={!inStock}
        className={`mt-4 py-2 px-4 text-sm font-medium rounded-lg transition duration-200 ${
          inStock
            ? 'bg-primary text-white hover:bg-primary-dark cursor-pointer'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
      >
        Add to Cart
      </button>
    </div>
    </>
  )
}
