import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews } from "../../actions/productActions";
import { clearError, clearReviewDeleted } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";
import Sidebar from "./Sidebar";
import { Trash2 } from "lucide-react";

export default function ReviewList() {
  const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(
    (state) => state.productState
  );
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  const setReviews = () => {
    return reviews.map((review) => ({
      id: review._id,
      rating: review.rating,
      user: review.user.name,
      comment: review.comment,
      actions: (
        <button
          onClick={(e) => deleteHandler(e, review._id)}
          className="text-red-600 hover:underline"
        >
          <Trash2 className="w-5 h-5 inline"/>
        </button>
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
      name: "Rating",
      selector: (row) => row.rating,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "Comment",
      selector: (row) => row.comment,
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
    dispatch(deleteReview(productId, id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearError());
      toast.error(error);
    }
    if (isReviewDeleted) {
      dispatch(clearReviewDeleted())
      toast.success("Review Deleted Successfully");
      dispatch(getReviews(productId));
    }
  }, [dispatch, error, isReviewDeleted]);

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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/5">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5 p-6">
        <h1 className="text-2xl font-semibold text-gray-300 mb-6">Review List</h1>

        {/* Product ID Search Form */}
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={submitHandler} className="bg-gray-800 shadow-md rounded p-6">
            <div className="mb-4">
              <label className="block text-gray-300 font-medium mb-2">
                Product ID
              </label>
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Product ID"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition duration-200"
            >
              Search
            </button>
          </form>
        </div>

        {/* Review Table */}
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <div className="bg-gray-800 rounded shadow-md p-4">
              <DataTable
                columns={columns}
                data={setReviews()}
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
