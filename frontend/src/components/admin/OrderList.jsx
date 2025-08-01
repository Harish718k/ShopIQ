
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
