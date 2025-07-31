// import Sidebar from "./Sidebar";
// import {useDispatch, useSelector} from 'react-redux';
// import { useEffect } from "react";
// import { getAdminProducts } from "../../actions/productActions";
// import {getUsers} from '../../actions/userActions'
// import {adminOrders as adminOrdersAction} from '../../actions/orderActions'
// import { Link } from "react-router-dom";

// export default function Dashboard () {
//     const { products = [] } = useSelector( state => state.productsState);
//     const { adminOrders = [] } = useSelector( state => state.orderState);
//     const { users = [] } = useSelector( state => state.userState);
//     const dispatch = useDispatch();
//     let outOfStock = 0;

//     if (products.length > 0) {
//         products.forEach( product => {
//             if( product.stock === 0  ) {
//                 outOfStock = outOfStock + 1;
//             }
//         })
//     }

//     let totalAmount = 0;
//     if (adminOrders.length > 0) {
//         adminOrders.forEach( order => {
//             totalAmount += order.totalPrice
//         })
//     }



//     useEffect( () => {
//        dispatch(getAdminProducts);
//        dispatch(getUsers);
//        dispatch(adminOrdersAction)
//     }, [])


//     return (
//         <div className="row">
//             <div className="col-12 col-md-2">
//                     <Sidebar/>
//             </div>
//             <div className="col-12 col-md-10">
//                 <h1 className="my-4">Dashboard</h1>
//                 <div className="row pr-4">
//                     <div className="col-xl-12 col-sm-12 mb-3">
//                         <div className="card text-white bg-primary o-hidden h-100">
//                             <div className="card-body">
//                                 <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount}</b>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row pr-4">
//                     <div className="col-xl-3 col-sm-6 mb-3">
//                         <div className="card text-white bg-success o-hidden h-100">
//                             <div className="card-body">
//                                 <div className="text-center card-font-size">Products<br /> <b>{products.length}</b></div>
//                             </div>
//                             <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
//                                 <span className="float-left">View Details</span>
//                                 <span className="float-right">
//                                     <i className="fa fa-angle-right"></i>
//                                 </span>
//                             </Link>
//                         </div>
//                     </div>


//                     <div className="col-xl-3 col-sm-6 mb-3">
//                         <div className="card text-white bg-danger o-hidden h-100">
//                             <div className="card-body">
//                                 <div className="text-center card-font-size">Orders<br /> <b>{adminOrders.length}</b></div>
//                             </div>
//                             <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
//                                 <span className="float-left">View Details</span>
//                                 <span className="float-right">
//                                     <i className="fa fa-angle-right"></i>
//                                 </span>
//                             </Link>
//                         </div>
//                     </div>


//                     <div className="col-xl-3 col-sm-6 mb-3">
//                         <div className="card text-white bg-info o-hidden h-100">
//                             <div className="card-body">
//                                 <div className="text-center card-font-size">Users<br /> <b>{users.length}</b></div>
//                             </div>
//                             <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
//                                 <span className="float-left">View Details</span>
//                                 <span className="float-right">
//                                     <i className="fa fa-angle-right"></i>
//                                 </span>
//                             </Link>
//                         </div>
//                     </div>


//                     <div className="col-xl-3 col-sm-6 mb-3">
//                         <div className="card text-white bg-warning o-hidden h-100">
//                             <div className="card-body">
//                                 <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


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

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getUsers());
    dispatch(adminOrdersAction());
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="md:w-1/5 bg-white border-r">
        <Sidebar />
      </div>
      <div className="md:w-4/5 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

        {/* Total Amount */}
        <div className="bg-blue-600 text-white rounded-xl shadow p-6 mb-6">
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
