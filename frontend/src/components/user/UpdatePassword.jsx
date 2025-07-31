// import {useEffect, useState } from 'react';
// import { updatePassword as updatePasswordAction, clearAuthError } from '../../actions/userActions';
// import {useDispatch, useSelector} from 'react-redux';
// import { toast } from 'react-toastify';

// export default function UpdatePassword() {
    
//     const [password, setPassword] = useState("");
//     const [oldPassword, setOldPassword] = useState("");
//     const dispatch = useDispatch();
//     const { isUpdated, error } = useSelector(state => state.authState)

//     const submitHandler = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('oldPassword', oldPassword);
//         formData.append('password', password);
//         dispatch(updatePasswordAction(formData))
//     }

//     useEffect(() => {
//         if(isUpdated) {
//             toast('Password updated successfully',{
//                 type: 'success',
//                 // position: toast.POSITION.BOTTOM_CENTER
//             })
//             setOldPassword("");
//             setPassword("")
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
//     },[isUpdated, error, dispatch])

//     return (
//         <div className="row wrapper">
//             <div className="col-10 col-lg-5">
//                 <form onSubmit={submitHandler} className="shadow-lg">
//                     <h1 className="mt-2 mb-5">Update Password</h1>
//                     <div className="form-group">
//                         <label htmlFor="old_password_field">Old Password</label>
//                         <input
//                             type="password"
//                             id="old_password_field"
//                             className="form-control"
//                             value={oldPassword}
//                             onChange={e=>setOldPassword(e.target.value)}
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label htmlFor="new_password_field">New Password</label>
//                         <input
//                             type="password"
//                             id="new_password_field"
//                             className="form-control"
//                             value={password}
//                             onChange={e=>setPassword(e.target.value)}
//                         />
//                     </div>

//                     <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
//                 </form>
//             </div>
//         </div>
//     )
// }


import { useEffect, useState } from 'react';
import { updatePassword as updatePasswordAction, clearAuthError } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function UpdatePassword() {
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const dispatch = useDispatch();
    const { isUpdated, error } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', password);
        dispatch(updatePasswordAction(formData));
    };

    useEffect(() => {
        if (isUpdated) {
            toast('Password updated successfully', {
                type: 'success',
                // position: toast.POSITION.BOTTOM_CENTER
            });
            setOldPassword("");
            setPassword("");
            return;
        }
        if (error) {
            toast(error, {
                // position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError()) }
            });
            return;
        }
    }, [isUpdated, error, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={submitHandler} className="space-y-5">
                    <h1 className="text-2xl font-semibold text-center">Update Password</h1>

                    <div>
                        <label htmlFor="old_password_field" className="block text-sm font-medium text-gray-700">
                            Old Password
                        </label>
                        <input
                            type="password"
                            id="old_password_field"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="new_password_field" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new_password_field"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}
