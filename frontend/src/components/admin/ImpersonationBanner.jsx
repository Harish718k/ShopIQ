import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { revertToAdmin } from "../../actions/userActions";

const ImpersonationBanner = () => {
  const [isImpersonating, setIsImpersonating] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const originalAdmin = Cookies.get("originalAdmin");
    console.log("Original Admin Cookie:", originalAdmin);
    
    if (originalAdmin) {
      setIsImpersonating(true);
      console.log("Impersonation status:", isImpersonating);
    }
    
  }, []);

  const handleRevert = () => {
    dispatch(revertToAdmin());
  };

  if (!isImpersonating) return null;

  return (
    <div className="bg-yellow-200 border border-yellow-400 text-yellow-800 px-4 py-2 text-sm flex items-center justify-between z-50">
      <span>
        ⚠️ You are currently impersonating another user. Any actions taken will be on their behalf.
      </span>
      <button
        onClick={handleRevert}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded ml-4 text-sm"
      >
        Revert to Admin
      </button>
    </div>
  );
};

export default ImpersonationBanner;
