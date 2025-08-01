import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import { clearError, clearUserUpdated } from "../../slices/userSlice";
import { toast } from "react-toastify";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id: userId } = useParams();
  const dispatch = useDispatch();

  const { loading, isUserUpdated, error, user } = useSelector(state => state.userState);
  const { user: authUser } = useSelector(state => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    dispatch(updateUser(userId, formData));
  };

  useEffect(() => {
    if (isUserUpdated) {
      toast("User Updated Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearUserUpdated()),
      });
      return;
    }

    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => dispatch(clearError()),
      });
      return;
    }

    dispatch(getUser(userId));
  }, [isUserUpdated, error, dispatch]);

  useEffect(() => {
    if (user._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
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
                  Name
                </label>
                <input
                  type="text"
                  id="name_field"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
