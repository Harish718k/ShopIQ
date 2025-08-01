// import { Fragment, useEffect } from "react"
// import { Button } from "react-bootstrap"
// import { useDispatch, useSelector } from "react-redux"
// import { Link } from "react-router-dom"
// import { deleteProduct, getAdminProducts } from "../../actions/productActions"
// import { clearError, clearProductDeleted } from "../../slices/productSlice"
// import Loader from '../layouts/Loader';
// import DataTable from 'react-data-table-component';
// import {toast } from 'react-toastify'
// import Sidebar from "./Sidebar"

// export default function ProductList() {
//     const { products = [], loading = true, error }  = useSelector(state => state.productsState)
//     const { isProductDeleted, error:productError }  = useSelector(state => state.productState)
//     const dispatch = useDispatch();

//     const setProducts = () => {
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
//                     label: 'Price',
//                     field: 'price',
//                     sort: 'asc'
//                 },
//                 {
//                     label: 'Stock',
//                     field: 'stock',
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

//         products.forEach( product => {
//             data.rows.push({
//                 id: product._id,
//                 name: product.name,
//                 price : `$${product.price}`,
//                 stock: product.stock,
//                 actions: (
//                     <Fragment>
//                         <Link to={`/admin/product/${product._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
//                         <Button onClick={e => deleteHandler(e, product._id)} className="btn btn-danger py-1 px-2 ml-2">
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
//         dispatch(deleteProduct(id))
//     }

//     useEffect(() => {
//         if(error || productError) {
//             toast(error || productError, {
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 type: 'error',
//                 onOpen: ()=> { dispatch(clearError()) }
//             })
//             return
//         }
//         if(isProductDeleted) {
//             toast('Product Deleted Succesfully!',{
//                 type: 'success',
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 onOpen: () => dispatch(clearProductDeleted())
//             })
//             return;
//         }

//         dispatch(getAdminProducts)
//     },[dispatch, error, isProductDeleted])


//     return (
//         <div className="row">
//         <div className="col-12 col-md-2">
//                 <Sidebar/>
//         </div>
//         <div className="col-12 col-md-10">
//             <h1 className="my-4">Product List</h1>
//             <Fragment>
//                 {loading ? <Loader/> : 
//                     <DataTable
//                         data={setProducts()}
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
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { clearError, clearProductDeleted } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductList() {
  const { products = [], loading = true, error } = useSelector(
    (state) => state.productsState
  );
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();

  const setProducts = () => {
    const data = {
      columns: [
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
          name: "Price",
          selector: (row) => row.price,
          sortable: true,
        },
        {
          name: "Stock",
          selector: (row) => row.stock !==0 ? row.stock : (<p className="text-red-600">{row.stock}</p>),
          sortable: true,
        },
        {
          name: "Actions",
          cell: (row) => (
            <div className="flex gap-2">
              <Link
                to={`/admin/product/${row.id}`}
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
      ],
      data: products.map((product) => ({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
      })),
    };
    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error || productError) {
      toast(error || productError, {
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if (isProductDeleted) {
      toast("Product Deleted Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearProductDeleted()),
      });
      return;
    }

    dispatch(getAdminProducts());
  }, [dispatch, error, isProductDeleted]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/5 border-r">
        <Sidebar />
      </div>
      <div className="md:w-4/5 p-6">
        <h1 className="text-2xl font-semibold mb-4">Product List</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="bg-white shadow rounded p-4">
            <DataTable
              columns={setProducts().columns}
              data={setProducts().data}
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
      </div>
    </div>
  );
}
