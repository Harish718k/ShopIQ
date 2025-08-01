import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";

export default function UpdateProfile() {
    const { error, user, isUpdated } = useSelector(state => state.authState);
    const [name, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
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
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('avatar', avatar);
        dispatch(updateProfile(formData));
    };

    useEffect(() => {
        if (user) {
            setFirstName(user.name);
            setLastName(user.lastname);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPreview(user.avatar);
            }
        }

        if (isUpdated) {
            dispatch(clearUpdateProfile());
            toast.success("Profile updated successfully");
            return;
        }

        if (error) {
            toast.error(error);
            dispatch(clearAuthError);
            return;
        }
    }, [user, isUpdated, error, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center w-full px-4">
            <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg">
                <form onSubmit={submitHandler} className="space-y-5" encType='multipart/form-data'>
                    <h1 className="text-2xl font-semibold text-center">Update Profile</h1>

                    <div>
                        <label htmlFor="name_field" className="block text-sm font-medium text-gray-300">First Name</label>
                        <input
                            type="text"
                            id="firstname_field"
                            name="name"
                            value={name}
                            onChange={e => setFirstName(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="name_field" className="block text-sm font-medium text-gray-300">Last Name</label>
                        <input
                            type="text"
                            id="lastname_field"
                            name="lastname"
                            value={lastname}
                            onChange={e => setLastName(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email_field" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="avatar_upload" className="block text-sm font-medium text-gray-300 mb-1">Avatar</label>
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                                <img
                                    src={avatarPreview}
                                    className="object-cover w-full h-full"
                                    alt="Avatar Preview"
                                />
                            </div>
                            <label htmlFor="customFile" className="cursor-pointer bg-gray-700 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800 transition">
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
                        className="w-full bg-emerald-600 text-white py-2.5 rounded-md hover:bg-emerald-700 transition duration-300"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}
