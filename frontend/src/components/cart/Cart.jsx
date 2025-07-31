import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart
} from '../../slices/cartSlice';
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const { items } = useSelector(state => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) return;
    dispatch(increaseCartItemQty(item.product));
  };

  const decreaseQty = (item) => {
    const count = item.quantity;
    if (count === 1) return;
    dispatch(decreaseCartItemQty(item.product));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <Fragment>
      {items.length === 0 ? (
        <h2 className="text-2xl font-semibold text-center mt-10">Your Cart is Empty</h2>
      ) : (
        <Fragment>
          <h2 className="text-2xl font-semibold mb-6">Your Cart: <b>{items.length} items</b></h2>

          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Cart Items */}
            <div className="w-full lg:w-2/3 space-y-6">
              {items.map(item => (
                <div
                  key={item.product}
                  className="flex flex-col lg:flex-row items-center gap-6 border border-emerald-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <img src={item.image} alt={item.name} className="w-28 h-24 object-cover rounded-lg" />

                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-emerald-600 hover:underline text-lg font-medium"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >-</button>

                    <input
                      type="number"
                      readOnly
                      value={item.quantity}
                      className="w-12 text-center border border-gray-300 rounded py-1"
                    />

                    <button
                      onClick={() => increaseQty(item)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >+</button>
                  </div>

                  <button
                    onClick={() => dispatch(removeItemFromCart(item.product))}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3 bg-dark-700 p-6 rounded-xl shadow-md border border-gray-200 h-fit">
              <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
              <hr className="mb-4" />

              <p className="flex justify-between text-gray-300 mb-2">
                <span>Subtotal:</span>
                <span>{items.reduce((acc, item) => acc + item.quantity, 0)} Units</span>
              </p>
              <p className="flex justify-between text-gray-300 mb-4">
                <span>Est. Total:</span>
                <span className="font-semibold">
                  ${items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                </span>
              </p>

              <button
                onClick={checkoutHandler}
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Check Out
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
