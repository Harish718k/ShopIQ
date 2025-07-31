// import { Link, useNavigate } from 'react-router-dom';
// import { NavDropdown } from 'react-bootstrap';

// export default function Sidebar () {

//     const navigate = useNavigate();

//     return (
//         <div className="sidebar-wrapper">
//             <nav id="sidebar">
//                 <ul className="list-unstyled components">
//                 <li>
//                     <Link to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
//                 </li>
        
//                 <li>
//                     <NavDropdown title={
//                         <i className='fa fa-product-hunt'> Product</i>
//                     }>
//                         <NavDropdown.Item  onClick={() => navigate('/admin/products')} > <i className='fa fa-shopping-basket'> All</i></NavDropdown.Item>
//                         <NavDropdown.Item  onClick={() => navigate('/admin/products/create')} > <i className='fa fa-plus'> Create </i></NavDropdown.Item>
//                     </NavDropdown>
//                 </li>

//                 <li>
//                     <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
//                 </li>

//                 <li>
//                     <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
//                 </li>

//                 <li>
//                     <Link to="/admin/reviews"><i className="fa fa-users"></i> Reviews</Link>
//                 </li>
        
//             </ul>
//             </nav>
//         </div>
//     )
// }


import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const navigate = useNavigate();
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  return (
    <aside className="bg-white border-r shadow h-full min-h-screen w-full md:w-60">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition"
            >
              <i className="fas fa-tachometer-alt mr-2"></i>
              Dashboard
            </Link>
          </li>

          {/* Product Dropdown */}
          <li>
            <button
              onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
              className="flex items-center w-full text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition"
            >
              <i className="fa fa-product-hunt mr-2"></i>
              Product
              <i className={`ml-auto fa fa-chevron-${isProductMenuOpen ? 'up' : 'down'}`}></i>
            </button>
            {isProductMenuOpen && (
              <ul className="ml-6 mt-2 space-y-1">
                <li
                  onClick={() => navigate('/admin/products')}
                  className="flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-1 rounded cursor-pointer"
                >
                  <i className="fa fa-shopping-basket mr-2"></i> All
                </li>
                <li
                  onClick={() => navigate('/admin/products/create')}
                  className="flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-1 rounded cursor-pointer"
                >
                  <i className="fa fa-plus mr-2"></i> Create
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/admin/orders"
              className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition"
            >
              <i className="fa fa-shopping-basket mr-2"></i>
              Orders
            </Link>
          </li>

          <li>
            <Link
              to="/admin/users"
              className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition"
            >
              <i className="fa fa-users mr-2"></i>
              Users
            </Link>
          </li>

          <li>
            <Link
              to="/admin/reviews"
              className="flex items-center text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition"
            >
              <i className="fa fa-star mr-2"></i>
              Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
