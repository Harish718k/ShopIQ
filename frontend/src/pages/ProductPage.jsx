import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { useProductStore } from '../store/Product'
import { LoaderCircle } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { useAuthStore } from '../store/AuthUser'
import { addToLocalCart } from '../utils/cart'

export const ProductPage = () => {
  const {user} = useAuthStore()
  const {products, getProduct, isGettingProduct} = useProductStore()
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState('')
  useEffect(()=>{
    getProduct()
    
  },[])
  console.log(products);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getProduct(keyword)
    }
  }

  const handleSortChange = (e) => {
    setSort(e.target.value)
    getProduct(keyword, e.target.value)
  }

  const handleAddToCart = async (productId, quantity = 1, user) => {
    try {
      if (user) {
        // Logged-in: send to backend
        const res = await axios.post(
          "/api/v1/cart/merge",
          { productId, quantity },
          { withCredentials: true }
        );

        if (res.data.success) {
          console.log("Added to DB cart");
        }
      } else {
        // Guest: store in localStorage
        addToLocalCart(productId, quantity);
        console.log("Added to local cart");
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };
  return (
    <div>
        <Header/>
        <div className='pt-18 p-2 text-center'>
          <input type="text" placeholder='Search product here...' className='outline outline-gray-500 rounded-sm w-full max-w-6xl px-4 py-2 mb-8' onChange={(e)=>setKeyword(e.target.value)} onKeyDown={handleKeyDown}/> 
          <select
            className="border rounded px-2 py-1 text-sm block m-2 absolute top-29 right-7"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
            {isGettingProduct 
            ? <div className="h-screen">
                <div className="flex justify-center items-center h-full">
                  <LoaderCircle className="animate-spin text-primary size-10"/>
                </div>
              </div> 
            :<div>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6'>
                {products.map(product => (
                    <ProductCard
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      inStock={product.stock > 0}
                      stock={product.stock}
                      onAddToCart={(quantity) => handleAddToCart(product._id, quantity, user)}
                    />
                ))}
              </div>
            </div>
            }
        </div>
    </div>
  )
}
