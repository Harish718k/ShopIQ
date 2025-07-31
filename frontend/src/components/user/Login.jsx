// import {Fragment, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearAuthError, login } from '../../actions/userActions';
// import MetaData from '../layouts/MetaData';
// import { toast } from 'react-toastify';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
//  export default function Login() {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const { loading, error, isAuthenticated } = useSelector(state => state.authState)
//     const redirect = location.search?'/'+location.search.split('=')[1]:'/';

//     const  submitHandler = (e) => {
//         e.preventDefault();
//         dispatch(login(email, password))
//     }

//     useEffect(() => {
//         if(isAuthenticated) {
//             navigate(redirect)
//         }

//         if(error)  {
//             toast(error, {
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 type: 'error',
//                 onOpen: ()=> { dispatch(clearAuthError) }
//             })
//             return
//         }
//     },[error, isAuthenticated, dispatch, navigate])

//     return (
//         <Fragment>
//             <MetaData title={`Login`} />
//             <div className="row wrapper"> 
//                 <div className="col-10 col-lg-5">
//                     <form onSubmit={submitHandler} className="shadow-lg">
//                         <h1 className="mb-3">Login</h1>
//                         <div className="form-group">
//                         <label htmlFor="email_field">Email</label>
//                         <input
//                             type="email"
//                             id="email_field"
//                             className="form-control"
//                             value={email}
//                             onChange={e =>setEmail(e.target.value)}
//                         />
//                         </div>
            
//                         <div className="form-group">
//                         <label htmlFor="password_field">Password</label>
//                         <input
//                             type="password"
//                             id="password_field"
//                             className="form-control"
//                             value={password}
//                             onChange={e =>setPassword(e.target.value)}
//                         />
//                         </div>

//                         <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
            
//                         <button
//                         id="login_button"
//                         type="submit"
//                         className="btn btn-block py-3"
//                         disabled={loading}
//                         >
//                         LOGIN
//                         </button>

//                         <Link to="/register" className="float-right mt-3">New User?</Link>
//                     </form>
//                 </div>
//             </div>
//         </Fragment>
//     )
// }

import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState);
    const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect);
        }

        if (error) {
            toast(error, {
                // position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            });
            return;
        }
    }, [error, isAuthenticated, dispatch, navigate]);

    return (
        <Fragment>
            <MetaData title={`Login`} />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                    <form onSubmit={submitHandler}>
                        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>

                        <div className="mb-4">
                            <label htmlFor="email_field" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password_field" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="text-right mb-4">
                            <Link to="/password/forgot" className="text-sm text-blue-600 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            id="login_button"
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                        >
                            LOGIN
                        </button>

                        <div className="text-right mt-4">
                            <Link to="/register" className="text-sm text-gray-600 hover:text-blue-600">
                                New User?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
