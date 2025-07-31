// import { useEffect, useState} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { resetPassword, clearAuthError } from '../../actions/userActions';
// import {useNavigate, useParams} from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function ResetPassword() {
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const dispatch = useDispatch();
//     const { isAuthenticated, error }  = useSelector(state => state.authState)
//     const navigate = useNavigate();
//     const { token } = useParams();

//     const submitHandler  = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('password', password);
//         formData.append('confirmPassword', confirmPassword);
        
//         dispatch(resetPassword(formData, token))
//     }

//     useEffect(()=> {
//         if(isAuthenticated) {
//             toast('Password Reset Success!', {
//                 type: 'success',
//                 // position: toast.POSITION.BOTTOM_CENTER
//             })
//             navigate('/')
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
//     },[isAuthenticated, error, dispatch, navigate])

//     return (
//         <div className="row wrapper">
//             <div className="col-10 col-lg-5">
//                 <form onSubmit={submitHandler} className="shadow-lg">
//                     <h1 className="mb-3">New Password</h1>

//                     <div className="form-group">
//                         <label htmlFor="password_field">Password</label>
//                         <input
//                             type="password"
//                             id="password_field"
//                             className="form-control"
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="confirm_password_field">Confirm Password</label>
//                         <input
//                             type="password"
//                             id="confirm_password_field"
//                             className="form-control"
//                             value={confirmPassword}
//                             onChange={e => setConfirmPassword(e.target.value)}
//                         />
//                     </div>

//                     <button
//                         id="new_password_button"
//                         type="submit"
//                         className="btn btn-block py-3">
//                         Set Password
//                     </button>

//                 </form>
//             </div>
//         </div>
//     )
// }


import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearAuthError } from '../../actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector(state => state.authState);
  const navigate = useNavigate();
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    dispatch(resetPassword(formData, token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast('Password Reset Success!', { type: 'success' });
      navigate('/');
      return;
    }

    if (error) {
      toast(error, {
        type: 'error',
        onOpen: () => { dispatch(clearAuthError()); }
      });
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          New Password
        </h1>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label htmlFor="password_field" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirm_password_field" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password_field"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
}
