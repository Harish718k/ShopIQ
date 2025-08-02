import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import { toast } from "react-hot-toast";

export default function UpdateUser() {
  const [name, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isblocked, setIsBlocked] = useState(false);

  const { id: userId } = useParams();
  const dispatch = useDispatch();

  const { loading, isUserUpdated, error, user } = useSelector(state => state.userState);
  const { user: authUser } = useSelector(state => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("isblocked", isblocked);
    formData.append("role", role);
    dispatch(updateUser(userId, formData));
  };

  useEffect(() => {
    if (isUserUpdated) {
      dispatch(clearUserUpdated());
      toast.success("User Updated Successfully");
      return;
    }

    if (error) {
      dispatch(clearError());
      toast.error(error);
      return;
    }

    dispatch(getUser(userId));
  }, [isUserUpdated, error, dispatch]);

  useEffect(() => {
    if (user._id) {
      setFirstName(user.name);
      setLastName(user.lastname);
      setEmail(user.email);
      setRole(user.role);
      setIsBlocked(user.isblocked);
    }
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/5">
        <Sidebar />
      </div>

      <div className="md:w-4/5 p-6">
        <Fragment>
          <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-6 text-gray-300">Update User</h1>

            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label htmlFor="name_field" className="block text-sm font-medium text-gray-400 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="name_field"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  value={name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="name_field" className="block text-sm font-medium text-gray-400 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="Lastname_field"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="email_field" className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email_field"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="block_toggle"
                  checked={isblocked}
                  onChange={(e) => setIsBlocked(e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-emerald-500 border-gray-300 rounded"
                  disabled={role === "admin"} //Disable if role is admin
                />
                <label htmlFor="block_toggle" className="text-sm text-gray-300">
                  Block this user
                </label>
              </div>

              <div>
                <label htmlFor="role_field" className="block text-sm font-medium text-gray-400 mb-1">
                  Role
                </label>
                <select
                  id="role_field"
                  value={role}
                  disabled={user._id === authUser._id}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-800 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
