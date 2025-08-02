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
    <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
          <Link to="/" className="flex items-center justify-center md:justify-start w-full">
            <img src="/images/brandlogo.png" alt="Logo" className="w-36" />
          </Link>

        {/* Search */}
        <div className="w-full mt-4 md:mt-0 flex justify-center">
           <Search />
        </div>

        {/* Cart + Dashboard + User */}
        <div className="flex items-center justify-end flex-wrap gap-4 w-full">
          {/* Home */}
          <Link
							to={"/"}
							className='text-gray-300 hover:text-emerald-400 transition duration-300
					                ease-in-out'>
							Home
					</Link>
          {/* Cart */}
          <Link to="/cart" className="relative group text-gray-300 hover:text-emerald-400 transition duration-300
					                ease-in-out
							">
            <ShoppingCart size={18} className='group-hover:text-emerald-400 inline-block mr-1'/>
            <span>Cart</span>
            <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-emerald-400 transition duration-300">
              {cartItems.length}
            </span>
          </Link>

          {/* Dashboard */}
          {isAuthenticated && user.role === 'admin' && (
            <Link
								className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center'
								to={"/admin/dashboard"}
							>
								<LayoutDashboard className='inline-block mr-1' size={18} />
								<span className='hidden sm:inline'>Dashboard</span>
							</Link>
          )}

          {/* Authenticated */}
          {isAuthenticated ? (
            <div className="relative" ref={avatarRef}>
              <button
                onClick={() => setDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 text-copy focus:outline-none cursor-pointer text-white transition duration-300 ease-in-out"
              >
                <img
                  src={user.avatar ?? '/images/default_avatar.png'}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border border-emerald-500"
                />
                <span className="hidden sm:inline text-white text-sm font-medium ml-1">{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg border border-gray-200 z-50">
                  <ul className="text-sm text-copy py-2">
                    <li>
                      <button
                        onClick={() => {
                          navigate('/myprofile');
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-900"
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
                        className="block w-full text-left px-4 py-2 hover:bg-gray-900"
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
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-900"
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
              className="bg-emerald-500 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}


