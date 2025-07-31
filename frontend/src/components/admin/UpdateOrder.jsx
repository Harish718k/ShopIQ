// import { Fragment, useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
// import { useDispatch, useSelector} from 'react-redux';
// import { useNavigate, useParams } from "react-router-dom";
// import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderActions";
// import { toast } from "react-toastify";
// import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
// import { Link } from "react-router-dom";

// export default function UpdateOrder () {
    
    
//     const { loading, isOrderUpdated, error, orderDetail } = useSelector( state => state.orderState)
//     const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {}} = orderDetail;
//     const isPaid = paymentInfo.status === 'succeeded'? true: false;
//     const [orderStatus, setOrderStatus] = useState("Processing");
//     const { id:orderId } = useParams();


//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const submitHandler = (e) => {
//         e.preventDefault();
//         const orderData = {};
//         orderData.orderStatus = orderStatus;
//         dispatch(updateOrder(orderId, orderData))
//     }
    
//     useEffect(() => {
//         if(isOrderUpdated) {
//             toast('Order Updated Succesfully!',{
//                 type: 'success',
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 onOpen: () => dispatch(clearOrderUpdated())
//             })
           
//             return;
//         }

//         if(error)  {
//             toast(error, {
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 type: 'error',
//                 onOpen: ()=> { dispatch(clearError()) }
//             })
//             return
//         }

//         dispatch(orderDetailAction(orderId))
//     }, [isOrderUpdated, error, dispatch])


//     useEffect(() => {
//         if(orderDetail._id) {
//             setOrderStatus(orderDetail.orderStatus);
//         }
//     },[orderDetail])


//     return (
//         <div className="row">
//             <div className="col-12 col-md-2">
//                     <Sidebar/>
//             </div>
//             <div className="col-12 col-md-10">
//                 <Fragment>
//                 <div className="row d-flex justify-content-around">
//                         <div className="col-12 col-lg-8 mt-5 order-details">
    
//                             <h1 className="my-5">Order # {orderDetail._id}</h1>
    
//                             <h4 className="mb-4">Shipping Info</h4>
//                             <p><b>Name:</b> {user.name}</p>
//                             <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
//                             <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
//                             <p><b>Amount:</b> ${totalPrice}</p>
    
//                             <hr />
    
//                             <h4 className="my-4">Payment</h4>
//                             <p className={isPaid ? 'greenColor' : 'redColor' } ><b>{isPaid ? 'PAID' : 'NOT PAID' }</b></p>
    
    
//                             <h4 className="my-4">Order Status:</h4>
//                             <p className={orderStatus&&orderStatus.includes('Delivered') ? 'greenColor' : 'redColor' } ><b>{orderStatus}</b></p>
    
    
//                             <h4 className="my-4">Order Items:</h4>
    
//                             <hr />
//                             <div className="cart-item my-1">
//                                 {orderItems && orderItems.map(item => (
//                                     <div className="row my-5">
//                                         <div className="col-4 col-lg-2">
//                                             <img src={item.image} alt={item.name} height="45" width="65" />
//                                         </div>

//                                         <div className="col-5 col-lg-5">
//                                             <Link to={`/product/${item.product}`}>{item.name}</Link>
//                                         </div>


//                                         <div className="col-4 col-lg-2 mt-4 mt-lg-0">
//                                             <p>${item.price}</p>
//                                         </div>

//                                         <div className="col-4 col-lg-3 mt-4 mt-lg-0">
//                                             <p>{item.quantity} Piece(s)</p>
//                                         </div>
//                                     </div>
//                                 ))}
                                    
//                             </div>
//                             <hr />
//                         </div>
//                         <div className="col-12 col-lg-3 mt-5">
//                             <h4 className="my-4">Order Status</h4>
//                             <div className="form-group">
//                                 <select 
//                                 className="form-control"
//                                 onChange={e => setOrderStatus(e.target.value)}
//                                 value={orderStatus}
//                                 name="status"
//                                 >
//                                     <option value="Processing">Processing</option>
//                                     <option value="Shipped">Shipped</option>
//                                     <option value="Delivered">Delivered</option>
//                                 </select>
                              
//                             </div>
//                             <button
//                                 disabled={loading}
//                                 onClick={submitHandler}
//                                 className="btn btn-primary btn-block"
//                                 >
//                                     Update Status
//                             </button>

//                         </div>
//                     </div>
//                 </Fragment>
//             </div>
//         </div>
        
//     )
// }


import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";

export default function UpdateOrder() {
  const { loading, isOrderUpdated, error, orderDetail } = useSelector(state => state.orderState);
  const { user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {} } = orderDetail;

  const isPaid = paymentInfo.status === 'succeeded';
  const [orderStatus, setOrderStatus] = useState("Processing");

  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrder(orderId, { orderStatus }));
  }

  useEffect(() => {
    if (isOrderUpdated) {
      toast('Order Updated Successfully!', {
        type: 'success',
        onOpen: () => dispatch(clearOrderUpdated())
      });
      return;
    }

    if (error) {
      toast(error, {
        type: 'error',
        onOpen: () => dispatch(clearError())
      });
      return;
    }

    dispatch(orderDetailAction(orderId));
  }, [isOrderUpdated, error, dispatch]);

  useEffect(() => {
    if (orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 px-4 py-6">
        <Fragment>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Order #{orderDetail._id}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left section */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-medium mb-2">Shipping Info</h2>
                  <p><span className="font-semibold">Name:</span> {user.name}</p>
                  <p><span className="font-semibold">Phone:</span> {shippingInfo.phoneNo}</p>
                  <p><span className="font-semibold">Address:</span> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                  <p><span className="font-semibold">Amount:</span> ${totalPrice}</p>
                </div>

                <div>
                  <h2 className="text-xl font-medium mb-2">Payment</h2>
                  <p className={`${isPaid ? "text-green-600" : "text-red-600"} font-semibold`}>
                    {isPaid ? 'PAID' : 'NOT PAID'}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium mb-2">Order Status</h2>
                  <p className={`${orderStatus.includes("Delivered") ? "text-green-600" : "text-red-600"} font-semibold`}>
                    {orderStatus}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium mb-4">Order Items</h2>
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <Link to={`/product/${item.product}`} className="text-blue-600 hover:underline w-1/3">{item.name}</Link>
                      <p className="text-gray-700">${item.price}</p>
                      <p className="text-gray-500">{item.quantity} Piece(s)</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right section - status update */}
              <div className="bg-white shadow p-6 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
                <form onSubmit={submitHandler}>
                  <select
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                    value={orderStatus}
                    onChange={e => setOrderStatus(e.target.value)}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button
                    disabled={loading}
                    type="submit"
                    className={`w-full py-2 px-4 text-white rounded-md transition-colors ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    Update Status
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
