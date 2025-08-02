import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import { toast } from "react-hot-toast";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { id: productId } = useParams();
  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Beauty/Health",
    "Sports",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("category", category);
    images.forEach((image) => formData.append("images", image));
    formData.append("imagesCleared", imagesCleared);
    dispatch(updateProduct(productId, formData));
  };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  useEffect(() => {
    if (isProductUpdated) {
      dispatch(clearProductUpdated());
      toast.success("Product Updated Successfully");
      setImages([]);
      return;
    }

    if (error) {
      dispatch(clearError());
      toast.error(error);
      return;
    }

    dispatch(getProduct(productId));
  }, [isProductUpdated, error, dispatch]);

  useEffect(() => {
    if (product._id) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
      setSeller(product.seller);
      setCategory(product.category);
      const previews = product.images.map((img) => img.image);
      setImagesPreview(previews);
    }
  }, [product]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 p-6">
        <Fragment>
          <form
            onSubmit={submitHandler}
            encType="multipart/form-data"
            className="bg-gray-800 p-6 rounded-lg shadow-md space-y-5"
          >
            <h1 className="text-2xl font-semibold text-gray-200">Update Product</h1>

            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                rows="6"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white"
              >
                <option value="">Select</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Seller</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-300"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Images</label>
              <input
                type="file"
                multiple
                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200"
                onChange={onImagesChange}
              />
              {imagesPreview.length > 0 && (
                <span
                  onClick={clearImagesHandler}
                  className="text-red-600 cursor-pointer text-sm hover:underline mt-2 inline-block"
                >
                  Clear Images
                </span>
              )}
              <div className="flex flex-wrap mt-2 gap-3">
                {imagesPreview.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Preview"
                    className="w-14 h-14 object-cover rounded border"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition duration-300"
            >
              UPDATE
            </button>
          </form>
        </Fragment>
      </div>
    </div>
  );
}
