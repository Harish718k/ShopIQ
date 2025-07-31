// import MetaData from '../layouts/MetaData';
// import { Fragment, useEffect } from 'react';
// import { validateShipping } from './Shipping';
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import CheckoutSteps from './CheckoutStep';

// export default function ConfirmOrder () {
//     const { shippingInfo, items:cartItems } = useSelector(state => state.cartState);
//     const { user } = useSelector(state => state.authState);
//     const navigate = useNavigate();
//     const itemsPrice = cartItems.reduce((acc, item)=> (acc + item.price * item.quantity),0);
//     const shippingPrice = itemsPrice > 200 ? 0 : 25;
//     let taxPrice = Number(0.05 * itemsPrice);
//     const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
//     taxPrice = Number(taxPrice).toFixed(2)
    
//     const processPayment = () => {
//         const data = {
//             itemsPrice,
//             shippingPrice,
//             taxPrice,
//             totalPrice
//         }
//         sessionStorage.setItem('orderInfo', JSON.stringify(data))
//         navigate('/payment')
//     }


//     useEffect(()=>{
//         validateShipping(shippingInfo, navigate)
//     },[])

//     return (
//         <Fragment>
//             <MetaData title={'Confirm Order'} />
//             <CheckoutSteps shipping confirmOrder />
//             <div className="row d-flex justify-content-between">
//             <div className="col-12 col-lg-8 mt-5 order-confirm">

//                 <h4 className="mb-3">Shipping Info</h4>
//                 <p><b>Name:</b> {user.name}</p>
//                 <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
//                 <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country} </p>
                
//                 <hr />
//                 <h4 className="mt-4">Your Cart Items:</h4>

//                     {cartItems.map(item => (
//                             <Fragment>
//                                 <div className="cart-item my-1">
//                                     <div className="row">
//                                         <div className="col-4 col-lg-2">
//                                             <img src={item.image} alt={item.name} height="45" width="65" />
//                                         </div>

//                                         <div className="col-5 col-lg-6">
//                                             <Link to={`/product/${item.product}`}>{item.name}</Link>
//                                         </div>


//                                         <div className="col-4 col-lg-4 mt-4 mt-lg-0">
//                                             <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
//                                         </div>

//                                     </div>
//                                 </div>
//                                 <hr />
//                             </Fragment>
//                         )
                    
//                         )
                    
//                     }
              
              
                

//             </div>
			
//             <div className="col-12 col-lg-3 my-4">
//                     <div id="order_summary">
//                         <h4>Order Summary</h4>
//                         <hr />
//                         <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
//                         <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
//                         <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

//                         <hr />

//                         <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

//                         <hr />
//                         <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">Proceed to Payment</button>
//                     </div>
//             </div>
//         </div>
//         </Fragment>
        
//     )
// }


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
          <div className="text-gray-700 space-y-1 mb-6">
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
              <div key={i} className="flex items-center gap-4 p-4 rounded-md border shadow-sm bg-white">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex flex-col flex-1">
                  <Link
                    to={`/product/${item.product}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-700">
                    {item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white border rounded-md shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-gray-700">
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
              <p className="flex justify-between font-medium text-gray-900">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </p>
            </div>
            <button
              onClick={processPayment}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-200"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
