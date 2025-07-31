// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux"
// import { toast } from "react-toastify";
// import { updateProfile, clearAuthError } from "../../actions/userActions";
// import { clearUpdateProfile } from "../../slices/authSlice";

// export default function UpdateProfile () {
//     const {  error, user, isUpdated } = useSelector(state => state.authState);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [avatar, setAvatar] = useState("");
//     const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
//     const dispatch = useDispatch();

//     const onChangeAvatar = (e) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//              if(reader.readyState === 2) {
//                  setAvatarPreview(reader.result);
//                  setAvatar(e.target.files[0])
//              }
//         }


//         reader.readAsDataURL(e.target.files[0])
//     }

//     const submitHandler  = (e) =>{
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', name)
//         formData.append('email', email)
//         formData.append('avatar', avatar);
//         dispatch(updateProfile(formData))
//     }

//     useEffect(() => {
//         if(user) {
//             setName(user.name);
//             setEmail(user.email);
//             if(user.avatar) {
//                 setAvatarPreview(user.avatar)
//             }
//         }

//         if(isUpdated) {
//             toast('Profile updated successfully',{
//                 type: 'success',
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 onOpen: () => dispatch(clearUpdateProfile())
//             })
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
//     },[user, isUpdated, error, dispatch])

//     return (  
//     <div className="row wrapper">
//         <div className="col-10 col-lg-5">
//             <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
//                 <h1 className="mt-2 mb-5">Update Profile</h1>

//                 <div className="form-group">
//                     <label htmlFor="email_field">Name</label>
//                     <input 
//                         type="name" 
//                         id="name_field" 
//                         className="form-control"
//                         name='name'
//                         value={name}
//                         onChange={e=>setName(e.target.value)}
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="email_field">Email</label>
//                     <input
//                         type="email"
//                         id="email_field"
//                         className="form-control"
//                         name='email'
//                         value={email}
//                         onChange={e=>setEmail(e.target.value)}
//                     />
//                 </div>

//                 <div className='form-group'>
//                     <label htmlFor='avatar_upload'>Avatar</label>
//                     <div className='d-flex align-items-center'>
//                         <div>
//                             <figure className='avatar mr-3 item-rtl'>
//                                 <img
//                                     src={avatarPreview}
//                                     className='rounded-circle'
//                                     alt='Avatar Preview'
//                                 />
//                             </figure>
//                         </div>
//                         <div className='custom-file'>
//                             <input
//                                 type='file'
//                                 name='avatar'
//                                 className='custom-file-input'
//                                 id='customFile'
//                                 onChange={onChangeAvatar}
//                             />
//                             <label className='custom-file-label' htmlFor='customFile'>
//                                 Choose Avatar
//                         </label>
//                         </div>
//                     </div>
//                 </div>

//                 <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
//             </form>
//         </div>
//     </div>)
// }


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";

export default function UpdateProfile() {
    const { error, user, isUpdated } = useSelector(state => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPreview(user.avatar);
            }
        }

        if (isUpdated) {
            toast('Profile updated successfully', {
                type: 'success',
                // // position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearUpdateProfile())
            });
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
    }, [user, isUpdated, error, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center w-full bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <form onSubmit={submitHandler} className="space-y-5" encType='multipart/form-data'>
                    <h1 className="text-2xl font-semibold text-center">Update Profile</h1>

                    <div>
                        <label htmlFor="name_field" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name_field"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email_field" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="avatar_upload" className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                                <img
                                    src={avatarPreview}
                                    className="object-cover w-full h-full"
                                    alt="Avatar Preview"
                                />
                            </div>
                            <label htmlFor="customFile" className="cursor-pointer bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-200 transition">
                                Choose Avatar
                                <input
                                    type="file"
                                    name="avatar"
                                    id="customFile"
                                    onChange={onChangeAvatar}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}
