// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { forgotPassword,clearAuthError } from "../../actions/userActions";

// export default function ForgotPassword() {
//     const [email, setEmail] = useState("");
//     const dispatch = useDispatch();
//     const { error, message } = useSelector(state => state.authState);

//     const submitHandler = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('email', email);
//         dispatch(forgotPassword(formData))
//     }

//     useEffect(()=>{
//         if(message) {
//             toast(message, {
//                 type: 'success',
//                 // position: toast.POSITION.BOTTOM_CENTER
//             })
//             setEmail("");
//             return;
//         }

//         if(error)  {
//             toast(error, {
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 type: 'error',
//                 onOpen: ()=> { dispatch(clearAuthError) }
//             })
//             return
//         }
//     }, [message, error, dispatch])


//     return (
//         <div className="row wrapper">
//             <div className="col-10 col-lg-5">
//                 <form onSubmit={submitHandler} className="shadow-lg">
//                     <h1 className="mb-3">Forgot Password</h1>
//                     <div className="form-group">
//                         <label htmlFor="email_field">Enter Email</label>
//                         <input
//                             type="email"
//                             id="email_field"
//                             className="form-control"
//                             value={email}
//                             onChange={e=>setEmail(e.target.value)}
//                         />
//                     </div>

//                     <button
//                         id="forgot_password_button"
//                         type="submit"
//                         className="btn btn-block py-3">
//                         Send Email
//                 </button>

//                 </form>
//             </div>
//         </div>
//     )
// }


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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={submitHandler}>
                    <h1 className="text-2xl font-semibold text-center mb-6">Forgot Password</h1>

                    <div className="mb-4">
                        <label htmlFor="email_field" className="block text-sm font-medium text-gray-700">
                            Enter your email
                        </label>
                        <input
                            type="email"
                            id="email_field"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                    >
                        Send Email
                    </button>
                </form>
            </div>
        </div>
    );
}
