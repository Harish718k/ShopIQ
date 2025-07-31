// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Search from './Search';
// import {useDispatch, useSelector} from 'react-redux';
// import {DropdownButton, Dropdown, Image} from 'react-bootstrap';
// import { logout } from '../../actions/userActions';


// export default function Header () {
//     const { isAuthenticated, user } = useSelector(state => state.authState);
//     const { items:cartItems } = useSelector(state => state.cartState)
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const logoutHandler = () => {
//       dispatch(logout);
//     }


//     return (
//     <nav className="navbar row flex">
//         <div className="col-12 col-md-3">
//           <div className="navbar-brand">
//             <Link to="/">
//               <img width="150px" alt='JVLcart Logo' src="/images/logo.png" />
//             </Link>
//             </div>
//         </div>
  
//         <div className="col-12 col-md-6 mt-2 mt-md-0">
//            <Search/>
//         </div>
  
//         <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
//           <Link to="/cart"><span id="cart" className="ml-3">Cart</span></Link>
//           <span className="ml-1" id="cart_count">{cartItems.length}</span>
//           { isAuthenticated ? 
//             (
//               <Dropdown className='d-inline' >
//                   <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
//                     <figure className='avatar avatar-nav'>
//                       <Image width="50px" src={user.avatar??'./images/default_avatar.png'}  />
//                     </figure>
//                     <span>{user.name}</span>
//                   </Dropdown.Toggle>
//                   <Dropdown.Menu>
//                       { user.role === 'admin' && <Dropdown.Item onClick={() => {navigate('admin/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item> }
//                       <Dropdown.Item onClick={() => {navigate('/myprofile')}} className='text-dark'>Profile</Dropdown.Item>
//                       <Dropdown.Item onClick={() => {navigate('/orders')}} className='text-dark'>Orders</Dropdown.Item>
//                       <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
//                   </Dropdown.Menu>
//               </Dropdown>
//             )
          
//           :
//             <Link to="/login"  className="btn" id="login_btn">Login</Link>
//           }
          
//         </div>
//     </nav>
//     )
// }

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { ShoppingCart, LayoutDashboard } from 'lucide-react';
import Search from './Search';

export default function Header() {
  const { isAuthenticated, user } = useSelector(state => state.authState);
  const { items: cartItems } = useSelector(state => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef();

  const logoutHandler = () => {
    dispatch(logout);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-background border-b border-color shadow-sm w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start w-full md:w-1/3">
          <Link to="/">
            <img src="/images/logo.png" alt="Logo" className="w-36" />
          </Link>
        </div>

        {/* Search */}
        <div className="w-full md:w-2/3 mt-4 md:mt-0 flex justify-center">
           <Search />
        </div>

        {/* Cart + Dashboard + User */}
        <div className="flex items-center justify-center md:justify-end gap-6 w-full md:w-1/3 mt-4 md:mt-0">
          
          {/* Cart */}
          <Link to="/cart" className="relative text-copy text-sm font-medium flex items-center gap-1">
            <ShoppingCart size={18} />
            <span>Cart</span>
            <span className="ml-1 bg-primary text-white text-xs font-bold rounded-full px-2 py-0.5">
              {cartItems.length}
            </span>
          </Link>

          {/* Dashboard */}
          {isAuthenticated && user.role === 'admin' && (
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-sm font-medium text-copy hover:text-primary flex items-center gap-1 cursor-pointer"
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
          )}

          {/* Authenticated */}
          {isAuthenticated ? (
            <div className="relative" ref={avatarRef}>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 text-copy focus:outline-none cursor-pointer"
              >
                <img
                  src={user.avatar ?? '/images/default_avatar.png'}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                  <ul className="text-sm text-copy py-2">
                    <li>
                      <button
                        onClick={() => {
                          navigate('/myprofile');
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigate('/orders');
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Orders
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          logoutHandler();
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-error hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primary text-primary-content px-4 py-2 rounded-md text-sm hover:bg-primary-dark"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}


