
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getUsers, impersonateUser } from "../../actions/userActions";
import { clearError, clearUserDeleted } from "../../slices/userSlice";
import Loader from "../layouts/Loader";
import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";
import Sidebar from "./Sidebar";
import { Pencil, Trash2 } from "lucide-react";

export default function UserList() {
  const { users = [], loading = true, error, isUserDeleted } = useSelector(
    (state) => state.userState
  );

  const dispatch = useDispatch();

  const setUsers = () => {
    return users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isblocked: user.isblocked,
      actions: (
        <div className="flex gap-2">
          <Link
            to={`/admin/user/${user._id}`}
            className="text-blue-600 hover:underline border-l border-r px-1"
          >
            <Pencil className="w-5 h-5 inline" />
          </Link>
          <button
            onClick={(e) => deleteHandler(e, user._id)}
            className="text-red-600 hover:underline border-l border-r px-1 cursor-pointer"
          >
            <Trash2 className="w-5 h-5 inline" />
          </button>
          <button
            className="text-indigo-600 hover:underline border-l border-r px-1 cursor-pointer"
            onClick={() => handleImpersonate(user._id, user.role)}
          >
            Impersonate
          </button>
        </div>
      ),
    }));
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },{
      name: "Status",
      selector: (row) => row.isblocked ? "Blocked" : "Active",
      sortable: true,
      cell: (row) => (
        <p className={row.isblocked ? "text-red-600" : "text-green-500"}>
          {row.isblocked ? "Blocked" : "Active"}
        </p>
      ),
    },
    {
      name: "Actions",
      cell: (row) => row.actions,
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteUser(id));
  };

  const handleImpersonate = (userId, userRole) => {

    if (userRole === "admin") {
      return toast.error("You cannot impersonate another admin.");
    }

    dispatch(impersonateUser(userId));
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => dispatch(clearError()),
      });
    }

    if (isUserDeleted) {
      toast("User Deleted Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearUserDeleted()),
      });
    }

    dispatch(getUsers());
  }, [dispatch, error, isUserDeleted]);

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "14px",
        backgroundColor: "#f3f4f6",
        color: "#111827",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        color: "#374151",
        minHeight: "56px",
      },
    },
    cells: {
      style: {
        paddingLeft: "12px",
        paddingRight: "12px",
      },
    },
  };

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 border-r">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5 p-6">
        <h1 className="text-2xl font-semibold text-gray-300 mb-6">
          User List
        </h1>

        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className=" rounded shadow-md p-4">
              <DataTable
                columns={columns}
                data={setUsers()}
                customStyles={customStyles}
                pagination
                highlightOnHover
                striped
              />
            </div>
          )}
        </Fragment>
      </div>
    </div>
  );
}
