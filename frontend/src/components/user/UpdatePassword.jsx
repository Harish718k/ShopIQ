

import { useEffect, useState } from 'react';
import { updatePassword as updatePasswordAction, clearAuthError } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

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
            toast.success("Password updated successfully");
            setOldPassword("");
            setPassword("");
            return;
        }
        if (error) {
            toast.error(error);
            dispatch(clearAuthError);
            return;
        }
    }, [isUpdated, error, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg">
                <form onSubmit={submitHandler} className="space-y-5">
                    <h1 className="text-2xl font-semibold text-center">Update Password</h1>

                    <div>
                        <label htmlFor="old_password_field" className="block text-sm font-medium text-gray-300">
                            Old Password
                        </label>
                        <input
                            type="password"
                            id="old_password_field"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="new_password_field" className="block text-sm font-medium text-gray-300">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new_password_field"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white py-2.5 rounded-md hover:bg-emerald-700 transition duration-300"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}
