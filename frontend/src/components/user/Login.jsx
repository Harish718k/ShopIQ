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

    const { loading, error, isAuthenticated, user} = useSelector(state => state.authState);
    const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    useEffect(() => {
        if (isAuthenticated) {
        if (user?.isblocked) {
        navigate('/blocked');
        } else if (user?.role === 'admin') {
        navigate('/admin/dashboard');
        } else {
        navigate(redirect);
        }
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
            <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <h1 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Login</h1>
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <form onSubmit={submitHandler}>

                        <div className="mb-4">
                            <label htmlFor="email_field" className="block text-sm font-medium text-gray-300">Email</label>
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

                        <div className="mb-4">
                            <label htmlFor="password_field" className="block text-sm font-medium text-gray-300">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="block w-full px-3 py-2  bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                value={password}
                                placeholder='••••••••'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="text-right mb-4">
                            <Link to="/password/forgot" className="text-sm text-emerald-600 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            id="login_button"
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 text-white py-2.5 rounded-md hover:bg-emerald-700 transition duration-300 disabled:opacity-50"
                        >
                            LOGIN
                        </button>

                        <div className="text-right mt-4">
                            <Link to="/register" className="text-sm text-gray-600 hover:text-emerald-600">
                                New User?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
