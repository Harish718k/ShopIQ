// import { Fragment, useEffect } from "react"
// import { Button } from "react-bootstrap"
// import { useDispatch, useSelector } from "react-redux"
// import { Link } from "react-router-dom"
// import { deleteOrder, adminOrders as adminOrdersAction } from "../../actions/orderActions"
// import { clearError, clearOrderDeleted } from "../../slices/orderSlice"
// import Loader from '../layouts/Loader';
// import DataTable from 'react-data-table-component';
// import {toast } from 'react-toastify'
// import Sidebar from "./Sidebar"

// export default function OrderList() {
//     const { adminOrders = [], loading = true, error, isOrderDeleted }  = useSelector(state => state.orderState)

//     const dispatch = useDispatch();

//     const setOrders = () => {
//         const data = {
//             columns : [
//                 {
//                     label: 'ID',
//                     field: 'id',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Number of Items',
//                     field: 'noOfItems',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Amount',
//                     field: 'amount',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Status',
//                     field: 'status',
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

//         adminOrders.forEach( order => {
//             data.rows.push({
//                 id: order._id,
//                 noOfItems: order.orderItems.length,
//                 amount : `$${order.totalPrice}`,
//                 status: <p style={{color: order.orderStatus.includes('Processing') ? 'red' : 'green'}}>{order.orderStatus}</p> ,
//                 actions: (
//                     <Fragment>
//                         <Link to={`/admin/order/${order._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
//                         <Button onClick={e => deleteHandler(e, order._id)} className="btn btn-danger py-1 px-2 ml-2">
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
//         dispatch(deleteOrder(id))
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
//         if(isOrderDeleted) {
//             toast('Order Deleted Succesfully!',{
//                 type: 'success',
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 onOpen: () => dispatch(clearOrderDeleted())
//             })
//             return;
//         }

//         dispatch(adminOrdersAction)
//     },[dispatch, error, isOrderDeleted])


//     return (
//         <div className="row">
//         <div className="col-12 col-md-2">
//                 <Sidebar/>
//         </div>
//         <div className="col-12 col-md-10">
//             <h1 className="my-4">Order List</h1>
//             <Fragment>
//                 {loading ? <Loader/> : 
//                     <DataTable
//                         data={setOrders()}
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
import {
  deleteOrder,
  adminOrders as adminOrdersAction,
} from "../../actions/orderActions";
import {
  clearError,
  clearOrderDeleted,
} from "../../slices/orderSlice";
import Loader from "../layouts/Loader";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { Pencil, Trash2 } from "lucide-react";

export default function OrderList() {
  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);

  const dispatch = useDispatch();

  const setOrders = () => {
    const columns = [
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Number of Items",
        selector: (row) => row.noOfItems,
        sortable: true,
      },
      {
        name: "Amount",
        selector: (row) => row.amount,
        sortable: true,
      },
      {
        name: "Status",
        cell: (row) => (
          <span
            className={`font-medium ${
              row.status.includes("Processing") ? "text-red-500" : "text-green-600"
            }`}
          >
            {row.status}
          </span>
        ),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex gap-2">
            <Link
              to={`/admin/order/${row.id}`}
              className="text-blue-600 px-2 py-1 rounded"
            >
              <Pencil className="w-5 h-5 inline" />
            </Link>
            <button
              onClick={(e) => deleteHandler(e, row.id)}
              className="text-red-600 px-2 py-1 rounded"
            >
              <Trash2 className="w-5 h-5 inline" />
            </button>
          </div>
        ),
      },
    ];

    const rows = adminOrders.map((order) => ({
      id: order._id,
      noOfItems: order.orderItems.length,
      amount: `$${order.totalPrice}`,
      status: order.orderStatus,
    }));

    return { columns, data: rows };
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isOrderDeleted) {
      toast("Order Deleted Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearOrderDeleted()),
      });
      return;
    }

    dispatch(adminOrdersAction());
  }, [dispatch, error, isOrderDeleted]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/5 border-r">
        <Sidebar />
      </div>
      <div className="md:w-4/5 p-6">
        <h1 className="text-2xl font-semibold mb-4">Order List</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className="bg-white shadow rounded p-4">
              <DataTable
                columns={setOrders().columns}
                data={setOrders().data}
                pagination
                highlightOnHover
                responsive
                customStyles={{
                  headCells: {
                    style: {
                      backgroundColor: "#f9fafb",
                      fontWeight: "600",
                    },
                  },
                }}
              />
            </div>
          )}
        </Fragment>
      </div>
    </div>
  );
}
