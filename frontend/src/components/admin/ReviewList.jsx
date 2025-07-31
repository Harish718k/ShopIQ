// import { Fragment, useEffect, useState } from "react"
// import { Button } from "react-bootstrap"
// import { useDispatch, useSelector } from "react-redux"
// import { deleteReview, getReviews } from "../../actions/productActions"
// import { clearError, clearReviewDeleted } from "../../slices/productSlice"
// import Loader from '../layouts/Loader';
// import DataTable from 'react-data-table-component';
// import {toast } from 'react-toastify'
// import Sidebar from "./Sidebar"

// export default function ReviewList() {
//     const { reviews = [], loading = true, error, isReviewDeleted }  = useSelector(state => state.productState)
//     const [productId, setProductId] = useState("");
//     const dispatch = useDispatch();

//     const setReviews = () => {
//         const data = {
//             columns : [
//                 {
//                     label: 'ID',
//                     field: 'id',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Rating',
//                     field: 'rating',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'User',
//                     field: 'user',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Comment',
//                     field: 'comment',
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

//         reviews.forEach( review => {
//             data.rows.push({
//                 id: review._id,
//                 rating: review.rating,
//                 user : review.user.name,
//                 comment: review.comment ,
//                 actions: (
//                     <Fragment>
//                         <Button onClick={e => deleteHandler(e, review._id)} className="btn btn-danger py-1 px-2 ml-2">
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
//         dispatch(deleteReview(productId, id))
//     }

//     const submitHandler = (e) =>{
//         e.preventDefault();
//         dispatch(getReviews(productId))
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
//         if(isReviewDeleted) {
//             toast('Review Deleted Succesfully!',{
//                 type: 'success',
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 onOpen: () => dispatch(clearReviewDeleted())
//             })
//             dispatch(getReviews(productId))
//             return;
//         }

       
//     },[dispatch, error, isReviewDeleted])


//     return (
//         <div className="row">
//         <div className="col-12 col-md-2">
//                 <Sidebar/>
//         </div>
//         <div className="col-12 col-md-10">
//             <h1 className="my-4">Review List</h1>
//             <div className="row justify-content-center mt-5">
//                 <div className="col-5">
//                     <form onSubmit={submitHandler}>
//                         <div className="form-group">
//                             <label >Product ID</label>
//                             <input 
//                                 type="text"
//                                 onChange= {e => setProductId(e.target.value)}
//                                 value={productId}
//                                 className="form-control"
//                             />
//                         </div>
//                         <button type="submit" disabled={loading} className="btn btn-primary btn-block py-2">
//                             Search
//                         </button>
//                     </form>
//                 </div>
//             </div>
//             <Fragment>
//                 {loading ? <Loader/> : 
//                     <DataTable
//                         data={setReviews()}
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


import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews } from "../../actions/productActions";
import { clearError, clearReviewDeleted } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
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
      toast(error, {
        type: "error",
        onOpen: () => dispatch(clearError()),
      });
    }
    if (isReviewDeleted) {
      toast("Review Deleted Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearReviewDeleted()),
      });
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 border-r bg-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Review List</h1>

        {/* Product ID Search Form */}
        <div className="max-w-md mx-auto mb-8">
          <form onSubmit={submitHandler} className="bg-white shadow-md rounded p-6">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
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
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
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
            <div className="bg-white rounded shadow-md p-4">
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
