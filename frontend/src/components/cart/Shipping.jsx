import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-hot-toast";

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    toast.error("Please fill all the fields");
    navigate("/shipping");
  }
};

export default function Shipping() {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ address, city, phoneNo, postalCode, country, state })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <CheckoutSteps shipping />
      <div className="flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-gray-700 shadow-xl rounded-2xl p-8 border">
          <form onSubmit={submitHandler} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-300 text-center">
              Shipping Info
            </h2>

            <div>
              <label htmlFor="address_field" className="block text-sm font-medium text-gray-300">
                Address
              </label>
              <input
                type="text"
                id="address_field"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-emerald-200 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="city_field" className="block text-sm font-medium text-gray-300">
                City
              </label>
              <input
                type="text"
                id="city_field"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-emerald-200 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="phone_field" className="block text-sm font-medium text-gray-300">
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-emerald-200 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="postal_code_field" className="block text-sm font-medium text-gray-300">
                Postal Code
              </label>
              <input
                type="number"
                id="postal_code_field"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-emerald-200 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="country_field" className="block text-sm font-medium text-gray-300">
                Country
              </label>
              <select
                id="country_field"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-emerald-200 focus:outline-none"
              >
                <option value="">Select Country</option>
                {countryList.map((country, i) => (
                  <option key={i} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="state_field" className="block text-sm font-medium text-gray-300">
                State
              </label>
              <input
                type="text"
                id="state_field"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-emerald-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md shadow-sm transition"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
