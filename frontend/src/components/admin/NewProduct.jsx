// import { Fragment, useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
// import { useDispatch, useSelector} from 'react-redux';
// import { useNavigate } from "react-router-dom";
// import { createNewProduct } from "../../actions/productActions";
// import { clearError, clearProductCreated } from "../../slices/productSlice";
// import { toast } from "react-toastify";

// export  default function NewProduct () {
//     const [name, setName] = useState("");
//     const [price, setPrice] = useState("");
//     const [description, setDescription] = useState("");
//     const [category, setCategory] = useState("");
//     const [stock, setStock] = useState(0);
//     const [seller, setSeller] = useState("");
//     const [images, setImages] = useState([]);
//     const [imagesPreview, setImagesPreview] = useState([]);
    
//     const { loading, isProductCreated, error } = useSelector( state => state.productState)

//     const categories = [
//         'Electronics',
//         'Mobile Phones',
//         'Laptops',
//         'Accessories',
//         'Headphones',
//         'Food',
//         'Books',
//         'Clothes/Shoes',
//         'Beauty/Health',
//         'Sports',
//         'Outdoor',
//         'Home'
//     ];

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const onImagesChange = (e) => {
//         const files = Array.from(e.target.files);

//         files.forEach(file => {
            
//             const reader = new FileReader();

//             reader.onload = () => {
//                 if(reader.readyState === 2 ) {
//                     setImagesPreview(oldArray => [...oldArray, reader.result])
//                     setImages(oldArray => [...oldArray, file])
//                 }
//             }

//             reader.readAsDataURL(file)


//         })

//     }

//     const submitHandler = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name' , name);
//         formData.append('price' , price);
//         formData.append('stock' , stock);
//         formData.append('description' , description);
//         formData.append('seller' , seller);
//         formData.append('category' , category);
//         images.forEach (image => {
//             formData.append('images', image)
//         })
//         dispatch(createNewProduct(formData))
//     }

//     useEffect(() => {
//         if(isProductCreated) {
//             toast('Product Created Succesfully!',{
//                 type: 'success',
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 onOpen: () => dispatch(clearProductCreated())
//             })
//             navigate('/admin/products')
//             return;
//         }

//         if(error)  {
//             toast(error, {
//                 // position: toast.POSITION.BOTTOM_CENTER,
//                 type: 'error',
//                 onOpen: ()=> { dispatch(clearError()) }
//             })
//             return
//         }
//     }, [isProductCreated, error, dispatch])


//     return (
//         <div className="row">
//             <div className="col-12 col-md-2">
//                     <Sidebar/>
//             </div>
//             <div className="col-12 col-md-10">
//                 <Fragment>
//                     <div className="wrapper my-5"> 
//                         <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
//                             <h1 className="mb-4">New Product</h1>

//                             <div className="form-group">
//                             <label htmlFor="name_field">Name</label>
//                             <input
//                                 type="text"
//                                 id="name_field"
//                                 className="form-control"
//                                 onChange={e => setName(e.target.value)}
//                                 value={name}
//                             />
//                             </div>

//                             <div className="form-group">
//                                 <label htmlFor="price_field">Price</label>
//                                 <input
//                                 type="text"
//                                 id="price_field"
//                                 className="form-control"
//                                 onChange={e => setPrice(e.target.value)}
//                                 value={price}
//                                 />
//                             </div>

//                             <div className="form-group">
//                                 <label htmlFor="description_field">Description</label>
//                                 <textarea 
//                                     className="form-control"
//                                     id="description_field" 
//                                     rows="8"
//                                     onChange={e => setDescription(e.target.value)}
//                                     value={description}
//                                   ></textarea>
//                             </div>

//                             <div className="form-group">
//                                 <label htmlFor="category_field">Category</label>
//                                 <select onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
//                                     <option value="">Select</option>
//                                     {categories.map( category => (
//                                         <option key={category} value={category}>{category}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label htmlFor="stock_field">Stock</label>
//                                 <input
//                                 type="number"
//                                 id="stock_field"
//                                 className="form-control"
//                                 onChange={e => setStock(e.target.value)}
//                                 value={stock}
//                                 />
//                             </div>

//                             <div className="form-group">
//                                 <label htmlFor="seller_field">Seller Name</label>
//                                 <input
//                                 type="text"
//                                 id="seller_field"
//                                 className="form-control"
//                                 onChange={e => setSeller(e.target.value)}
//                                 value={seller}
//                                 />
//                             </div>
                            
//                             <div className='form-group'>
//                                 <label>Images</label>
                                
//                                     <div className='custom-file'>
//                                         <input
//                                             type='file'
//                                             name='product_images'
//                                             className='custom-file-input'
//                                             id='customFile'
//                                             multiple
//                                             onChange={onImagesChange}
                                        
//                                         />

//                                         <label className='custom-file-label' htmlFor='customFile'>
//                                             Choose Images
//                                         </label>
//                                     </div>
//                                     {imagesPreview.map(image => (
//                                         <img
//                                             className="mt-3 mr-2"
//                                             key={image}
//                                             src={image}
//                                             alt={`Image Preview`}
//                                             width="55"
//                                             height="52"
//                                         />
//                                     ))}
//                             </div>

                
//                             <button
//                             id="login_button"
//                             type="submit"
//                             disabled={loading}
//                             className="btn btn-block py-3"
//                             >
//                             CREATE
//                             </button>

//                         </form>
//                     </div>
//                 </Fragment>
//             </div>
//         </div>
        
//     )
// }


import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProductCreated, error } = useSelector(
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
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
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
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createNewProduct(formData));
  };

  useEffect(() => {
    if (isProductCreated) {
      toast("Product Created Successfully!", {
        type: "success",
        onOpen: () => dispatch(clearProductCreated()),
      });
      navigate("/admin/products");
    }

    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => dispatch(clearError()),
      });
    }
  }, [isProductCreated, error, dispatch]);

  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5 px-8 py-6">
        <Fragment>
          <h1 className="text-2xl font-semibold mb-6">Create New Product</h1>
          <form
            onSubmit={submitHandler}
            className="bg-white shadow-lg rounded-lg p-6 space-y-5"
            encType="multipart/form-data"
          >
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Price</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                rows="5"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Category</label>
              <select
                className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
              <label className="block text-gray-700 mb-1">Stock</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Seller Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
              />
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Product Images</label>

                <div className="relative w-full">
                    <label
                    htmlFor="file-upload"
                    className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 transition"
                    >
                    Choose Images
                    </label>
                    <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={onImagesChange}
                    className="hidden"
                    />
                </div>

                <div className="flex flex-wrap mt-4 gap-2">
                    {imagesPreview.map((img) => (
                    <img
                        src={img}
                        key={img}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded border"
                    />
                    ))}
                </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-primary text-white font-semibold rounded-md hover:bg-opacity-90 transition"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </form>
        </Fragment>
      </div>
    </div>
  );
}
