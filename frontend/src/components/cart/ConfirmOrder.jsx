import MetaData from '../layouts/MetaData';
import { Fragment, useEffect } from 'react';
import { validateShipping } from './Shipping';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutStep';

export default function ConfirmOrder() {
  const { shippingInfo, items: cartItems } = useSelector(state => state.cartState);
  const { user } = useSelector(state => state.authState);
  const navigate = useNavigate();

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  let taxPrice = Number(0.05 * itemsPrice);
  const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2);

  const processPayment = () => {
    const data = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/payment');
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  }, []);

  return (
    <Fragment>
      <MetaData title={'Confirm Order'} />
      <CheckoutSteps shipping confirmOrder />
      <div className="flex flex-col lg:flex-row justify-between px-4 lg:px-20 py-8 gap-8">
        {/* Left Side */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl font-semibold mb-4">Shipping Info</h2>
          <div className="text-gray-300 space-y-1 mb-6">
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Phone:</span> {shippingInfo.phoneNo}</p>
            <p>
              <span className="font-medium">Address:</span> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}
            </p>
          </div>

          <hr className="my-6" />
          <h2 className="text-xl font-semibold mb-4">Your Cart Items</h2>

          <div className="space-y-4">
            {cartItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-md border shadow-sm bg-gray-800">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex flex-col flex-1">
                  <Link
                    to={`/product/${item.product}`}
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-300">
                    {item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-800 border rounded-md shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-gray-300">
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span>${itemsPrice}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping:</span>
                <span>${shippingPrice}</span>
              </p>
              <p className="flex justify-between">
                <span>Tax:</span>
                <span>${taxPrice}</span>
              </p>
              <hr className="my-2" />
              <p className="flex justify-between font-medium text-emerald-400">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </p>
            </div>
            <button
              onClick={processPayment}
              className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md transition duration-200"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
