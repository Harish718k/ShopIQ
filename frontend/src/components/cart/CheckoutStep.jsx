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
            ? 'bg-emerald-600 text-white'
            : 'bg-gray-700 text-gray-300 group-hover:bg-gray-500'
        }`}
      >
        {/* use initials or icons optionally */}
        {label.charAt(0)}
      </div>
      <span
        className={`mt-2 text-xs font-medium ${
          isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'
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
