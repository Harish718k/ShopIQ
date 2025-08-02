import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown, ChevronUp, LayoutDashboard, ShoppingBag,
  PlusCircle,
  Users,
  Star,
  Package} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  return (
    <aside className="bg-gray-800 shadow h-full min-h-screen w-full md:w-60">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center text-gray-300 hover:bg-emerald-600 px-3 py-2 rounded transition"
            >
              <LayoutDashboard size={18} className='pr-1'/>
              Dashboard
            </Link>
          </li>

          {/* Product Dropdown */}
          <li>
            <button
              onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
              className="flex items-center w-full text-gray-300 hover:bg-emerald-600 px-3 py-2 rounded transition"
            >
              <Package size={18} className='pr-1' />
              Product
              {isProductMenuOpen ? (
                <ChevronUp className="ml-auto w-4 h-4" />
              ) : (
                <ChevronDown className="ml-auto w-4 h-4" />
              )}
            </button>
            {isProductMenuOpen && (
              <ul className="ml-6 mt-2 space-y-1">
                <li
                  onClick={() => navigate('/admin/products')}
                  className="flex items-center text-gray-300 hover:bg-emerald-600 px-3 py-1 rounded cursor-pointer"
                >
                  <ShoppingBag size={18} className='pr-1'/> All
                </li>
                <li
                  onClick={() => navigate('/admin/products/create')}
                  className="flex items-center text-gray-300 hover:bg-emerald-600 px-3 py-1 rounded cursor-pointer"
                >
                  <PlusCircle size={18} className='pr-1'/> Create
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/admin/orders"
              className="flex items-center text-gray-300 hover:bg-emerald-600 px-3 py-2 rounded transition"
            >
              <Package size={18} className='pr-1'/>
              Orders
            </Link>
          </li>

          <li>
            <Link
              to="/admin/users"
              className="flex items-center text-gray-300 hover:bg-emerald-600 px-3 py-2 rounded transition"
            >
              <Users size={18} className='pr-1'/>
              Users
            </Link>
          </li>

          <li>
            <Link
              to="/admin/reviews"
              className="flex items-center text-gray-300 hover:bg-emerald-600 px-3 py-2 rounded transition"
            >
              <Star size={18} className='pr-1'/>
              Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
