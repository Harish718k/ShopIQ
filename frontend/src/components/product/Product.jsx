// // import { Link } from 'react-router-dom';

// // export default function Product ({product, col}) {
// //     return (
// //         <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
// //             <div className="card p-3 rounded">
// //                 {product.images.length > 0 &&
// //                 <img
// //                 className="card-img-top mx-auto"
// //                 src={product.images[0].image}
// //                 alt={product.name}
// //                 />}
// //                 <div className="card-body d-flex flex-column">
// //                 <h5 className="card-title">
// //                     <Link to={`/product/${product._id}`}>{product.name}</Link>
// //                 </h5>
// //                 <div className="ratings mt-auto">
// //                     <div className="rating-outer">
// //                     <div className="rating-inner" style={{width: `${product.ratings/ 5 * 100}%` }}></div>
// //                     </div>
// //                     <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
// //                 </div>
// //                 <p className="card-text">${product.price}</p>
// //                 <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }

// import { Link } from 'react-router-dom';
// import { Star } from 'lucide-react';

// export default function Product({ product, col }) {
//   const ratingPercent = (product.ratings / 5) * 100;

//   return (
//     <div className={`w-full sm:w-1/2 lg:w-${col}/12 px-3 mb-6`}>
//       <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col h-full">
        
//         {/* Product Image */}
//         {product.images.length > 0 && (
//           <img
//             src={product.images[0].image}
//             alt={product.name}
//             className="w-full h-48 object-contain mb-4"
//           />
//         )}

//         {/* Product Info */}
//         <div className="flex flex-col flex-grow">
//           <h5 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
//             <Link to={`/product/${product._id}`} className="hover:text-primary">
//               {product.name}
//             </Link>
//           </h5>

//           {/* Ratings */}
//           <div className="flex items-center gap-2 mt-auto mb-2">
//             <div className="relative flex items-center w-24 h-4 bg-gray-200 rounded overflow-hidden">
//               <div
//                 className="absolute top-0 left-0 h-full bg-yellow-400"
//                 style={{ width: `${ratingPercent}%` }}
//               ></div>
//               {[...Array(5)].map((_, index) => (
//                 <Star key={index} size={14} className="text-gray-400 z-10" fill="currentColor" />
//               ))}
//             </div>
//             <span className="text-xs text-gray-600">({product.numOfReviews} Reviews)</span>
//           </div>

//           {/* Price */}
//           <p className="text-primary text-lg font-semibold mb-3">${product.price}</p>

//           {/* View Button */}
//           <Link
//             to={`/product/${product._id}`}
//             className="mt-auto bg-primary text-white text-sm py-2 px-4 rounded hover:bg-primary-dark text-center"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


// new

import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux'; 
import { addCartItem } from "../../actions/cartActions";
import { toast } from 'react-toastify';

export default function Product({ product, col }) {
  const dispatch = useDispatch(); 

  // Tailwind column mapping
  const colClass = {
    3: 'lg:w-1/4',
    4: 'lg:w-1/3',
    6: 'lg:w-1/2',
    12: 'lg:w-full'
  }[col] || 'lg:w-1/3';

  return (
    <div className={`w-full sm:w-1/2 ${colClass} px-3 mb-6`}>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col h-full">
        
        {/* Product Image */}
        {product.images.length > 0 && (
          <img
            src={product.images[0].image}
            alt={product.name}
            className="w-full h-48 object-contain mb-4 rounded"
          />
        )}

        {/* Product Info */}
        <div className="flex flex-col flex-grow">
          <h5 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 min-h-12">
            <Link to={`/product/${product._id}`} className="hover:text-blue-600 transition">
              {product.name}
            </Link>
          </h5>

          {/* Stock availability */}
          <p className={`text-sm font-medium mb-1 ${
            product.stock > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>

          {/* Price */}
          <p className="text-blue-600 text-lg font-semibold mb-3">${product.price}</p>

          {/* Buttons */}
          <div className="flex gap-2 mt-auto">
            <Link
              to={`/product/${product._id}`}
              className="w-1/2 text-center bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 py-2 px-3 rounded-xl"
            >
              View Details
            </Link>
            <button
              disabled={product.stock === 0}
              onClick={() => {
                  dispatch(addCartItem(product._id, 1));
                  toast('Cart Item Added!', { type: 'success' });
              }}
              className="w-1/2 text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-xl flex justify-center items-center gap-1 disabled:bg-gray-400 cursor-pointer"  
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

