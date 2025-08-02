import { useElements, useStripe } from "@stripe/react-stripe-js";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { orderCompleted } from "../../slices/cartSlice";
import { validateShipping } from './Shipping';
import { createOrder } from '../../actions/orderActions';
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { user } = useSelector(state => state.authState);
    const { items: cartItems, shippingInfo } = useSelector(state => state.cartState);
    const { error: orderError } = useSelector(state => state.orderState);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
        shipping: {
            name: user.name,
            address: {
                city: shippingInfo.city,
                postal_code: shippingInfo.postalCode,
                country: shippingInfo.country,
                state: shippingInfo.state,
                line1: shippingInfo.address
            },
            phone: shippingInfo.phoneNo
        }
    };

    const order = {
        orderItems: cartItems,
        shippingInfo
    };

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice;
        order.shippingPrice = orderInfo.shippingPrice;
        order.taxPrice = orderInfo.taxPrice;
        order.totalPrice = orderInfo.totalPrice;
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate);
        if (orderError) {
            dispatch(clearOrderError());
            toast.error(orderError);
        }
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        
        document.querySelector('#pay_btn').disabled = true;
        try {
            const { data } = await axios.post('/api/v1/payment/process', paymentData);
           
            const clientSecret = data.client_secret;
            
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                toast.error(result.error.message);
                
                document.querySelector('#pay_btn').disabled = false;
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    toast.success("Payment Successful!");
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    };
                    dispatch(orderCompleted());
                    dispatch(createOrder(order));
                    navigate('/order/success');
                } else {
                    console.log(result.error.message);
                    toast.error("Payment Failed!");
                    document.querySelector('#pay_btn').disabled = false;
                    }
                }
                
            } catch (error) {
                console.log(error.message);
                toast.error("Payment Failed!");
                document.querySelector('#pay_btn').disabled = false;
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-md p-6">
                <form onSubmit={submitHandler} className="space-y-5">
                    <h1 className="text-2xl font-semibold text-center text-gray-300 dark:text-gray-200">Card Information</h1>

                    <div>
                        <label htmlFor="card_num_field" className="block text-sm font-medium mb-1 text-gray-300">Card Number</label>
                        <div className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-200 focus-within:ring-2 focus-within:ring-emerald-500">
                            <CardNumberElement id="card_num_field" className="w-full bg-transparent" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="card_exp_field" className="block text-sm font-medium mb-1 text-gray-300 ">Card Expiry</label>
                        <div className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-200 focus-within:ring-2 focus-within:ring-emerald-500">
                            <CardExpiryElement id="card_exp_field" className="w-full bg-transparent" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="card_cvc_field" className="block text-sm font-medium mb-1 text-gray-300">Card CVC</label>
                        <div className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-200 focus-within:ring-2 focus-within:ring-emerald-500">
                            <CardCvcElement id="card_cvc_field" className="w-full bg-transparent" />
                        </div>
                    </div>

                    <button
                        id="pay_btn"
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow transition-all duration-200"
                    >
                        Pay - ${orderInfo && orderInfo.totalPrice}
                    </button>
                </form>
            </div>
        </div>
    );
}
