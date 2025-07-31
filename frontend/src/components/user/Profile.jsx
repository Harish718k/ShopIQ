// import {useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// export default function Profile () {
//     const { user }  = useSelector(state => state.authState);

//     return (
//         <div className="row justify-content-around mt-5 user-info">
//             <div className="col-12 col-md-3">
//                 <figure className='avatar avatar-profile'>
//                     <img className="rounded-circle img-fluid" src={user.avatar??'./images/default_avatar.png'} alt='' />
//                 </figure>
//                 <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary btn-block my-5">
//                     Edit Profile
//                 </Link>
//             </div>
    
//             <div className="col-12 col-md-5">
//                 <h4>Full Name</h4>
//                 <p>{user.name}</p>
    
//                 <h4>Email Address</h4>
//                 <p>{user.email}</p>

//                 <h4>Joined</h4>
//                 <p>{String(user.createdAt).substring(0, 10)}</p>

//                 <Link to="/orders" className="btn btn-danger btn-block mt-5">
//                     My Orders
//                 </Link>

//                 <Link to="/myprofile/update/password" className="btn btn-primary btn-block mt-3">
//                     Change Password
//                 </Link>
//             </div>
//         </div>
//     )
// }


import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { user } = useSelector(state => state.authState);

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-start justify-center gap-10 px-4 py-10">
            <div className="w-full max-w-xs bg-gray-900 p-6 rounded-xl shadow">
                <div className="flex flex-col items-center">
                    <figure className="w-28 h-28 rounded-full overflow-hidden border border-gray-300 mb-4">
                        <img
                            src={user.avatar ?? './images/default_avatar.png'}
                            alt="Profile"
                            className="object-cover w-full h-full"
                        />
                    </figure>
                    <Link
                        to="/myprofile/update"
                        className="mt-4 w-full text-center bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>

            <div className="w-full max-w-xl bg-gray-900 p-6 rounded-xl shadow space-y-4">
                <div>
                    <h4 className="text-sm font-medium text-gray-300">Full Name</h4>
                    <p className="text-lg font-semibold text-gray-200">{user.name + " " + user.lastname}</p>
                </div>

                <div>
                    <h4 className="text-sm font-medium text-gray-300">Email Address</h4>
                    <p className="text-lg font-semibold text-gray-200">{user.email}</p>
                </div>

                <div>
                    <h4 className="text-sm font-medium text-gray-300">Joined</h4>
                    <p className="text-lg font-semibold text-gray-200">{String(user.createdAt).substring(0, 10)}</p>
                </div>

                <div className="pt-4 space-y-3">
                    <Link
                        to="/orders"
                        className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        My Orders
                    </Link>
                    <Link
                        to="/myprofile/update/password"
                        className="block w-full text-center bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition"
                    >
                        Change Password
                    </Link>
                </div>
            </div>
        </div>
    );
}
