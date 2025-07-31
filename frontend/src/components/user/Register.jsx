// import {useEffect, useState} from 'react';
// import {useDispatch, useSelector } from 'react-redux'
// import { register, clearAuthError } from '../../actions/userActions'
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// export default function Register() {
//     const [userData, setUserData] = useState({
//         name: "",
//         email: "",
//         password: ""
//     });
//     const [avatar, setAvatar] = useState("");
//     const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { loading, error, isAuthenticated } = useSelector(state => state.authState)

//     const onChange = (e) => {
//         if(e.target.name === 'avatar') {
//            const reader = new FileReader();
//            reader.onload = () => {
//                 if(reader.readyState === 2) {
//                     setAvatarPreview(reader.result);
//                     setAvatar(e.target.files[0])
//                 }
//            }


//            reader.readAsDataURL(e.target.files[0])
//         }else{
//             setUserData({...userData, [e.target.name]:e.target.value })
//         }
//     }

//     const submitHandler = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', userData.name)
//         formData.append('email', userData.email)
//         formData.append('password', userData.password)
//         formData.append('avatar', avatar);
//         dispatch(register(formData))
//     }

//     useEffect(()=>{
//         if(isAuthenticated) {
//             navigate('/');
//             return
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
//         <div className="row wrapper">
//             <div className="col-10 col-lg-5">
//             <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
//                 <h1 className="mb-3">Register</h1>

//             <div className="form-group">
//                 <label htmlFor="email_field">Name</label>
//                 <input name='name' onChange={onChange} type="name" id="name_field" className="form-control" />
//             </div>

//                 <div className="form-group">
//                 <label htmlFor="email_field">Email</label>
//                 <input
//                     type="email"
//                     id="email_field"
//                     name='email' 
//                     onChange={onChange}
//                     className="form-control"
                  
//                 />
//                 </div>
    
//                 <div className="form-group">
//                 <label htmlFor="password_field">Password</label>
//                 <input
//                     name='password' 
//                     onChange={onChange}
//                     type="password"
//                     id="password_field"
//                     className="form-control"
                  
//                 />
//                 </div>

//                 <div className='form-group'>
//                 <label htmlFor='avatar_upload'>Avatar</label>
//                 <div className='d-flex align-items-center'>
//                     <div>
//                         <figure className='avatar mr-3 item-rtl'>
//                             <img
//                                 src={avatarPreview}
//                                 className='rounded-circle'
//                                 alt='Avatar'
//                             />
//                         </figure>
//                     </div>
//                     <div className='custom-file'>
//                         <input
//                             type='file'
//                             name='avatar'
//                             onChange={onChange}
//                             className='custom-file-input'
//                             id='customFile'
//                         />
//                         <label className='custom-file-label' htmlFor='customFile'>
//                             Choose Avatar
//                         </label>
//                     </div>
//                 </div>
//             </div>
    
//                 <button
//                 id="register_button"
//                 type="submit"
//                 className="btn btn-block py-3"
//                 disabled={loading}
//                 >
//                 REGISTER
//                 </button>
//             </form>
//             </div>
//         </div>
//     )
// }


import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearAuthError } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState);

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0]);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('lastname', userData.lastname);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('avatar', avatar);
        dispatch(register(formData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
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
    }, [error, isAuthenticated, dispatch, navigate]);

    return (
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <h1 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Register</h1>
            <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <form onSubmit={submitHandler} className="space-y-5" encType='multipart/form-data'>

                    <div>
                        <label htmlFor="name_field" className="block text-sm font-medium text-gray-300">First Name</label>
                        <input
                            name='name'
                            onChange={onChange}
                            type="text"
                            id="name_field"
                            placeholder='First Name'
                            className="block w-full px-3 py-2  bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="name_field" className="block text-sm font-medium text-gray-300">Last Name</label>
                        <input
                            name='lastname'
                            onChange={onChange}
                            type="text"
                            id="name_field"
                            placeholder='Last Name'
                            className="block w-full px-3 py-2  bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="email_field" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            name='email'
                            onChange={onChange}
                            placeholder='you@example.com'
                            className="block w-full px-3 py-2  bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="password_field" className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            name='password'
                            onChange={onChange}
                            type="password"
                            id="password_field"
                            placeholder='••••••••'
                            className="block w-full px-3 py-2  bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor='avatar_upload' className="block text-sm font-medium text-gray-300 mb-1">Avatar</label>
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                                <img
                                    src={avatarPreview}
                                    className="object-cover w-full h-full"
                                    alt="Avatar Preview"
                                />
                            </div>
                            <label htmlFor="customFile" className="cursor-pointer bg-gray-700 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-600 transition">
                                Choose Avatar
                                <input
                                    type="file"
                                    name="avatar"
                                    id="customFile"
                                    onChange={onChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        id="register_button"
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 text-white py-2.5 rounded-md hover:bg-emerald-700 transition duration-300 disabled:opacity-50"
                    >
                        REGISTER
                    </button>
                    <div className="text-right mt-4">
                           <Link to="/login" className="text-sm text-gray-600 hover:text-emerald-600">
                                Already have an account?
                            </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
