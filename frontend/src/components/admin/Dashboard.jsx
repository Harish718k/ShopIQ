
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from "../../actions/userActions";
import { adminOrders as adminOrdersAction } from "../../actions/orderActions";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { products = [] } = useSelector((state) => state.productsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  let outOfStock = 0;
  if (products.length > 0) {
    products.forEach((product) => {
      if (product.stock === 0) outOfStock += 1;
    });
  }

  let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  }
  totalAmount = totalAmount.toFixed(2);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getUsers());
    dispatch(adminOrdersAction());
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/5 ">
        <Sidebar />
      </div>
      <div className="md:w-4/5 p-6">
        <h1 className="text-2xl font-semibold text-gray-300 mb-6">Dashboard</h1>

        {/* Total Amount */}
        <div className="bg-emerald-600 text-white rounded-xl shadow p-6 mb-6">
          <div className="text-center text-lg font-medium">
            Total Amount <br />
            <span className="text-2xl font-bold">${totalAmount}</span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Products */}
          <div className="bg-green-600 text-white rounded-xl shadow p-4 flex flex-col justify-between">
            <div className="text-center font-medium">
              Products <br />
              <span className="text-xl font-bold">{products.length}</span>
            </div>
            <Link
              to="/admin/products"
              className="mt-4 text-sm text-white underline hover:opacity-90 text-center"
            >
              View Details →
            </Link>
          </div>

          {/* Orders */}
          <div className="bg-red-600 text-white rounded-xl shadow p-4 flex flex-col justify-between">
            <div className="text-center font-medium">
              Orders <br />
              <span className="text-xl font-bold">{adminOrders.length}</span>
            </div>
            <Link
              to="/admin/orders"
              className="mt-4 text-sm text-white underline hover:opacity-90 text-center"
            >
              View Details →
            </Link>
          </div>

          {/* Users */}
          <div className="bg-cyan-600 text-white rounded-xl shadow p-4 flex flex-col justify-between">
            <div className="text-center font-medium">
              Users <br />
              <span className="text-xl font-bold">{users.length}</span>
            </div>
            <Link
              to="/admin/users"
              className="mt-4 text-sm text-white underline hover:opacity-90 text-center"
            >
              View Details →
            </Link>
          </div>

          {/* Out of Stock */}
          <div className="bg-yellow-500 text-white rounded-xl shadow p-4 flex flex-col justify-center">
            <div className="text-center font-medium">
              Out of Stock <br />
              <span className="text-xl font-bold">{outOfStock}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
