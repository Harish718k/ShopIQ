import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from "react-router-dom";
import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderActions";
import { toast } from "react-hot-toast";
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
      dispatch(clearOrderUpdated())
      toast.success("Order Updated Successfully");
      return;
    }

    if (error) {
      dispatch(clearError())
      toast.error(error);
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
                    <div key={index} className="flex items-center justify-between p-2 border bg-gray-800 rounded-md mb-1">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <Link to={`/product/${item.product}`} className="text-emerald-600 hover:underline w-1/3">{item.name}</Link>
                      <p className="text-gray-300">${item.price}</p>
                      <p className="text-gray-400">{item.quantity} Piece(s)</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right section - status update */}
              <div className="bg-gray-800 shadow p-6 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
                <form onSubmit={submitHandler}>
                  <select
                    className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 text-gray-300 bg-gray-800"
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
                    className={`w-full py-2 px-4 text-white rounded-md transition-colors ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"}`}
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
