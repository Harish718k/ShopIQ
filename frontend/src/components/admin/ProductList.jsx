
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { clearError, clearProductDeleted } from "../../slices/productSlice";
import Loader from "../layouts/Loader";
import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";
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
      dispatch(clearError());
      toast.error(error || productError);
      return;
    }
    if (isProductDeleted) {
      dispatch(clearProductDeleted());
      toast.success("Product Deleted Successfully");
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
