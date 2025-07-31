import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, clearAuthError } from "../../actions/userActions";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { error, message } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData));
    };

    useEffect(() => {
        if (message) {
            toast(message, {
                type: 'success',
                // position: toast.POSITION.BOTTOM_CENTER
            });
            setEmail("");
            return;
        }

        if (error) {
            toast(error, {
                // position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return;
        }
    }, [message, error, dispatch]);

    return (
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <h1 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Forgot Password</h1>
            <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <form onSubmit={submitHandler}>

                    <div className="mb-4">
                        <label htmlFor="email_field" className="block text-sm font-medium text-gray-300 mb-1">
                            Enter your email
                        </label>
                        <input
                            type="email"
                            id="email_field"
                            className="block w-full px-3 py-2  bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
                            value={email}
                            placeholder='you@example.com'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="w-full bg-emerald-600 text-white py-2.5 rounded-md hover:bg-emerald-700 transition duration-300 disabled:opacity-50"
                    >
                        Send Email
                    </button>
                </form>
            </div>
        </div>
    );
}
