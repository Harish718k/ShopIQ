// import { Fragment, useEffect } from "react"
// import { Button } from "react-bootstrap"
// import { useDispatch, useSelector } from "react-redux"
// import { Link } from "react-router-dom"
// import { deleteUser, getUsers } from "../../actions/userActions"
// import { clearError, clearUserDeleted } from "../../slices/userSlice"
// import Loader from '../layouts/Loader';
// import DataTable from 'react-data-table-component';
// import {toast } from 'react-toastify'
// import Sidebar from "./Sidebar"

// export default function UserList() {
//     const { users = [], loading = true, error, isUserDeleted }  = useSelector(state => state.userState)

//     const dispatch = useDispatch();

//     const setUsers = () => {
//         const data = {
//             columns : [
//                 {
//                     label: 'ID',
//                     field: 'id',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Name',
//                     field: 'name',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Email',
//                     field: 'email',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Role',
//                     field: 'role',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Actions',
//                     field: 'actions',
//                     sort: 'asc'
//                 }
//             ],
//             rows : []
//         }

//         users.forEach( user => {
//             data.rows.push({
//                 id: user._id,
//                 name: user.name,
//                 email : user.email,
//                 role: user.role ,
//                 actions: (
//                     <Fragment>
//                         <Link to={`/admin/user/${user._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
//                         <Button onClick={e => deleteHandler(e, user._id)} className="btn btn-danger py-1 px-2 ml-2">
//                             <i className="fa fa-trash"></i>
//                         </Button>
//                     </Fragment>
//                 )
//             })
//         })

//         return data;
//     }

//     const deleteHandler = (e, id) => {
//         e.target.disabled = true;
//         dispatch(deleteUser(id))
//     }

//     useEffect(() => {
//         if(error) {
//             toast(error, {
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 type: 'error',
//                 onOpen: ()=> { dispatch(clearError()) }
//             })
//             return
//         }
//         if(isUserDeleted) {
//             toast('User Deleted Succesfully!',{
//                 type: 'success',
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 onOpen: () => dispatch(clearUserDeleted())
//             })
//             return;
//         }

//         dispatch(getUsers)
//     },[dispatch, error, isUserDeleted])


//     return (
//         <div className="row">
//         <div className="col-12 col-md-2">
//                 <Sidebar/>
//         </div>
//         <div className="col-12 col-md-10">
//             <h1 className="my-4">User List</h1>
//             <Fragment>
//                 {loading ? <Loader/> : 
//                     <DataTable
//                         data={setUsers()}
//                         bordered
//                         striped
//                         hover
//                         className="px-3"
//                     />
//                 }
//             </Fragment>
//         </div>
//     </div>
//     )
// }


import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../actions/userActions";
import { clearError, clearUserDeleted } from "../../slices/userSlice";
import Loader from "../layouts/Loader";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
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
      actions: (
        <div className="flex gap-2">
          <Link
            to={`/admin/user/${user._id}`}
            className="text-blue-600 hover:underline"
          >
            <Pencil className="w-5 h-5 inline" />
          </Link>
          <button
            onClick={(e) => deleteHandler(e, user._id)}
            className="text-red-600 hover:underline"
          >
            <Trash2 className="w-5 h-5 inline" />
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
    },
    {
      name: "Actions",
      cell: (row) => row.actions,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteUser(id));
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 border-r bg-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          User List
        </h1>

        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className="bg-white rounded shadow-md p-4">
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
