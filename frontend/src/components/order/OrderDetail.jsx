import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layouts/Loader';
import { orderDetail as orderDetailAction } from '../../actions/orderActions';

export default function OrderDetail() {
  const { orderDetail, loading } = useSelector(state => state.orderState);
  const {
    shippingInfo = {},
    user = {},
    orderStatus = 'Processing',
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {}
  } = orderDetail;

  const isPaid = paymentInfo && paymentInfo.status === 'succeeded';
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-semibold text-emerald-300 mb-8">
            Order #{orderDetail._id}
          </h1>

          {/* Shipping Info */}
          <div className="bg-gray-700 p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">
              Shipping Info
            </h2>
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Phone:</span> {shippingInfo.phoneNo}</p>
            <p>
              <span className="font-medium">Address:</span>{' '}
              {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode},{' '}
              {shippingInfo.state}, {shippingInfo.country}
            </p>
            <p className="mt-2">
              <span className="font-medium">Amount:</span> ${totalPrice}
            </p>
          </div>

          {/* Payment Status */}
          <div className="bg-gray-700 p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">
              Payment
            </h2>
            <p className={isPaid ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
              {isPaid ? 'PAID' : 'NOT PAID'}
            </p>
          </div>

          {/* Order Status */}
          <div className="bg-gray-700 p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">
              Order Status
            </h2>
            <p className={orderStatus.includes('Delivered') ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
              {orderStatus}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-gray-700 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-300 mb-6">
              Order Items
            </h2>
            <div className="space-y-6">
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <Link
                      to={`/product/${item.product}`}
                      className="text-emerald-600 hover:underline font-medium"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <p className="text-gray-300">${item.price}</p>
                    <p className="text-gray-200 text-sm">{item.quantity} Piece(s)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
