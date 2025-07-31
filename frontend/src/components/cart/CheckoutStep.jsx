// import { Link } from "react-router-dom";

// export default function CheckoutSteps({shipping, confirmOrder, payment}) {
//     return (

//         <div className="checkout-progress d-flex justify-content-center mt-5">
//             {
//             shipping ?
//             <Link to="/shipping">
//                 <div className="triangle2-active"></div>
//                 <div className="step active-step">Shipping Info</div>
//                 <div className="triangle-active"></div>
//             </Link>:
//              <Link to="/shipping">
//                 <div className="triangle2-incomplete"></div>
//                 <div className="step incomplete">Shipping Info</div>
//                 <div className="triangle-incomplete"></div>
//              </Link>
//             }

//             { confirmOrder ?
//             <Link to="/order/confirm">
//                 <div className="triangle2-active"></div>
//                 <div className="step active-step">Confirm Order</div>
//                 <div className="triangle-active"></div>
//             </Link>:
//              <Link to="/order/confirm">
//                 <div className="triangle2-incomplete"></div>
//                 <div className="step incomplete">Confirm Order</div>
//                 <div className="triangle-incomplete"></div>
//              </Link>
//             }

            
//             { payment ?
//             <Link to="/payment">
//                 <div className="triangle2-active"></div>
//                 <div className="step active-step">Payment</div>
//                 <div className="triangle-active"></div>
//             </Link>:
//              <Link to="/payment">
//                 <div className="triangle2-incomplete"></div>
//                 <div className="step incomplete">Payment</div>
//                 <div className="triangle-incomplete"></div>
//              </Link>
//             }
    
//       </div>
//     )
// }


import { Link } from "react-router-dom";

export default function CheckoutSteps({ shipping, confirmOrder, payment }) {
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="flex items-center justify-between w-full max-w-2xl">
        {/* Step 1: Shipping */}
        <Step
          label="Shipping Info"
          to="/shipping"
          isActive={shipping}
        />

        <Divider />

        {/* Step 2: Confirm Order */}
        <Step
          label="Confirm Order"
          to="/order/confirm"
          isActive={confirmOrder}
        />

        <Divider />

        {/* Step 3: Payment */}
        <Step
          label="Payment"
          to="/payment"
          isActive={payment}
        />
      </div>
    </div>
  );
}

function Step({ label, to, isActive }) {
  return (
    <Link to={to} className="flex flex-col items-center group">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
        }`}
      >
        {/* use initials or icons optionally */}
        {label.charAt(0)}
      </div>
      <span
        className={`mt-2 text-xs font-medium ${
          isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

function Divider() {
  return (
    <div className="w-full h-0.5 bg-gray-300 mx-2"></div>
  );
}
