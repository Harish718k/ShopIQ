import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

export default function Home() {
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    productsCount,
    resPerPage,
  } = useSelector((state) => state.productsState);

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(null);

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Beauty/Health",
    "Sports",
  ];

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getProducts(null, null, category, null, currentPage));
  }, [error, dispatch, currentPage, category]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          <h1
            id="products_heading"
            className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8"
          >
            Latest Products
          </h1>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat === category ? null : cat); // Toggle
                  setCurrentPage(1); // Reset to page 1
                }}
                className={`px-4 py-2 text-sm border rounded-md transition ${
                  category === cat
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-emerald-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <section
            id="products"
            className="max-w-screen-xl mx-auto mt-10 px-4"
          >
            <div className="flex flex-wrap -mx-3">
              {products &&
                products.map((product) => (
                  <Product col={3} key={product._id} product={product} />
                ))}
            </div>
          </section>

          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="flex justify-center mt-10">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                innerClass="flex flex-wrap justify-center gap-2 mt-8"
                itemClass=""
                linkClass="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-300 hover:bg-emerald-600 transition-colors"
                activeClass="bg-emerald-600 rounded-md text-white"
                activeLinkClass="pointer-events-none"
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
}
