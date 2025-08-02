


import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearAuthError } from '../../actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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
      toast.success("Password reset successfully");
      navigate('/');
      return;
    }

    if (error) {
      toast.error(error);
      dispatch(clearAuthError);
    }
  }, [isAuthenticated, error, dispatch, navigate]);

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-gray-800 shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-300">
          New Password
        </h1>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label htmlFor="password_field" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirm_password_field" className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password_field"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition">
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
}
